"use client";

import { ExportIcon } from "@phosphor-icons/react";
import { useRef, useState } from "react";

export default function Dropzone({ onFile }: { onFile: (f: File) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);

  return (
    <div
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
        "text-indigo bg-indigo/5 hover:bg-indigo/10 rounded-lg font-semibold duration-300 ease-in-out",
        "mx-auto w-full max-w-3xl",
        "min-h-[160px] sm:min-h-[190px] md:min-h-[220px]",
        "p-5 text-center sm:p-6 md:p-8",
        "flex flex-col items-center justify-center",
        "transition hover:cursor-pointer",
        drag ? "shadow-float border-accent-400" : "shadow-soft",
      ].join(" ")}
    >
      <div className="flex flex-col items-center justify-center text-base font-medium sm:text-lg">
        <ExportIcon size={32} />
        Glissez votre image ici
      </div>
      <div className="mt-1 text-xs opacity-70 sm:text-sm">
        PNG, JPG, WebP — &lt; 25MB
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
