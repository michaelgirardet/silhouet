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

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
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
      className="fixed inset-0 z-50 flex items-center bg-black/10 justify-center p-4"
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
          relative w-full bg-magnolia max-w-3xl text-lg rounded-xl border/20 shadow-2xl
          animate-in fade-in duration-150
        "
      >
        <div className="flex items-center justify-between rounded-t-2xl text-white p-4 md:p-5 bg-indigo border-border">
          <div className="font-semibold text-base md:text-lg">{title}</div>
          <button
            ref={firstFocusRef}
            onClick={onClose}
            className="px-3 py-1.5 rounded-md text-white font-bold bg-indigo/10 cursor-pointer border border-border "
          >
            ✕
          </button>
        </div>

        <div className="p-4 md:p-5 max-h-[70vh] overflow-auto bg-white">
          {children}
        </div>

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
