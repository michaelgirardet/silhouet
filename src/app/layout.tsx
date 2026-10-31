import "./globals.css";
import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Inter, Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Silhouet",
  description: "Révélez la forme, oubliez l'arrière-plan.",
};

export const viewport: Viewport = {
  themeColor: "#121014",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // La lecture des request headers force le rendu dynamique, indispensable
  // pour que Next.js injecte le nonce CSP (généré dans le middleware) dans
  // ses scripts inline. Un rendu statique servi depuis le cache ne peut pas
  // recevoir de nonce par requête.
  await headers();
  return (
    <html lang="fr" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>
        <div className="flex min-h-screen flex-col justify-between">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
