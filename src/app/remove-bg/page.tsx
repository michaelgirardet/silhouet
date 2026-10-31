"use client";

import { DownloadSimpleIcon, RepeatIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import Dropzone from "@/app/components/Dropzone";
import Modal from "@/app/components/Modal";
import { downscaleImage, fileFromBlob, validateImageFile } from "@/lib/image";
import Loader from "../components/Loader";

// Récupère le type exact de la fonction removeBackground
type RemoveBackgroundFn =
  (typeof import("@imgly/background-removal"))["removeBackground"];

// Étend Window pour requestIdleCallback / cancelIdleCallback sans any
type ExtendedWindow = Window & {
  requestIdleCallback?: (
    callback: (deadline: IdleDeadline) => void,
    options?: IdleRequestOptions,
  ) => number;
  cancelIdleCallback?: (handle: number) => void;
};

// Version du paquet de données @imgly/background-removal-data servi dans
// public/models/<version>/ — doit correspondre au dossier extrait.
const MODELS_VERSION = "1.7.0";

export default function RemoveBgPage() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [srcURL, setSrcURL] = useState<string | null>(null);
  const [outURL, setOutURL] = useState<string | null>(null);
  const [meta, setMeta] = useState<{ name: string; size: number; ms: number } | null>(
    null,
  );
  const [open, setOpen] = useState(false);
  const removerRef = useRef<RemoveBackgroundFn | null>(null);
  const id = useId();

  useEffect(() => {
    const w = window as ExtendedWindow;

    const preload = () => {
      import("@imgly/background-removal")
        .then((m) => {
          removerRef.current = m.removeBackground;
        })
        .catch(() => {});
    };

    // Safari ne fournit pas requestIdleCallback : fallback setTimeout
    if (w.requestIdleCallback) {
      const idleId = w.requestIdleCallback(preload, { timeout: 1500 });
      return () => {
        w.cancelIdleCallback?.(idleId);
      };
    }

    const timerId = window.setTimeout(preload, 2000);
    return () => {
      window.clearTimeout(timerId);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (srcURL) URL.revokeObjectURL(srcURL);
      if (outURL) URL.revokeObjectURL(outURL);
    };
  }, [srcURL, outURL]);

  async function process(file: File) {
    const validationError = validateImageFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setBusy(true);
    setError(null);
    const startedAt = performance.now();
    try {
      const down = await downscaleImage(file, 2000);
      const prepared = down.size
        ? fileFromBlob(down, file.name.replace(/\.\w+$/, ".png"))
        : file;

      if (!removerRef.current) {
        const mod = await import("@imgly/background-removal");
        removerRef.current = mod.removeBackground;
      }

      // Utilise l’appel optionnel + garde
      // publicPath doit être une URL absolue (la lib fait new URL(nom, publicPath))
      // et le chemin est versionné : chaque upgrade du paquet de données
      // @imgly/background-removal-data change d'URL, ce qui permet un cache
      // immutable sans risque de péremption.
      const config = {
        publicPath: new URL(
          `/models/${MODELS_VERSION}/`,
          window.location.origin,
        ).href,
        output: { format: "image/png" as const },
      };
      const result = await removerRef.current?.(prepared, config);

      if (!result) {
        throw new Error("Le moteur de détourage n'est pas disponible.");
      }

      setSrcURL(URL.createObjectURL(file));
      setOutURL(URL.createObjectURL(result));
      setMeta({
        name: file.name,
        size: result.size,
        ms: performance.now() - startedAt,
      });
      setOpen(true);
    } catch (e) {
      console.error(e);
      setError("Une erreur est survenue pendant le détourage.");
    } finally {
      setBusy(false);
    }
  }

  const hasResult = useMemo(() => !!(srcURL && outURL), [srcURL, outURL]);

  const reset = () => {
    setSrcURL(null);
    setOutURL(null);
    setMeta(null);
    setError(null);
    setOpen(false);
  };

  return (
    <section className="mx-auto flex w-full max-w-page flex-col items-center gap-12 px-6 py-16 md:py-24">
      <div className="flex max-w-2xl flex-col items-center gap-4 text-center">
        <h1 className="text-ivory font-display text-heading-lg font-medium">
          Déposez votre image, nous supprimons l&apos;arrière-plan
          automatiquement.
        </h1>
        <p className="text-body-sm tnum text-stone">
          PNG, JPG, WebP — jusqu&apos;à 25 Mo — traitement instantané
        </p>
      </div>

      {/* Dropzone occupe toute la largeur dispo */}
      <div className="flex w-full flex-col items-center justify-center gap-8">
        <Dropzone onFile={process} />
        {busy && <Loader label="Modèle local — traitement en cours" />}
      </div>

      {error && (
        <div className="bg-ash rounded-inputs border-haze/60 w-full max-w-3xl border p-3 text-caption text-slate">
          <p>{error}</p>
        </div>
      )}

      {/* Comparateur avant/après */}
      {srcURL && (
        <div className="bg-soot rounded-cards grid w-full max-w-4xl grid-cols-1 gap-4 border border-white/6 p-4 sm:grid-cols-2 md:p-6">
          <figure className="flex flex-col gap-2">
            <figcaption className="text-micro text-stone">Avant</figcaption>
            <Image
              src={srcURL}
              alt="source"
              className="rounded-images h-auto w-full border border-white/6"
              width={800}
              height={800}
              priority
            />
          </figure>
          {outURL && (
            <figure className="flex flex-col gap-2">
              <figcaption className="text-micro text-stone">Après</figcaption>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Agrandir le résultat"
                className="checker rounded-images halo-reveal block w-full cursor-pointer border border-white/6"
              >
                <Image
                  src={outURL}
                  alt="résultat détouré"
                  className="block h-auto w-full"
                  width={800}
                  height={800}
                />
              </button>
            </figure>
          )}
        </div>
      )}

      {/* Modale de résultat  */}
      <Modal
        open={open && hasResult}
        onClose={() => setOpen(false)}
        title="Aperçu du détourage"
        footer={
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            {meta && (
              <p className="text-micro tnum text-stone mr-auto">
                {meta.name} · {(meta.size / 1024 / 1024).toFixed(1)} Mo ·{" "}
                {(meta.ms / 1000).toLocaleString("fr-FR", {
                  maximumFractionDigits: 1,
                  minimumFractionDigits: 1,
                })}{" "}
                s
              </p>
            )}
            {outURL && (
              <a
                href={outURL}
                download="silhouet-no-bg.png"
                className="bg-chalk text-canvas hover:bg-ivory inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-2.5 text-caption transition-colors duration-150"
              >
                <DownloadSimpleIcon size={20} weight="light" />
                Télécharger
              </a>
            )}
            <button
              type="button"
              className="border-haze text-slate hover:border-stone hover:text-ivory inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-caption transition-colors duration-150"
              onClick={reset}
            >
              <RepeatIcon size={20} weight="light" /> Réessayer
            </button>
          </div>
        }
      >
        {hasResult && outURL && (
          <div className="checker halo-reveal rounded-images p-2">
            <Image
              src={outURL}
              alt="Prévisualisation résultat"
              className="mx-auto block max-h-[70vh] w-auto rounded-images"
              id={id}
              width={800}
              height={800}
            />
          </div>
        )}
      </Modal>
    </section>
  );
}
