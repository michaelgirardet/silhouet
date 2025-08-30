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

export default function Modal({
  open,
  title,
  onClose,
  children,
  footer,
}: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFocusRef = useRef<HTMLButtonElement>(null);

  // Lock scroll + ESC + focus initial
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        // focus trap minimaliste
        const root = dialogRef.current;
        if (!root) return;
        const focusables = root.querySelectorAll<HTMLElement>(
          'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;

        if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        }
      }
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
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="
          relative w-full max-w-3xl bg-bg text-fg rounded-xl border border-border shadow-float
          animate-in fade-in zoom-in-95 duration-150
        "
      >
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-border">
          <div className="font-semibold text-base md:text-lg">{title}</div>
          <button
            ref={firstFocusRef}
            onClick={onClose}
            className="px-3 py-1.5 rounded-md border border-border hover:bg-muted transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Contenu scrollable si besoin */}
        <div className="p-4 md:p-5 max-h-[70vh] overflow-auto">{children}</div>

        {footer && (
          <div className="p-4 md:p-5 border-t border-border flex flex-col sm:flex-row gap-2 sm:justify-end">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
