"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function ConvertImages() {
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  async function handleConvert(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsConverting(true);

    try {
      // Crée un canvas pour la conversion
      const img = document.createElement("img");
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Charge l'image
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
      });

      // Configure le canvas
      canvas.width = img.width;
      canvas.height = img.height;

      // Dessine l'image
      ctx?.drawImage(img, 0, 0);

      // Convertit en WebP
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setConvertedUrl(url);
          }
          setIsConverting(false);
        },
        "image/webp",
        0.8, // Qualité 80%
      );

      // Nettoie
      URL.revokeObjectURL(img.src);
    } catch (error) {
      console.error("Erreur lors de la conversion:", error);
      setIsConverting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl p-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">
        Convertisseur vers WebP
      </h1>

      <div className="mb-6">
        <label
          htmlFor="file-upload"
          className="flex w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 px-4 py-6 transition-colors hover:border-blue-500"
        >
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-600">
              Cliquez pour sélectionner une image
            </p>
            <p className="text-xs text-gray-500">
              PNG, JPG, GIF jusqu&apos;à 10MB
            </p>
          </div>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleConvert}
            className="hidden"
          />
        </label>
      </div>

      {isConverting && (
        <div className="py-8 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Conversion en cours...</p>
        </div>
      )}

      {convertedUrl && !isConverting && (
        <div className="mt-6 rounded-lg bg-gray-50 p-6">
          <p className="mb-4 font-semibold text-gray-700">Image convertie :</p>
          <div className="relative mx-auto mb-4 w-full max-w-md">
            <Image
              src={convertedUrl}
              alt="webp result"
              width={400}
              height={400}
              className="h-auto w-full rounded-lg border-2 border-gray-200"
            />
          </div>
          <a
            href={convertedUrl}
            download="converted.webp"
            className="inline-block rounded-lg bg-blue-500 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-600"
          >
            📥 Télécharger WebP
          </a>
        </div>
      )}
    </div>
  );
}
