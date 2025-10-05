"use client";

import { useState } from "react";
import Dropzone from "@/app/components/Dropzone";
import Image from "next/image";
import Loader from "@/app/components/Loader";
import { DownloadSimpleIcon } from "@phosphor-icons/react";

export default function ConvertImages() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [srcURL, setSrcURL] = useState<string | null>(null);
  const [outURL, setOutURL] = useState<string | null>(null);

  async function process(file: File) {
    setBusy(true);
    setError(null);
    setSrcURL(null);
    setOutURL(null);

    try {
      // Crée un élément <img> temporaire
      const img = document.createElement("img");
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
      });

      // Création du canvas
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);

      // Conversion → WebP
      const blob: Blob | null = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/webp", 0.8),
      );

      if (!blob) throw new Error("Conversion WebP échouée");

      setSrcURL(URL.createObjectURL(file));
      setOutURL(URL.createObjectURL(blob));

      // Nettoyage
      URL.revokeObjectURL(img.src);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message);
      } else {
        console.error(e);
      }
    } finally {
      setBusy(false);
    }
  }

  const reset = () => {
    setSrcURL(null);
    setOutURL(null);
    setError(null);
  };

  return (
    <section className="container mx-auto grid gap-8 px-4 py-10 md:grid-cols-2 md:gap-10 md:py-14">
      <div className="shadow-soft rounded-lg p-6 text-center text-2xl md:text-left">
        <h1 className="mb-1 text-3xl font-bold sm:text-4xl">
          Convertir en WebP
        </h1>
        <p className="text-base opacity-80 sm:text-lg">
          Convertissez vos images PNG, JPG, GIF en WebP en un clic, sans perte
          visible de qualité.
        </p>
      </div>

      <div className="content-center md:col-span-2">
        <Dropzone onFile={process} />
        <div className="mt-24 flex w-full items-center justify-center">
          {busy && <Loader />}
        </div>
      </div>

      {error && (
        <div className="border-border rounded-md border p-3 text-sm text-[color:var(--color-danger,oklch(0.6_0.2_25))] md:col-span-2">
          <p>Une erreur est survenue : {error}</p>
        </div>
      )}

      {/* Résultat */}
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
            />
          </div>

          {outURL && (
            <div>
              <div className="mb-1 text-sm font-medium opacity-80">
                Résultat (WebP)
              </div>
              <div className="u-checker border-mauve/20 rounded-lg border p-2">
                <Image
                  src={outURL}
                  alt="résultat WebP"
                  className="block h-auto w-full rounded-md"
                  width={800}
                  height={800}
                />
              </div>
              <div className="grid grid-cols-1 items-center justify-center gap-8 md:grid-cols-2">
                <a
                  href={outURL}
                  download="converted.webp"
                  className="bg-indigo md:text-md hover:bg-indigo/80 mt-4 flex cursor-pointer items-center justify-center gap-4 rounded-md px-4 py-2 text-sm font-medium text-white transition duration-300 ease-in-out"
                >
                  <DownloadSimpleIcon size={24} />
                  Télécharger le WebP
                </a>
                <button
                  type="button"
                  className="md:text-md hover:text-indigo mt-3 cursor-pointer items-center justify-center gap-4 rounded-md border border-none bg-white px-4 py-2 text-sm font-medium transition duration-300 ease-in-out"
                  onClick={reset}
                >
                  ↺ Recommencer
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
