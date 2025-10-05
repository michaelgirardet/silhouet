"use client";

import { useRandomImage } from "@/lib/utils/useRandomImage";
import { CheckCircleIcon, ImageSquareIcon } from "@phosphor-icons/react";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const images = [
    "/images/hero_img_1.webp",
    "/images/hero_img_2.webp",
    "/images/hero_img_3.webp",
    "/images/hero_img_4.webp",
  ] as const;
  const randomImage = useRandomImage(images);

  return (
    <section className="container mx-auto grid min-h-[70vh] items-center justify-between gap-10 px-4 py-12 md:grid-cols-2 md:py-16">
      <div className="flex h-full flex-col items-center justify-between text-center md:text-left">
        <h1
          className="mx-auto max-w-2xl text-4xl leading-tight font-bold tracking-tight md:mx-0 md:text-5xl lg:text-6xl"
          id="hero-title"
        >
          Supprimez l&apos;arrière plan en un{" "}
          <span className="text-indigo">clic.</span>
        </h1>

        <h2 className="moveup text-muted-foreground mx-auto mt-3 max-w-2xl text-base md:mx-0 md:mt-4 md:text-xl">
          Outil d&apos;image minimal et élégant : supprimez l&apos;arrière plan
          et convertissez dans vos formats favoris.
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
          <Link href="/tools" passHref>
            <button
              type="button"
              className="w-[230px] cursor-pointer rounded-full bg-white px-6 py-3 font-semibold text-black shadow-sm transition duration-300 ease-in-out hover:bg-white/110 sm:w-auto md:min-w-0"
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
      <div className="moveleft relative hidden h-full w-full md:block">
        <Image
          src={randomImage}
          alt="Portrait d’une femme brune sur fond rose"
          fill
          className="rounded-xl object-cover"
        />
      </div>
    </section>
  );
}
