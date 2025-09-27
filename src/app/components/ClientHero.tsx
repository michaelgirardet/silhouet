// Pour éviter le mismatch d'hydratation sur l'image aléatoire du Hero
"use client";

import Image, { type ImageProps } from "next/image";

type Props = {
  src: ImageProps["src"];
  alt: string;
} & Omit<ImageProps, "src" | "alt">;

export default function ClientHero({ src, alt, ...imgProps }: Props) {
  const handleClickOnImage = () => {
    console.log("Image cliquée !");
  };

  return (
    <div className="relative hidden md:block h-full w-full">
      <Image
        src={src}
        alt={alt}
        fill
        className="rounded-xl object-cover"
        onClick={handleClickOnImage}
        {...imgProps}
      />
    </div>
  );
}
