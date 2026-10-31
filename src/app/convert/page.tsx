"use client";

import { DownloadSimpleIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Dropzone from "@/app/components/Dropzone";
import Loader from "@/app/components/Loader";
import { validateImageFile } from "@/lib/image";

export default function ConvertImages() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [srcURL, setSrcURL] = useState<string | null>(null);
  const [outURL, setOutURL] = useState<string | null>(null);

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

    const objectUrl = URL.createObjectURL(file);
    const img = document.createElement("img");

    try {
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Image illisible"));
        img.src = objectUrl;
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

      setSrcURL(objectUrl);
      setOutURL(URL.createObjectURL(blob));
    } catch (e: unknown) {
      URL.revokeObjectURL(objectUrl);
      console.error(e);
      setError("La conversion a échoué. Ce format est peut-être non supporté.");
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
    <section className="flex w-full flex-col items-center justify-center">
      <div className="shadow-soft rounded-lg p-6 text-center text-2xl md:text-left">
        <h1 className="mb-1 text-3xl font-bold">Convertir en WebP</h1>
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
        <div className="mx-auto grid max-w-[768px] grid-cols-1 gap-4 sm:grid-cols-2">
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
            <div className="mx-auto max-w-[80%]">
              <div className="mb-1 text-sm font-medium opacity-80">
                Résultat (WebP)
              </div>
              <div className="u-checker border-indigo rounded-lg border p-2">
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
                  className="md:text-md hover:text-indigo dark:hover:text-indigo-300 mt-3 cursor-pointer items-center justify-center gap-4 rounded-md border border-none bg-[var(--page-bg)] px-4 py-2 text-sm font-semibold transition duration-300 ease-in-out"
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
