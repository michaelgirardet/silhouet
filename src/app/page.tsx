"use client";

import { CheckCircle, ImageSquare } from "@phosphor-icons/react";

export default function Home() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16 grid gap-10 md:grid-cols-2 items-center min-h-[70vh]">
      <div className="text-center md:text-left">
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
          <button
            className="rounded bg-indigo px-6 py-3 font-semibold cursor-pointer text-white hover:bg-indigo/90 transition w-full sm:w-auto"
            aria-label="Supprimer l'arrière plan"
          >
            Supprimer l&apos;arrière plan
          </button>
          <button
            className="rounded bg-white px-6 py-3 font-semibold cursor-pointer text-black hover:bg-white/90 transition w-full sm:w-auto"
            aria-label="Boite à outils"
          >
            Boite à outils
          </button>
        </div>

        {/* Avantages : grille 2 colonnes, spacing adaptatif */}
        <div className="mt-8 grid grid-cols-2 gap-4 md:gap-6 text-sm text-muted-foreground max-w-md mx-auto md:mx-0">
          <div className="flex items-center gap-2">
            <CheckCircle size={28} />
            <p className="m-0">Aucune donnée conservée</p>
          </div>
          <div className="flex items-center gap-2">
            <ImageSquare size={28} />
            <p className="m-0">PNG transparent</p>
          </div>
        </div>
      </div>

      {/* Colonne droite libre pour une image/preview plus tard */}
      <div className="hidden md:block" />
    </section>
  );
}
