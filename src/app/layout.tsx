import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import type { Metadata } from "next";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

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
    <html lang="fr" className={manrope.variable} suppressHydrationWarning>
      <body>
        <div className="flex min-h-screen flex-col justify-between">
          <Navbar />
          <main>
            {children} <Analytics />
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
