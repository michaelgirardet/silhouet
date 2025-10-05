"use client";

import { XIcon } from "@phosphor-icons/react";
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
          'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])',
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 p-4"
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
        className="bg-magnolia border/20 animate-in fade-in relative w-full max-w-3xl rounded-xl text-lg shadow-2xl duration-150"
      >
        <div className="bg-indigo border-border flex items-center justify-between rounded-t-2xl p-4 text-white md:p-5">
          <div className="text-base font-semibold md:text-lg">{title}</div>
          <button
            ref={firstFocusRef}
            onClick={onClose}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full font-bold text-white transition duration-300 ease-in-out hover:border"
          >
            <XIcon size={24} />
          </button>
        </div>

        <div
          className="bg- max-h-[70vh] overflow-auto p-4 md:p-5"
          id="bg-background-remover"
        >
          {children}
        </div>

        {footer && (
          <div className="border-border flex flex-col gap-2 border-t p-4 sm:flex-row sm:justify-end md:p-5">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
