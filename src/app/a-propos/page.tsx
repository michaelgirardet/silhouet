import Image from "next/image";

export default function About() {
  return (
    <div className="mx-auto flex max-w-page flex-col items-center px-6 py-16 md:py-24">
      {/* Hero */}
      <div className="max-w-3xl space-y-6 text-center">
        <h1 className="text-ivory font-display text-heading font-medium sm:text-heading-lg">
          Un outil simple pour des images propres
        </h1>

        <p className="text-body text-slate">
          Silhouet est un outil en ligne conçu pour une seule chose : supprimer
          l’arrière-plan de vos images rapidement, sans friction et sans
          compromis sur la qualité.
        </p>

        <p className="text-body-sm text-stone">
          Pas d’inscription · Pas de stockage · Pas de complexité inutile
        </p>
      </div>

      {/* Problem / Philosophy */}
      <div className="mt-20 grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-ivory font-display text-subheading font-medium">
            Le problème
          </h2>
          <ul className="text-body-sm list-inside list-disc space-y-2 text-slate">
            <li>Des inscriptions inutiles</li>
            <li>Des quotas peu clairs</li>
            <li>Un stockage forcé des images</li>
            <li>Des interfaces surchargées</li>
          </ul>

          <p className="text-body-sm text-slate">
            Silhouet prend le contre-pied.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-ivory font-display text-subheading font-medium">
            La philosophie
          </h2>
          <p className="text-body-sm text-slate">
            Un outil direct, transparent et respectueux de l’utilisateur.
          </p>
          <p className="text-body-sm text-slate">
            Vous déposez une image, l’arrière-plan est supprimé, vous récupérez
            un fichier prêt à l’usage.
          </p>
          <p className="text-body-sm text-slate">
            Aucune étape intermédiaire. Aucune action superflue.
          </p>
        </div>

        <Image
          src="/images/about.jpg"
          alt="photo artistique"
          width={720}
          height={360}
          className="rounded-images col-span-2 h-auto w-full border border-white/6"
        />
      </div>

      {/* Privacy */}
      <div className="bg-soot rounded-cards mt-20 max-w-3xl space-y-4 border border-white/6 p-8 text-center md:p-10">
        <h2 className="text-ivory font-display text-subheading font-medium">
          Le respect de vos images avant tout
        </h2>
        <p className="text-body-sm text-slate">
          Silhouet ne conserve aucune image. Les fichiers sont traités
          uniquement le temps nécessaire, puis supprimés automatiquement.
        </p>
        <p className="text-body-sm text-ivory">Vos images restent vos images.</p>
      </div>

      {/* For / Not for */}
      <div className="mt-20 grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-ivory font-display text-subheading font-medium">
            Conçu pour
          </h2>
          <ul className="text-body-sm list-inside list-disc space-y-2 text-slate">
            <li>Les créateurs de contenu</li>
            <li>Les indépendants</li>
            <li>Les développeurs</li>
            <li>Les équipes produit</li>
            <li>Toute personne ayant besoin d’images propres rapidement</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-ivory font-display text-subheading font-medium">
            Pas pensé pour
          </h2>
          <ul className="text-body-sm list-inside list-disc space-y-2 text-slate">
            <li>La retouche photo avancée</li>
            <li>Les workflows complexes</li>
            <li>Les outils tout-en-un surchargés</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <div className="mt-24 max-w-3xl space-y-4 text-center">
        <p className="text-body text-ivory">
          Silhouet fait volontairement peu de choses. Mais il les fait bien.
        </p>
        <p className="text-body-sm text-stone">
          Un outil simple, fiable et respectueux, conçu pour disparaître
          derrière l’usage.
        </p>
      </div>
    </div>
  );
}
