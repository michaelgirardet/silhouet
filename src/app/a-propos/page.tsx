import Image from "next/image";

export default function About() {
  return (
    <div className="flex flex-col items-center px-6 py-16">
      {/* Hero */}
      <div className="max-w-3xl space-y-6 text-center">
        <h2 className="text-3xl font-medium">
          Un outil simple pour des images propres
        </h2>

        <p className="text-base text-gray-600">
          Silhouet est un outil en ligne conçu pour une seule chose : supprimer
          l’arrière-plan de vos images rapidement, sans friction et sans
          compromis sur la qualité.
        </p>

        <p className="text-sm text-gray-500">
          Pas d’inscription · Pas de stockage · Pas de complexité inutile
        </p>
      </div>

      {/* Problem / Philosophy */}
      <div className="mt-20 grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Le problème</h3>
          <ul className="list-inside list-disc space-y-2 text-gray-600">
            <li>Des inscriptions inutiles</li>
            <li>Des quotas peu clairs</li>
            <li>Un stockage forcé des images</li>
            <li>Des interfaces surchargées</li>
          </ul>

          <p className="text-gray-600">Silhouet prend le contre-pied.</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">La philosophie</h3>
          <p className="text-gray-600">
            Un outil direct, transparent et respectueux de l’utilisateur.
          </p>
          <p className="text-gray-600">
            Vous déposez une image, l’arrière-plan est supprimé, vous récupérez
            un fichier prêt à l’usage.
          </p>
          <p className="text-gray-600">
            Aucune étape intermédiaire. Aucune action superflue.
          </p>
        </div>

        <Image
          src={"/images/about.jpg"}
          alt="photo artistique"
          width={720}
          height={360}
          className="col-span-2"
        />
      </div>

      {/* Privacy */}
      <div className="mt-20 max-w-3xl space-y-4 text-center">
        <h3 className="text-lg font-medium">
          Le respect de vos images avant tout
        </h3>
        <p className="text-gray-600">
          Silhouet ne conserve aucune image. Les fichiers sont traités
          uniquement le temps nécessaire, puis supprimés automatiquement.
        </p>
        <p className="text-gray-600">Vos images restent vos images.</p>
      </div>

      {/* For / Not for */}
      <div className="mt-20 grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Conçu pour</h3>
          <ul className="list-inside list-disc space-y-2 text-gray-600">
            <li>Les créateurs de contenu</li>
            <li>Les indépendants</li>
            <li>Les développeurs</li>
            <li>Les équipes produit</li>
            <li>Toute personne ayant besoin d’images propres rapidement</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Pas pensé pour</h3>
          <ul className="list-inside list-disc space-y-2 text-gray-600">
            <li>La retouche photo avancée</li>
            <li>Les workflows complexes</li>
            <li>Les outils tout-en-un surchargés</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <div className="mt-24 max-w-3xl space-y-4 text-center">
        <p className="text-gray-700">
          Silhouet fait volontairement peu de choses. Mais il les fait bien.
        </p>
        <p className="text-gray-600">
          Un outil simple, fiable et respectueux, conçu pour disparaître
          derrière l’usage.
        </p>
      </div>
    </div>
  );
}
