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

export default function RemoveBgPage() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [srcURL, setSrcURL] = useState<string | null>(null);
  const [outURL, setOutURL] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const removerRef =
    useRef<
      ReturnType<typeof useRef<RemoveBackgroundFn | null>> extends never
        ? never
        : RemoveBackgroundFn | null
    >(null);
  const id = useId();

  useEffect(() => {
    const w = window as ExtendedWindow;

    const idleId = w.requestIdleCallback?.(
      () => {
        import("@imgly/background-removal")
          .then((m) => {
            removerRef.current = m.removeBackground;
          })
          .catch(() => {});
      },
      { timeout: 1500 },
    );

    return () => {
      if (idleId !== undefined) {
        w.cancelIdleCallback?.(idleId);
      }
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
    setOutURL(null);
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
      const result = await removerRef.current?.(prepared, {
        output: { format: "image/png" },
      });

      if (!result) {
        throw new Error("Le moteur de détourage n'est pas disponible.");
      }

      setSrcURL(URL.createObjectURL(file));
      setOutURL(URL.createObjectURL(result));
      setOpen(true);
    } catch (e) {
      console.error(e);
      setError("Une erreur est survenue pendant le détourage.");
    } finally {
      setBusy(false);
    }
  }

  const hasResult = useMemo(() => !!(srcURL && outURL), [srcURL, outURL]);

  const openModale = () => {
    setOpen(true);
  };

  return (
    <section className="flex w-full flex-col items-center justify-center">
      <div className="shadow-soft max-w-242 rounded-lg p-6 py-24 text-left text-2xl">
        <h1 className="mb-1 text-3xl font-bold sm:text-4xl">
          Déposez votre image, nous supprimons l&apos;arrière plan
          automatiquement.
        </h1>
        <p className="text-base opacity-80 sm:text-lg">
          PNG, JPG, WebP - Jusqu&apos;à 25 Mo - Traitement instantané
        </p>
      </div>

      {/* Dropzone occupe toute la largeur dispo */}
      <div className="flex flex-col items-center justify-center">
        <Dropzone onFile={process} />
        <div className="mt-24 flex w-full items-center justify-center">
          {busy && <Loader />}
        </div>
      </div>

      {error && (
        <div className="border-border rounded-md border p-3 text-sm text-[color:var(--color-danger,oklch(0.6_0.2_25))] md:col-span-2">
          <p>{error}</p>
        </div>
      )}

      {/* Vignettes de résultat*/}
      {srcURL && (
        <div className="mx-auto grid max-w-[768px] grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <div className="mb-1 text-sm font-medium opacity-80">Source</div>
            <Image
              src={srcURL}
              alt="source"
              className="border-border block h-auto w-full rounded-lg border"
              width={800}
              height={800}
              priority
            />
          </div>
          {outURL && (
            <div>
              <div className="mb-1 text-sm font-medium opacity-80">
                Résultat
              </div>
              <button
                type="button"
                onClick={openModale}
                aria-label="Agrandir le résultat"
                className="u-checker border-indigo block w-full cursor-pointer rounded-lg border p-2"
              >
                <Image
                  src={outURL}
                  alt="résultat"
                  className="block h-auto w-full rounded-md"
                  width={800}
                  height={800}
                />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Modale de résultat  */}
      <Modal
        open={open && hasResult}
        onClose={() => setOpen(false)}
        title="Aperçu du détourage"
        footer={
          <>
            <div className="flex">
              {outURL && (
                <a
                  href={outURL}
                  download="silhouet-no-bg.png"
                  className="md:text-md flex bg-accent cursor-pointer items-center justify-center gap-4 rounded-md px-4 py-2 text-sm font-semibold text-white transition duration-300 ease-in-out"
                >
                  <DownloadSimpleIcon size={24} />
                  Télécharger le PNG
                </a>
              )}
              <button
                type="button"
                className="md:text-md flex cursor-pointer items-center justify-center gap-4 rounded-md border border-none bg-[var(--page-bg)] px-4 py-2 text-sm font-semibold transition duration-300 ease-in-out hover:text-black/80 dark:hover:text-white/80"
                onClick={() => {
                  setSrcURL(null);
                  setOutURL(null);
                  setError(null);
                  setOpen(false);
                }}
              >
                <RepeatIcon size={24} /> Recommencer
              </button>
            </div>
          </>
        }
      >
        {hasResult && outURL && (
          <div className="u-checker rounded-md p-2">
            <Image
              src={outURL}
              alt="Prévisualisation résultat"
              className="mx-auto block max-h-[70vh] w-auto rounded"
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
