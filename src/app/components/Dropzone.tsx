"use client";

import { CloudArrowUpIcon } from "@phosphor-icons/react";
import { useRef, useState } from "react";

export default function Dropzone({ onFile }: { onFile: (f: File) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="Déposez une image ou cliquez pour sélectionner un fichier"
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          inputRef.current?.click();
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        const f = e.dataTransfer.files?.[0];
        if (f) onFile(f);
      }}
      className={[
        // Toile : zone Cendre, rayon 24, hairline Bruine en dashed
        // (seule utilisation du dashed dans le système)
        "bg-ash rounded-images border border-dashed",
        drag ? "border-amber" : "border-haze",
        "mx-auto w-full max-w-3xl",
        "min-h-[220px] p-8 sm:p-10",
        "flex flex-col items-center justify-center gap-3 text-center",
        "transition-colors duration-150 hover:cursor-pointer",
      ].join(" ")}
    >
      <div aria-hidden className="text-ivory">
        <CloudArrowUpIcon size={24} weight="light" />
      </div>
      <div className="text-body-sm text-slate">Glissez votre image ici</div>
      <div className="text-micro text-stone">
        PNG, JPG, WebP — jusqu&apos;à 25 Mo
      </div>
      <div className="text-micro text-stone mt-4">
        Tout se passe dans votre navigateur — aucune image envoyée sur un
        serveur
      </div>
      <label htmlFor="glissez-image" aria-label="glissez-image">
        <input
          id="glissez-image"
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const f = e.currentTarget.files?.[0];
            if (f) onFile(f);
          }}
        />
      </label>
    </div>
  );
}
