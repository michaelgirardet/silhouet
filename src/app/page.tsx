"use client";

import { CheckCircleIcon, ImageSquareIcon } from "@phosphor-icons/react";
import Link from "next/link";
import BeforeAfterSlider from "./components/BeforeAfterSlider";

export default function Home() {
  return (
    <section className="container mx-auto grid min-h-[70vh] items-center justify-between gap-10 px-4 py-12 md:grid-cols-2 md:py-16">
      <div className="flex h-full flex-col items-center justify-between text-center md:text-left">
        <h1 className="hero-title text-mauve mx-auto max-w-2xl text-4xl leading-tight font-bold tracking-tight md:mx-0 md:text-5xl lg:text-6xl">
          Supprimez l&apos;arrière plan de vos images en un{" "}
          <span className="text-indigo">clic</span>.
        </h1>

        <h2 className="moveup text-mauve mx-auto mt-3 max-w-2xl text-base md:mx-0 md:mt-4 md:text-xl">
          Obtenez un fond transparent instantanément et convertissez vos images
          en WebP pour un web plus rapide — sans perdre en qualité.
        </h2>
        <div className="moveup mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:items-stretch sm:gap-4 md:justify-start">
          <Link href="/remove-bg" passHref>
            <button
              type="button"
              className="bg-indigo hover:bg-indigo/80 w-[230px] cursor-pointer rounded-full px-6 py-3 font-semibold text-white shadow-sm transition duration-300 ease-in-out sm:w-auto md:min-w-0"
              aria-label="Supprimer l'arrière plan"
            >
              Supprimer l&apos;arrière plan
            </button>
          </Link>
          <Link href="/convert" passHref>
            <button
              type="button"
              className="hover:text-indigo text-mauve w-[230px] cursor-pointer rounded-full bg-white px-6 py-3 font-semibold shadow-sm transition duration-300 ease-in-out sm:w-auto md:min-w-0"
              aria-label="Convertir une image"
            >
              Convertir
            </button>
          </Link>
        </div>

        <div className="moveup text-muted-foreground mx-auto mt-8 grid max-w-md grid-cols-2 gap-4 text-sm md:mx-0 md:gap-6">
          <div className="flex items-center gap-2">
            <CheckCircleIcon size={28} />
            <p>Aucune donnée conservée</p>
          </div>
          <div className="flex items-center gap-2">
            <ImageSquareIcon size={28} />
            <p>PNG transparent</p>
          </div>
        </div>
      </div>

      {/* Image on right  */}
      <div className="moveleft relative hidden h-full w-full items-center justify-center md:flex">
        <BeforeAfterSlider />
      </div>
    </section>
  );
}
