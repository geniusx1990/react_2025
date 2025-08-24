'use client';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);
  const titleId = 'modal-title';

  useEffect(() => {
    if (!isOpen) return;
    prevFocusRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
      prevFocusRef.current?.focus?.();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const root = contentRef.current;
        if (!root) return;
        const focusables = root.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const root = contentRef.current;
    if (!root) return;
    const first = root.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    setTimeout(() => first?.focus?.(), 0);
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/40"
        onMouseDown={onClose}
      />
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-lg max-h-[90vh] rounded-2xl border dark:border-gray-700
                   bg-white dark:bg-gray-900 shadow-xl flex flex-col"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur px-6 pt-6 pb-3 border-b dark:border-gray-800">
          <div className="flex items-center justify-between">
            <h2 id={titleId} className="text-lg font-semibold">
              {title}
            </h2>
            <button
              aria-label="Close"
              onClick={onClose}
              className="rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              ✖
            </button>
          </div>
        </div>

        <div className="px-6 py-4 overflow-y-auto">{children}</div>
      </div>
    </div>,
    document.body
  );
}
