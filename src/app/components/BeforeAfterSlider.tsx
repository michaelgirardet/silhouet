"use client";
import Image from "next/image";
import { useRef, useState, useCallback } from "react";

export default function BeforeAfterSlider() {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMove = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;

    const bounds = container.getBoundingClientRect();
    const x = clientX - bounds.left;
    const newPos = Math.min(100, Math.max(0, (x / bounds.width) * 100));
    setPosition(newPos);
  }, []);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      handleMove(event.clientX);
    },
    [isDragging, handleMove],
  );

  const handleTouchMove = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      if (event.touches.length > 0) {
        handleMove(event.touches[0].clientX);
      }
    },
    [handleMove],
  );

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className="relative aspect-[16/10] w-full max-w-2xl cursor-col-resize overflow-hidden rounded-2xl shadow-lg select-none"
      style={{ touchAction: "none" }}
    >
      {/* Image originale (fond avec objet) */}
      <Image
        src="/images/hero_img_1.webp"
        alt="Avant"
        className="pointer-events-none absolute inset-0 z-10 h-full w-full object-cover"
        width={1200}
        height={1200}
        draggable={false}
        priority
      />

      {/* Background transparent (milieu) - révélé par le slider */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{
          width: `${position}%`,
          willChange: "width",
        }}
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

      {/* Objet détouré seul (dessus) - masque l'objet original */}
      <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
        <Image
          src="/images/hero_img_1_removed_bg.webp"
          alt="Objet détouré"
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
        style={{
          left: `${position}%`,
          willChange: "left",
        }}
      >
        <div className="h-full w-[2px] translate-x-[-1px]" />
        <div className="border-whiteshadow-md absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2" />
      </div>
    </div>
  );
}
