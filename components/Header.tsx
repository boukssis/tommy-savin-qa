"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { Logo } from "@/components/Logo";
import { nav } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const openedOnce = useRef(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!openedOnce.current) {
      openedOnce.current = true;
      return;
    }
    if (open) closeRef.current?.focus();
    else menuButtonRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function trapFocus(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab" || !panelRef.current) return;
    const focusable = panelRef.current.querySelectorAll<HTMLElement>("a[href], button");
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#041A2D] text-white">
      <div className="mx-auto flex h-[4.5rem] w-full max-w-[1400px] items-center justify-between gap-6 px-5 md:px-8">
        <Link href="/#home" className="shrink-0">
          <Logo priority />
        </Link>
        <nav className="hidden items-center gap-5 xl:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-b border-transparent pb-0.5 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-white/75 transition-colors hover:border-gold hover:text-white"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/#contact" className="btn btn-gold ml-2">
            Discuss Your Project
          </Link>
        </nav>
        <button
          ref={menuButtonRef}
          type="button"
          className="inline-flex size-11 items-center justify-center border border-white/20 xl:hidden"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>
      <div className="h-px bg-gold/80" aria-hidden="true" />
      {open && mounted
        ? createPortal(
            <div
              id={panelId}
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Primary"
              className="fixed inset-0 z-[80] xl:hidden"
              style={{ backgroundColor: "#041A2D" }}
              onKeyDown={trapFocus}
            >
              <div className="flex h-[4.5rem] items-center justify-between border-b border-white/10 bg-[#041A2D] px-5">
                <Logo />
                <button
                  ref={closeRef}
                  type="button"
                  className="inline-flex size-11 items-center justify-center border border-white/20 bg-[#041A2D]"
                  onClick={() => setOpen(false)}
                >
                  <X aria-hidden="true" />
                  <span className="sr-only">Close menu</span>
                </button>
              </div>
              <nav className="flex flex-col bg-[#041A2D] px-6 pt-4" aria-label="Mobile">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="border-b border-white/10 py-4 text-2xl font-semibold text-white"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link href="/#contact" className="btn btn-gold mt-8" onClick={() => setOpen(false)}>
                  Discuss Your Project
                </Link>
              </nav>
            </div>,
            document.body,
          )
        : null}
    </header>
  );
}
