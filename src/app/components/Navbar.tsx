'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-magnolia/60 border-b border-border border-white">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <h1 className="text-2xl md:text-3xl font-bold text-indigo">
            Silhouet
          </h1>
        </Link>

        <nav className="flex items-center gap-4 md:gap-8 text-md md:text-lg font-medium ">
          <a href="/remove-bg" className={`hover:opacity-80 ${pathname === '/remove-bg' ? 'active' : ''} [&.active]:text-indigo`}>
            Détourage
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
