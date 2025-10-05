"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoSilhouet from "../../../public/icons/icon.webp";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="supports-[backdrop-filter]:bg-magnolia/60 border-border sticky top-0 z-40 border-b border-white backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={LogoSilhouet}
            alt="forme d'oiseau avec le nom de l'entreprise en dessous"
            height={68}
            width={68}
          />
        </Link>

        <nav className="md:text-md flex items-center gap-4 text-sm font-medium md:gap-8">
          <a
            href="/remove-bg"
            className={`rounded-full bg-white px-4 py-2 hover:opacity-80 ${
              pathname === "/remove-bg" ? "active" : ""
            } [&.active]:text-indigo`}
          >
            Supprimer l&apos;arrière plan
          </a>

          {/* Futures pages à implémenter */}

          {/* <a href="/toolkit" className={`hover:opacity-80 ${pathname === '/toolkit' ? 'active' : ''} [&.active]:text-indigo`}>
            Conversion
          </a>
          <a href="/toolkit" className={`hover:opacity-80 ${pathname === '/toolkit' ? 'active' : ''} [&.active]:text-indigo`}>
            Compression
          </a> */}
        </nav>
      </div>
    </header>
  );
}
