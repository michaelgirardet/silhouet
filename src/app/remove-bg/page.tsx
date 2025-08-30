"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Dropzone from "@/app/components/Dropzone";
import Modal from "@/app/components/Modal";
import { downscaleImage, fileFromBlob } from "@/lib/image";
import Image from "next/image";

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
      { timeout: 1500 }
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

  return (
    <section className="container mx-auto px-4 py-10 md:py-14 grid gap-8 md:gap-10 md:grid-cols-2">
      <div className="rounded-lg text-center md:text-left text-2xl p-6 shadow-soft">
        <h1 className="text-3xl sm:text-4xl font-bold mb-1">
          Remove Background
        </h1>
        <p className="opacity-80 text-base sm:text-lg">
          Détourez vos images facilement et sans restriction.
        </p>
      </div>

      {/* Dropzone occupe toute la largeur dispo */}
      <div className="md:col-span-2">
        <Dropzone onFile={process} />
      </div>

      {busy && (
        <div className="md:col-span-2 rounded-md p-3 bg-muted border border-border text-sm">
          Chargement du modèle / traitement… (le premier lancement peut être
          plus long)
        </div>
      )}

      {error && (
        <div className="md:col-span-2 rounded-md p-3 border border-border text-sm text-[color:var(--color-danger,oklch(0.6_0.2_25))]">
          {error}
        </div>
      )}

      {/* Vignettes: 1 col sur mobile, 2 cols dès sm */}
      {srcURL && (
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="text-sm font-medium mb-1 opacity-80">Source</div>
            <Image
              src={srcURL}
              alt="source"
              className="block w-full h-auto rounded-lg border border-border"
              width={800}
              height={800}
              priority
            />
          </div>
          {outURL && (
            <div>
              <div className="text-sm font-medium mb-1 opacity-80">
                Résultat
              </div>
              <div className="u-checker rounded-lg border border-border p-2">
                <Image
                  src={outURL}
                  alt="résultat"
                  className="block w-full h-auto rounded-md"
                  width={800}
                  height={800}
                />
              </div>
            </div>
          )}
        </div>
      )}

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
                className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-md shadow-soft transition-colors"
              >
                ⬇️ Télécharger le PNG
              </a>
            )}
            <button
              className="px-4 py-2 rounded-md border border-border hover:bg-muted transition-colors"
              onClick={() => setOpen(false)}
            >
              Fermer
            </button>
            <button
              className="px-4 py-2 rounded-md border border-border"
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
              className="block max-h-[70vh] w-auto mx-auto rounded"
              width={800}
              height={800}
            />
          </div>
        )}
      </Modal>
    </section>
  );
}
