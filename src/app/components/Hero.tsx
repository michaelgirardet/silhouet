import { ArrowRightIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Hero() {
  return (
    <section className="flex flex-col items-center justify-center gap-16">
      <div className="flex flex-col items-center justify-center gap-8">
        <h1 className="text-[var(--page-text)] text-6xl font-bold">
          Détourage précis et instantané.
        </h1>
        <h2 className="text-4xl font-medium">
          Sans compte. Sans limite. Sans stockage{" "}
        </h2>
        <h3 className="text-xl">
          Supprimez l&apos;arrière plan de vos images en quelques secondes.
          <br />
          PNG et WebP transparents prêts à l&apos;usage
        </h3>
        <div className="flex items-center gap-8">
          <Link href={"/remove-bg"}>
            <button
              type="button"
              className="bg-accent hover:bg-accent/80 rounded-full px-8 py-4 font-semibold text-white transition duration-150 ease-in-out hover:cursor-pointer"
            >
              Détourer une image maintenant
            </button>
          </Link>
          <Link href={"/convert"}>
            <button
              type="button"
              className="border-grey hover:bg-grey/5 rounded-full border px-8 py-4 font-semibold transition duration-150 ease-in-out hover:cursor-pointer"
            >
              Optimiser une image
            </button>
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4">
        <Image
          src={"/images/rosa_img.jpg"}
          alt="femme avec un chat"
          width={320}
          height={280}
          className="rounded-sm"
        />
        <ArrowRightIcon
          size={32}
          className="bg-grey rounded-full p-1 text-white"
        />
        <Image
          src={"/images/rosa_img_nobg.png"}
          alt="femme avec un chat"
          width={320}
          height={280}
          className="rounded-xl"
        />
      </div>
    </section>
  );
}

export default Hero;
