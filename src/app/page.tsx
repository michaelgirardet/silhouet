"use client";

import { useRandomImage } from "@/lib/utils/useRandomImage";
import { CheckCircleIcon, ImageSquareIcon } from "@phosphor-icons/react";
import image1 from "../../public/hero_img_1.webp";
import image2 from "../../public/hero_img_2.jpg";
import image3 from "../../public/hero_img_3.jpg";
import image4 from "../../public/hero_img_4.jpg";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const images = [image1, image2, image3, image4];
  const randomImage = useRandomImage(images);

  return (
    <section className="container mx-auto px-4 py-12 md:py-16 grid gap-10 md:grid-cols-2 items-center justify-between min-h-[70vh]">
      {/* Text on left  */}
      <div className="text-center md:text-left h-full flex flex-col justify-between items-center">
        <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight mx-auto md:mx-0 max-w-2xl">
          Supprimez l&apos;arrière plan en un{" "}
          <span className="text-indigo">clic.</span>
        </h1>

        <h2 className="mt-3 md:mt-4 text-base md:text-xl text-muted-foreground mx-auto md:mx-0 max-w-2xl">
          Outil d&apos;image minimal et élégant : détourage, conversion et
          compression
        </h2>

        {/* Boutons : colonne sur mobile, ligne dès sm/md */}
        <div className="mt-6 flex flex-col sm:flex-row items-center sm:items-stretch justify-center md:justify-start gap-3 sm:gap-4">
          <Link href="/remove-bg" passHref>
            <button
              className="rounded bg-indigo px-6 py-3 w-[230px] md:min-w-0 font-semibold cursor-pointer text-white hover:bg-indigo/90 transition sm:w-auto"
              aria-label="Supprimer l'arrière plan"
            >
              Supprimer l&apos;arrière plan
            </button>
          </Link>
          <Link href="/tools" passHref>
            <button
              className="rounded bg-white px-6 py-3 font-semibold w-[230px] md:min-w-0 cursor-pointer text-black hover:bg-white/90 transition sm:w-auto"
              aria-label="Boite à outils"
            >
              Boite à outils
            </button>
          </Link>
        </div>

        {/* Grille 2 colonnes, spacing adaptatif */}
        <div className="mt-8 grid grid-cols-2 gap-4 md:gap-6 text-sm text-muted-foreground max-w-md mx-auto md:mx-0">
          <div className="flex items-center gap-2">
            <CheckCircleIcon size={28} />
            <p className="m-0">Aucune donnée conservée</p>
          </div>
          <div className="flex items-center gap-2">
            <ImageSquareIcon size={28} />
            <p className="m-0">PNG transparent</p>
          </div>
        </div>
      </div>

      {/* Image on right  */}
      <div className="relative hidden md:block h-full w-full">
        <Image
          src={randomImage}
          alt="Portrait d’une femme brune sur fond rose"
          fill
          className="rounded-xl object-cover "
        />
      </div>
    </section>
  );
}
