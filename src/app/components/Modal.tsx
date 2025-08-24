"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type Props = {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode; 
};

export default function Modal({ open, title, onClose, children, footer }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstFocusRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  
    requestAnimationFrame(() => firstFocusRef.current?.focus());
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onMouseDown={(e) => {
        if (e.target === overlayRef.current) onClose(); 
      }}
      aria-hidden={!open}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative w-full max-w-3xl bg-bg text-fg rounded-lg border border-border shadow-float"
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="font-semibold">{title}</div>
          <button
            ref={firstFocusRef}
            onClick={onClose}
            className="px-3 py-1.5 rounded-md border border-border hover:bg-muted transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="p-4">{children}</div>
        {footer && <div className="p-4 border-t border-border flex gap-2 justify-end">{footer}</div>}
      </div>
    </div>,
    document.body
  );
}
