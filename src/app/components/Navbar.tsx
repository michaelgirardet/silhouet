"use client";
import Link from "next/link";
import { ListIcon, XIcon } from "@phosphor-icons/react";
import { useState } from "react";

const links = [
  { href: "/remove-bg", label: "Détourer" },
  { href: "/convert", label: "Convertir" },
  { href: "/a-propos", label: "À propos" },
];

export default function Navbar() {
  const [burgerMenu, setBurgerMenu] = useState<boolean>(false);

  const handleSetBurgerMenu = () => {
    setBurgerMenu(!burgerMenu);
  };

  return (
    <header className="bg-canvas/80 sticky top-0 z-40 border-b border-white/6 backdrop-blur-xl">
      <nav className="mx-auto flex h-[72px] max-w-page items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <span aria-hidden className="text-ivory text-xl">
            ◐
          </span>
          <span className="text-ivory font-display text-caption tracking-micro font-medium">
            SILHUET
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

        <div className="flex items-center gap-4">
          <Link
            href="/remove-bg"
            className="bg-chalk text-canvas hover:bg-ivory hidden rounded-full px-5 py-2.5 text-caption transition-colors duration-150 md:inline-flex"
          >
            Ouvrir l&apos;outil
          </Link>
          <button
            type="button"
            onClick={handleSetBurgerMenu}
            className="text-slate md:hidden"
            aria-label="open mobile menu"
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
              aria-label="Fermer le menu"
            >
              <XIcon size={32} weight="light" />
            </button>
          </span>

          <ul className="text-ivory mt-24 flex flex-col gap-8 px-4 text-xl font-medium">
            <li>
              <Link href="/" onClick={handleSetBurgerMenu}>
                Accueil
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
              Ouvrir l&apos;outil
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
