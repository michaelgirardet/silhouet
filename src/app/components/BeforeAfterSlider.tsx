"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export default function BeforeAfterSlider() {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const clamp = (n: number) => Math.min(100, Math.max(0, n));

  const handleMove = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const bounds = container.getBoundingClientRect();
    const x = clientX - bounds.left;
    setPosition(clamp((x / bounds.width) * 100));
  }, []);

  // Fin du drag même si on sort du conteneur
  useEffect(() => {
    const onUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener("mouseup", onUp);
      window.addEventListener("touchend", onUp);
      window.addEventListener("touchcancel", onUp);
    }
    return () => {
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
      window.removeEventListener("touchcancel", onUp);
    };
  }, [isDragging]);

  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(true);
      handleMove(e.clientX);
    },
    [handleMove],
  );

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove],
  );

  const onTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const t = e.touches[0];
      if (t) {
        setIsDragging(true);
        handleMove(t.clientX);
      }
    },
    [handleMove],
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const t = e.touches[0];
      if (t) handleMove(t.clientX);
    },
    [handleMove],
  );

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 1;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPosition((p) => clamp(p - step));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPosition((p) => clamp(p + step));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPosition(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPosition(100);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/10] w-full max-w-2xl cursor-col-resize overflow-hidden rounded-2xl shadow-lg select-none"
      style={{ touchAction: "none" }}
      role="slider"
      aria-label="Curseur de comparaison avant/après"
      aria-orientation="horizontal"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setIsDragging(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
    >
      {/* Image originale */}
      <Image
        src="/images/hero_img_1.webp"
        alt="Avant"
        className="pointer-events-none absolute inset-0 z-10 h-full w-full object-cover"
        width={1200}
        height={1200}
        draggable={false}
        priority
      />

      {/* Transparence révélée par le slider */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ width: `${position}%`, willChange: "width" }}
        aria-hidden="true"
      >
        <Image
          src="/images/bg_transparent.webp"
          alt="Background transparent"
          className="absolute inset-0 z-20 h-full w-full object-cover"
          width={1200}
          height={1200}
          draggable={false}
          priority
        />
      </div>

      {/* Objet détouré au-dessus */}
      <div
        className="pointer-events-none absolute inset-0 z-30 overflow-hidden"
        aria-hidden="true"
      >
        <Image
          src="/images/hero_img_1_removed_bg.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          width={1200}
          height={1200}
          draggable={false}
          priority
        />
      </div>

      {/* Ligne + poignée */}
      <div
        className="pointer-events-none absolute top-0 bottom-0"
        style={{ left: `${position}%`, willChange: "left" }}
        aria-hidden="true"
      >
        <div className="h-full w-[2px] translate-x-[-1px]" />
        <div className="border-whiteshadow-md absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2" />
      </div>
    </div>
  );
}
