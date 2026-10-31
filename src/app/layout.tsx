import "./globals.css";
import type { Metadata, Viewport } from "next";
import { cookies, headers } from "next/headers";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Inter, Space_Grotesk } from "next/font/google";
import { I18nProvider, type Lang } from "@/lib/i18n";

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
  openGraph: {
    title: "Silhouet",
    description:
      "Détourage d'images 100 % local, aucune image envoyée sur un serveur.",
    images: ["/og.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
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

  // Thème et langue persistés en cookie : le premier rendu HTML est déjà
  // correct (pas de script inline de correction, incompatible avec la CSP),
  // et aucun flash au chargement.
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value === "light" ? "light" : "dark";
  const lang: Lang = cookieStore.get("lang")?.value === "en" ? "en" : "fr";

  return (
    <html
      lang={lang}
      data-theme={theme}
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <body>
        <I18nProvider initial={lang}>
          <div className="flex min-h-screen flex-col justify-between">
            <Navbar initialTheme={theme} />
            <main>{children}</main>
            <Footer />
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
