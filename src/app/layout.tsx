
import "./globals.css";
import { ThemeProvider } from "next-themes";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeToggle from "./components/ThemeToggle";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Silhouet",
  description: "Reveal the form, forget the background.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen bg-bg text-fg">
            <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/40 border-b border-border">
              <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
                <Link href="/" className="font-semibold tracking-tight">Silhouet</Link>
                <nav className="flex items-center gap-4 text-sm">
                  <a href="/remove-bg" className="hover:opacity-80">Remove BG</a>
                  <a href="/toolkit" className="hover:opacity-80">Toolkit</a>
                  <ThemeToggle />
                </nav>
              </div>
            </header>
            <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
            <footer className="mx-auto max-w-6xl px-4 py-10 text-sm text-neutral-500">
              © {new Date().getFullYear()} · Silhouet · DA tokens (HSL) · Dark mode
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}


