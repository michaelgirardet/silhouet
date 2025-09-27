import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Silhouet",
  description: "Reveal the form, forget the background.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.variable} suppressHydrationWarning>
      <body>
        <div className="min-h-screen">
          <Navbar />
          <main className="mx-auto max-w-6xl min-h-[calc(100vh_-_20vh)]">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
