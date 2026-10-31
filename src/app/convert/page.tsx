"use client";

import { DownloadSimpleIcon, RepeatIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Dropzone from "@/app/components/Dropzone";
import Loader from "@/app/components/Loader";
import { validateImageFile } from "@/lib/image";
import { useI18n } from "@/lib/i18n";

export default function ConvertImages() {
  const { t } = useI18n();
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
      setError(
        validationError === "not-image" ? t.errors.notImage : t.errors.tooLarge,
      );
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
      setError(t.errors.conversion);
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
    <section className="mx-auto flex w-full max-w-page flex-col items-center gap-12 px-6 py-16 md:py-24">
      <div className="flex max-w-2xl flex-col items-center gap-4 text-center">
        <h1 className="text-ivory font-display text-heading font-medium sm:text-heading-lg">
          {t.convert.title}
        </h1>
        <p className="text-body-sm text-stone">{t.convert.subtitle}</p>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-8">
        <Dropzone onFile={process} />
        {busy && <Loader label={t.convert.loader} />}
      </div>

      {error && (
        <div className="bg-ash rounded-inputs border-haze/60 w-full max-w-3xl border p-3 text-caption text-slate">
          <p>{error}</p>
        </div>
      )}

      {/* Résultat */}
      {srcURL && (
        <div className="bg-soot rounded-cards grid w-full max-w-4xl grid-cols-1 gap-4 border border-white/6 p-4 sm:grid-cols-2 md:p-6">
          <figure className="flex flex-col gap-2">
            <figcaption className="text-micro text-stone">
              {t.convert.source}
            </figcaption>
            <Image
              src={srcURL}
              alt={t.convert.altSource}
              className="rounded-images h-auto w-full border border-white/6"
              width={800}
              height={800}
            />
          </figure>

          {outURL && (
            <div className="flex flex-col gap-4">
              <figure className="flex flex-col gap-2">
                <figcaption className="text-micro text-stone">
                  {t.convert.result}
                </figcaption>
                <div className="checker rounded-images halo-reveal border border-white/6 p-2">
                  <Image
                    src={outURL}
                    alt={t.convert.altResult}
                    className="block h-auto w-full"
                    width={800}
                    height={800}
                  />
                </div>
              </figure>
              <div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
                <a
                  href={outURL}
                  download="converted.webp"
                  className="bg-chalk text-canvas hover:bg-ivory inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-2.5 text-caption transition-colors duration-150"
                >
                  <DownloadSimpleIcon size={20} weight="light" />
                  {t.convert.download}
                </a>
                <button
                  type="button"
                  className="border-haze text-slate hover:border-stone hover:text-ivory inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-caption transition-colors duration-150"
                  onClick={reset}
                >
                  <RepeatIcon size={20} weight="light" /> {t.convert.retry}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
