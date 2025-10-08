"use client";
import Image from "next/image";
import Link from "next/link";
import LogoSilhouet from "../../../public/icons/icon.png";
import { ListIcon, XIcon } from "@phosphor-icons/react";
import { useState } from "react";

export default function Navbar() {
  const [burgerMenu, setBurgerMenu] = useState<boolean>(false);

  const handleSetBurgerMenu = () => {
    setBurgerMenu(!burgerMenu);
  };

  return (
    <header className="supports-[backdrop-filter]:bg-magnolia/60 border-indigo/10 sticky top-0 z-40 border-b">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={LogoSilhouet}
            alt="forme d'oiseau avec le nom de l'entreprise en dessous"
            height={68}
            width={68}
          />
        </Link>

        <nav className="md:text-md hidden items-center justify-between gap-4 text-sm font-medium md:flex md:gap-8">
          <ul className="flex items-center justify-center gap-4">
            <li>
              <a
                href="/remove-bg"
                className={
                  "hover:text-indigo rounded-full bg-white px-4 py-2 shadow-sm transition duration-300 ease-in-out"
                }
              >
                Supprimer l&apos;arrière plan
              </a>
            </li>
            <li>
              <a
                href="/convert"
                className={
                  "hover:bg-indigo/80 bg-indigo rounded-full px-4 py-2 text-white shadow-sm transition duration-300 ease-in-out"
                }
              >
                Convertir en WebP
              </a>
            </li>
          </ul>
        </nav>
        <button
          type="button"
          onClick={handleSetBurgerMenu}
          className="md:hidden"
        >
          <ListIcon size={32} />
        </button>
      </div>

      {/* BURGER MENU  */}
      {burgerMenu && (
        <div className="slidein bg-magnolia absolute inset-0 z-50 h-screen w-full gap-8 px-8 py-14 md:hidden">
          <span
            className="flex w-full justify-end"
            onClick={handleSetBurgerMenu}
          >
            <XIcon size={24} />
          </span>

          <ul className="flex flex-col gap-8 py-24 text-lg font-medium">
            <Link href={"/"} onClick={handleSetBurgerMenu}>
              <li>Accueil</li>
            </Link>

            <Link href={"/remove-bg"} onClick={handleSetBurgerMenu}>
              <li>Supprimer arrière plan</li>
            </Link>

            <Link href={"/convert"} onClick={handleSetBurgerMenu}>
              <li>Convertir en WebP</li>
            </Link>
          </ul>
        </div>
      )}
    </header>
  );
}
