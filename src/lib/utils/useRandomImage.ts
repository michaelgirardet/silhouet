import { StaticImageData } from "next/image";
import { useMemo } from "react";

export function useRandomImage(sources: StaticImageData[] | string) {
  return useMemo(() => {
    const index = Math.floor(Math.random() * sources.length);
    return sources[index];
  }, [sources]);
}
