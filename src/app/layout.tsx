import "./globals.css";
import type { Metadata } from "next";
import { headers } from "next/headers";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Manrope } from "next/font/google";
import { ThemeProvider } from "next-themes";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Silhouet",
  description: "Révélez la forme, oubliez l'arrière-plan.",
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
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <html lang="fr" className={manrope.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          nonce={nonce}
        >
          <div className="flex min-h-screen flex-col justify-between">
            <Navbar />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
