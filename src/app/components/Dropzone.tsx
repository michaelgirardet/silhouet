"use client";

import { CloudArrowUpIcon } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";

export default function Dropzone({ onFile }: { onFile: (f: File) => void }) {
  const { t } = useI18n();
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={t.dropzone.aria}
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
      <div className="text-body-sm text-slate">{t.dropzone.dropHint}</div>
      <div className="text-micro text-stone">{t.dropzone.formats}</div>
      <div className="text-micro leading-[1.3] text-stone mt-4">
        {t.dropzone.privacyNote}
      </div>
      <label htmlFor="dropzone-file" aria-label="dropzone-file">
        <input
          id="dropzone-file"
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
