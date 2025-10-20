"use client";
import Link from "next/link";
import { ListIcon, XIcon } from "@phosphor-icons/react";
import { useState } from "react";

export default function Navbar() {
  const [burgerMenu, setBurgerMenu] = useState<boolean>(false);

  const handleSetBurgerMenu = () => {
    setBurgerMenu(!burgerMenu);
  };

  return (
    <header className="border-indigo/10 top-0 z-40 border-b">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <h1 className="text-indigo text-3xl font-semibold">Silhouet</h1>
        </Link>

        <nav className="md:text-md hidden items-center justify-between gap-4 text-base font-medium md:flex md:gap-8">
          <ul className="flex items-center justify-center gap-4">
            <li>
              <a
                href="/remove-bg"
                className={
                  "hover:text-indigo rounded-full bg-white px-4 py-2 font-semibold shadow-sm transition duration-300 ease-in-out"
                }
              >
                Supprimer l&apos;arrière plan
              </a>
            </li>
            <li>
              <a
                href="/convert"
                className={
                  "hover:bg-indigo/80 bg-indigo rounded-full px-4 py-2 font-semibold text-white shadow-sm transition duration-300 ease-in-out"
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
          aria-label="open mobile menu"
        >
          <ListIcon size={32} />
        </button>
      </div>

      {/* BURGER MENU  */}
      {burgerMenu && (
        <div className="slidein absolute inset-0 z-50 h-screen w-full gap-8 bg-white p-4 md:hidden">
          <span
            className="flex w-full justify-between"
            onClick={handleSetBurgerMenu}
          >
            <h3 className="text-indigo text-3xl font-semibold">Silhouet</h3>
            <XIcon size={38} />
          </span>

          <ul className="flex flex-col gap-8 px-8 py-24 text-xl font-semibold">
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
          <div className="flex w-full items-center justify-center">
            <button
              className="border-rose text-rose flex h-14 w-48 items-center justify-center rounded-full border font-semibold"
              onClick={() => setBurgerMenu(!burgerMenu)}
            >
              Retour
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
