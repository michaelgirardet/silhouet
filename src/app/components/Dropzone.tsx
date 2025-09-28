"use client";
import { useRef, useState } from "react";

export default function Dropzone({ onFile }: { onFile: (f: File) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) =>
        (e.key === "Enter" || e.key === " ") && inputRef.current?.click()
      }
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
        "border border-border border-dotted rounded-lg",
        "w-full max-w-3xl mx-auto",
        "min-h-[160px] sm:min-h-[190px] md:min-h-[220px]",
        "p-5 sm:p-6 md:p-8 text-center",
        "flex flex-col items-center justify-center",
        "transition",
        drag ? "shadow-float border-accent-400" : "shadow-soft",
      ].join(" ")}
    >
      <div className="font-medium text-base sm:text-lg">
        Glissez votre image ici
      </div>
      <div className="text-xs sm:text-sm opacity-70 mt-1">
        PNG, JPG, WebP — &lt; 25MB
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
        }}
      />
    </div>
  );
}
