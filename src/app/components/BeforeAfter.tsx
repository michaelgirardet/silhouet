"use client";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";

export default function BeforeAfter({
  before,
  after,
}: {
  before: string;
  after: string;
}) {
  const [v, setV] = useState(50);
  const wrapRef = useRef<HTMLDivElement>(null);

  const setFromEvent = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setV(Math.min(100, Math.max(0, next)));
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative overflow-hidden rounded-xl border border-border shadow-soft"
    >
      <Image
        src={before}
        alt="avant"
        className="block w-full h-auto select-none"
        width={1600}
        height={1200}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 800px"
        priority={false}
      />

      <div
        className="absolute inset-0 overflow-hidden border-r border-border transition-[width] duration-150"
        style={{ width: `${v}%` }}
        aria-hidden="true"
      >
        <Image
          src={after}
          alt="après"
          className="block w-full h-auto select-none"
          width={1600}
          height={1200}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 800px"
          priority={false}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-y-0"
        style={{ left: `calc(${v}% - 1px)` }}
        aria-hidden="true"
      >
        <div className="h-full w-[2px] bg-border mx-auto" />
      </div>

      {/* Hit area draggable (souris + tactile) */}
      <div
        className="absolute inset-0"
        onMouseDown={(e) => {
          e.preventDefault();
          setFromEvent(e.clientX);
          const onMove = (ev: MouseEvent) => setFromEvent(ev.clientX);
          const onUp = () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseup", onUp);
          };
          window.addEventListener("mousemove", onMove);
          window.addEventListener("mouseup", onUp);
        }}
        onTouchStart={(e) => {
          const t = e.touches[0];
          if (t) setFromEvent(t.clientX);
        }}
        onTouchMove={(e) => {
          const t = e.touches[0];
          if (t) setFromEvent(t.clientX);
        }}
      />
      <input
        type="range"
        min={0}
        max={100}
        value={v}
        onChange={(e) => setV(Number(e.target.value))}
        aria-label="Comparer avant/après"
        className="
          absolute left-1/2 -translate-x-1/2 bottom-3
          w-[70%] sm:w-3/5 h-1 rounded-full bg-border
          accent-indigo
          [appearance:none] 
          [&::-webkit-slider-thumb]:[appearance:none] 
          [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 
          [&::-webkit-slider-thumb]:rounded-full 
          [&::-webkit-slider-thumb]:bg-white 
          [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-border 
          [&::-webkit-slider-thumb]:shadow-soft
          [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-border
          [&::-moz-range-thumb]:shadow-soft
        "
      />
    </div>
  );
}
