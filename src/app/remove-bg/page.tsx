/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Dropzone from "@/app/components/Dropzone";
import Modal from "@/app/components/Modal";
import { downscaleImage, fileFromBlob } from "@/lib/image";
import Image from "next/image";
import Loader from "../components/Loader";
import { DownloadSimpleIcon } from "@phosphor-icons/react";

type RemoveBackgroundFn = (file: Blob | File, opts?: any) => Promise<Blob>;

export default function RemoveBgPage() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [srcURL, setSrcURL] = useState<string | null>(null);
  const [outURL, setOutURL] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const removerRef = useRef<RemoveBackgroundFn | null>(null);

  useEffect(() => {
    const id = (window as any).requestIdleCallback?.(
      () => {
        import("@imgly/background-removal")
          .then((m) => {
            removerRef.current = m.removeBackground;
          })
          .catch(() => {});
      },
      { timeout: 1500 },
    );
    return () => id && (window as any).cancelIdleCallback?.(id);
  }, []);

  async function process(file: File) {
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
      const result = await removerRef.current!(prepared, {
        output: { format: "image/png" },
      });

      setSrcURL(URL.createObjectURL(file));
      setOutURL(URL.createObjectURL(result));
      setOpen(true);
    } catch (e: any) {
      setError(e?.message || "Échec du détourage.");
    } finally {
      setBusy(false);
    }
  }

  const hasResult = useMemo(() => !!(srcURL && outURL), [srcURL, outURL]);

  const openModale = () => {
    setOpen(true);
  };

  return (
    <section className="container mx-auto grid gap-8 px-4 py-10 md:grid-cols-2 md:gap-10 md:py-14">
      <div className="shadow-soft rounded-lg p-6 text-center text-2xl md:text-left">
        <h1 className="mb-1 text-3xl font-bold sm:text-4xl">
          Supprimer l&apos;arrière plan
        </h1>
        <p className="text-base opacity-80 sm:text-lg">
          Supprimez l&apos;arrière plan de vos images facilement et sans
          restriction.
        </p>
      </div>

      {/* Dropzone occupe toute la largeur dispo */}
      <div className="md:col-span-2">
        <Dropzone onFile={process} />
      </div>
      <div className="flex w-full items-center justify-center">
        {busy && <Loader />}
      </div>

      {error && (
        <div className="border-border rounded-md border p-3 text-sm text-[color:var(--color-danger,oklch(0.6_0.2_25))] md:col-span-2">
          <p>Une erreur est survenue</p>
        </div>
      )}

      {/* Vignettes de résultat*/}
      {srcURL && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:col-span-2">
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
              <div className="u-checker border-border rounded-lg border p-2">
                <Image
                  src={outURL}
                  alt="résultat"
                  className="block h-auto w-full cursor-pointer rounded-md"
                  width={800}
                  height={800}
                  onClick={() => openModale()}
                />
              </div>
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
            {outURL && (
              <a
                href={outURL}
                download="silhouet-no-bg.png"
                className="bg-indigo md:text-md hover:bg-accent-600 shadow-soft flex cursor-pointer items-center justify-center gap-4 rounded-md px-4 py-2 text-sm font-medium text-white transition-colors"
              >
                <DownloadSimpleIcon size={24} />
                Télécharger le PNG
              </a>
            )}
            <button
              className="md:text-md border-indigo/80 hover:bg-indigo/20 cursor-pointer items-center justify-center gap-4 rounded-md border px-4 py-2 text-sm font-medium transition-colors"
              onClick={() => setOpen(false)}
            >
              Fermer
            </button>
            <button
              className="border-border md:text-md cursor-pointer items-center justify-center gap-4 rounded-md border px-4 py-2 text-sm font-medium"
              onClick={() => {
                setSrcURL(null);
                setOutURL(null);
                setError(null);
                setOpen(false);
              }}
            >
              ↺ Recommencer
            </button>
          </>
        }
      >
        {hasResult && outURL && (
          <div className="u-checker rounded-md p-2">
            <Image
              src={outURL}
              alt="Prévisualisation résultat"
              className="mx-auto block max-h-[70vh] w-auto rounded"
              id="result-image"
              width={800}
              height={800}
            />
          </div>
        )}
      </Modal>
    </section>
  );
}
