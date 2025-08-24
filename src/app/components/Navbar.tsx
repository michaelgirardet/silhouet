import Link from "next/link";
import ThemeToggle from "./ThemeToggle";


export default function Navbar() { 
    return (
       <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/40 border-b border-border">
              <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
             

                <Link href="/" className="flex items-center gap-3">
                <h1 className="text-lg font-bold text-white">Silhouet</h1>
                </Link>
                
                <nav className="flex items-center gap-4 text-sm">
                  <a href="/remove-bg" className="hover:opacity-80">Remove BG</a>
                  <a href="/toolkit" className="hover:opacity-80">Toolkit</a>
                  <ThemeToggle />
                </nav>
              </div>
        </header>
    )
}