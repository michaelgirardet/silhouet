import { LightningIcon, ShieldSlashIcon, StarIcon } from "@phosphor-icons/react";
import React from "react";

const whyUsContent = [
  {
    id: 1,
    icon: <LightningIcon size={32} />,
    title: "Rapide",
    text: "Détourage automatique en quelques secondes",
  },
  {
    id: 1,
    icon: <StarIcon size={32} />,
    title: "Précis",
    text: "Bords nets, détails respectés",
  },
  {
    id: 1,
    icon: <ShieldSlashIcon size={32} />,
    title: "Respect de la vie privée",
    text: "Images traitées puis supprimées",
  },
];

function Whyus() {
  return (
    <div className="flex flex-col items-center justify-center gap-24">
      <h3 className="text-5xl">
        Pourquoi <span className="font-medium">Silhouet ?</span>
      </h3>

      <div className="grid grid-cols-1 content-center gap-8 md:grid-cols-3">
        {whyUsContent.map((item, index) => (
          <article
            key={index}
            className="flex max-w-64 cursor-pointer flex-col items-center gap-4 rounded-lg p-8 text-center shadow-lg transition duration-300 ease-in-out hover:scale-105"
          >
            <div>{item.icon}</div>
            <h4 className="font-semibold text-lg">{item.title}</h4>
            <p>{item.text}</p>
          </article>
        ))}
      </div>

      <div className="flex w-full flex-col items-center justify-center text-center">
        <h4 className="text-lg">
          Formats supportés: PNG, JPG, WEBP - Jusqu&apos;à 25MB
        </h4>
        <h5 className="text-grey/80">Vos images ne sont jamais conservées.</h5>
      </div>
    </div>
  );
}

export default Whyus;
