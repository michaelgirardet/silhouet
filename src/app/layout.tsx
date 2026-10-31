import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import type { Metadata } from "next";
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={manrope.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col justify-between">
            <Navbar />
            <main>
              {children} <Analytics />
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
