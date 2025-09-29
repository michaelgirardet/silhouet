"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoSilhouet from "../../../public/icons/silhouet.png";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-magnolia/60 border-b border-border border-white">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={LogoSilhouet}
            alt="forme d'oiseau avec le nom de l'entreprise en dessous"
            height={68}
            width={68}
          />
        </Link>

        <nav className="flex items-center gap-4 md:gap-8 text-sm md:text-md font-medium ">
          <a
            href="/remove-bg"
            className={`hover:opacity-80 bg-white px-4 py-2 rounded-full   ${
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
