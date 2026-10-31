"use client";
import Link from "next/link";
import {
  ListIcon,
  MoonIcon,
  SunIcon,
  TranslateIcon,
  XIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";

type Theme = "dark" | "light";

function setThemeCookie(theme: Theme) {
  document.cookie = `theme=${theme};path=/;max-age=31536000;samesite=lax`;
}

export default function Navbar({ initialTheme }: { initialTheme: Theme }) {
  const { lang, t, setLang } = useI18n();
  const [burgerMenu, setBurgerMenu] = useState<boolean>(false);
  const [theme, setTheme] = useState<Theme>(initialTheme);

  const handleSetBurgerMenu = () => {
    setBurgerMenu(!burgerMenu);
  };

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    setThemeCookie(next);
    document.documentElement.dataset.theme = next;
  };

  const switchLang = () => {
    setLang(lang === "fr" ? "en" : "fr");
  };

  const links = [
    { href: "/remove-bg", label: t.nav.remove },
    { href: "/convert", label: t.nav.convert },
    { href: "/a-propos", label: t.nav.about },
  ];

  return (
    <header className="bg-canvas/80 sticky top-0 z-40 border-b border-white/6 backdrop-blur-xl">
      <nav className="mx-auto flex h-[72px] max-w-page items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <span aria-hidden className="text-ivory inline-flex h-6 w-6">
            <svg viewBox="0 0 256 256" className="h-full w-full">
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="34"
                strokeLinecap="round"
                d="M168 88 A40 40 0 1 0 128 128 A40 40 0 1 1 168 168"
              />
              <line
                x1="41"
                y1="128"
                x2="215"
                y2="128"
                stroke="#e8a33d"
                strokeWidth="12"
                strokeDasharray="30 18"
              />
            </svg>
          </span>
          <span className="text-ivory font-display text-caption tracking-micro font-medium">
            SILHOUET
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-stone hover:text-ivory inline-block py-2 text-caption transition-colors duration-150"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={switchLang}
            aria-label={t.nav.switchLang}
            className="text-slate hover:text-ivory inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full px-2.5 text-caption transition-colors duration-150"
          >
            <TranslateIcon size={20} weight="light" />
            <span className="font-medium">
              {lang === "fr" ? "EN" : "FR"}
            </span>
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? t.nav.toLight : t.nav.toDark}
            className="text-slate hover:text-ivory inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-colors duration-150"
          >
            {theme === "dark" ? (
              <SunIcon size={20} weight="light" />
            ) : (
              <MoonIcon size={20} weight="light" />
            )}
          </button>

          <Link
            href="/remove-bg"
            className="bg-chalk text-canvas hover:bg-ivory ml-2 hidden rounded-full px-5 py-2.5 text-caption transition-colors duration-150 md:inline-flex"
          >
            {t.nav.openTool}
          </Link>
          <button
            type="button"
            onClick={handleSetBurgerMenu}
            className="text-slate md:hidden"
            aria-label={t.nav.openMenu}
          >
            <ListIcon size={28} weight="light" />
          </button>
        </div>
      </nav>

      {/* BURGER MENU  */}
      {burgerMenu && (
        <div className="bg-canvas slidein fixed inset-0 z-50 flex h-screen w-full flex-col gap-8 p-6 md:hidden">
          <span className="flex w-full items-center justify-between">
            <span className="text-ivory font-display text-heading font-medium">
              Silhouet
            </span>
            <button
              type="button"
              onClick={handleSetBurgerMenu}
              className="text-slate cursor-pointer"
              aria-label={t.nav.closeMenu}
            >
              <XIcon size={32} weight="light" />
            </button>
          </span>

          <ul className="text-ivory mt-24 flex flex-col gap-8 px-4 text-xl font-medium">
            <li>
              <Link href="/" onClick={handleSetBurgerMenu}>
                {t.nav.home}
              </Link>
            </li>
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={handleSetBurgerMenu}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex w-full items-center justify-center">
            <Link
              href="/remove-bg"
              onClick={handleSetBurgerMenu}
              className="bg-chalk text-canvas hover:bg-ivory flex h-14 w-48 items-center justify-center rounded-full text-caption transition-colors duration-150"
            >
              {t.nav.openTool}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
