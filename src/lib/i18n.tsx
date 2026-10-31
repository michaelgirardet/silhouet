"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "fr" | "en";

const fr = {
  nav: {
    remove: "Détourer",
    convert: "Convertir",
    about: "À propos",
    home: "Accueil",
    openTool: "Ouvrir l'outil",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    switchLang: "Changer de langue",
    toLight: "Activer le mode clair",
    toDark: "Activer le mode sombre",
  },
  hero: {
    title: "Détourage précis et instantané.",
    subtitle:
      "Supprimez l'arrière-plan de vos images en quelques secondes. Pas de compte, pas de limite, pas de stockage : vous récupérez un PNG ou un WebP transparent, prêt à l'usage.",
    ctaRemove: "Détourer une image",
    ctaOptimize: "Optimiser une image",
    alt: "femme avec un chat, silhouette détourée",
    privacyNote:
      "Tout se passe dans votre navigateur : aucune image n'est envoyée sur un serveur",
  },
  whyus: {
    title: "Pourquoi Silhouet ?",
    fastTitle: "Rapide",
    fastText: "Détourage automatique en quelques secondes",
    preciseTitle: "Précis",
    preciseText: "Bords nets, détails respectés",
    privacyTitle: "Respect de la vie privée",
    privacyText: "Images traitées puis supprimées",
    formats: "Formats supportés : PNG, JPG, WEBP, jusqu'à 25 Mo",
    neverStored: "Vos images ne sont jamais conservées.",
  },
  dropzone: {
    aria: "Déposez une image ou cliquez pour sélectionner un fichier",
    dropHint: "Glissez votre image ici",
    formats: "PNG, JPG, WebP, jusqu'à 25 Mo",
    privacyNote:
      "Tout se passe dans votre navigateur : aucune image n'est envoyée sur un serveur",
  },
  removeBg: {
    title: "Déposez votre image, nous supprimons l'arrière-plan automatiquement.",
    subtitle: "PNG, JPG ou WebP, jusqu'à 25 Mo, traitement instantané",
    loader: "Modèle local : traitement en cours",
    modalTitle: "Aperçu du détourage",
    before: "Avant",
    after: "Après",
    zoomAria: "Agrandir le résultat",
    download: "Télécharger",
    retry: "Réessayer",
    altSource: "source",
    altResult: "résultat détouré",
    altPreview: "Prévisualisation résultat",
  },
  convert: {
    title: "Convertir en WebP",
    subtitle:
      "Convertissez vos images PNG, JPG, GIF en WebP en un clic, sans perte visible de qualité.",
    loader: "Conversion locale en cours",
    source: "Source",
    result: "Résultat (WebP)",
    download: "Télécharger le WebP",
    retry: "Réessayer",
    altSource: "source",
    altResult: "résultat WebP",
  },
  contact: {
    title: "Nous contacter",
    line1: "Une question, un retour ou une idée d'amélioration ?",
    line2: "Écrivez-nous directement par email, nous lisons tous les messages.",
    cta: "Envoyer un email",
    note: "Aucun formulaire, aucun stockage : vos messages restent entre vous et votre client mail.",
  },
  about: {
    title: "Un outil simple pour des images propres",
    intro:
      "Silhouet est un outil en ligne qui fait une seule chose : supprimer l'arrière-plan de vos images, vite et sans compromettre la qualité.",
    tagline: "Pas d'inscription, pas de stockage",
    problemTitle: "Le problème",
    problem1: "Des inscriptions inutiles",
    problem2: "Des quotas peu clairs",
    problem3: "Un stockage forcé des images",
    problem4: "Des interfaces surchargées",
    philosophyTitle: "La philosophie",
    philosophy1: "Un outil direct et transparent, qui respecte l'utilisateur.",
    philosophy2:
      "Vous déposez une image, l'arrière-plan est supprimé, vous récupérez un fichier prêt à l'usage. Aucune étape intermédiaire, aucune action superflue.",
    privacyTitle: "Le respect de vos images avant tout",
    privacyText:
      "Silhouet ne conserve aucune image. Les fichiers sont traités uniquement le temps nécessaire, puis supprimés automatiquement.",
    forTitle: "Conçu pour",
    for1: "Les créateurs de contenu",
    for2: "Les indépendants",
    for3: "Les développeurs",
    for4: "Les équipes produit",
    for5: "Toute personne ayant besoin d'images propres rapidement",
    notForTitle: "Pas pensé pour",
    notFor1: "La retouche photo avancée",
    notFor2: "Les workflows complexes",
    notFor3: "Les outils tout-en-un surchargés",
    conclusion1: "Silhouet fait volontairement peu de choses, mais il les fait bien.",
    conclusion2: "Un outil simple et fiable, conçu pour ne pas vous ralentir.",
    alt: "photo artistique",
  },
  footer: {
    rights: "Tous droits réservés.",
    photo: "Photo :",
  },
  modal: {
    close: "Fermer",
  },
  errors: {
    notImage: "Le fichier sélectionné n'est pas une image.",
    tooLarge: "L'image dépasse la limite de 25 Mo.",
    removal: "Une erreur est survenue pendant le détourage.",
    engineUnavailable: "Le moteur de détourage n'est pas disponible.",
    conversion: "La conversion a échoué. Ce format est peut-être non supporté.",
  },
};

export type Dict = typeof fr;

const en: Dict = {
  nav: {
    remove: "Remove",
    convert: "Convert",
    about: "About",
    home: "Home",
    openTool: "Open the tool",
    openMenu: "Open the menu",
    closeMenu: "Close the menu",
    switchLang: "Switch language",
    toLight: "Switch to light mode",
    toDark: "Switch to dark mode",
  },
  hero: {
    title: "Precise, instant background removal.",
    subtitle:
      "Remove the background from your images in seconds. No account, no limits, no storage: you get a transparent PNG or WebP, ready to use.",
    ctaRemove: "Remove a background",
    ctaOptimize: "Optimize an image",
    alt: "woman with a cat, cut-out silhouette",
    privacyNote:
      "Everything runs in your browser: no image is ever sent to a server",
  },
  whyus: {
    title: "Why Silhouet?",
    fastTitle: "Fast",
    fastText: "Automatic background removal in seconds",
    preciseTitle: "Precise",
    preciseText: "Clean edges, details preserved",
    privacyTitle: "Privacy friendly",
    privacyText: "Images processed, then deleted",
    formats: "Supported formats: PNG, JPG, WEBP, up to 25 MB",
    neverStored: "Your images are never stored.",
  },
  dropzone: {
    aria: "Drop an image or click to select a file",
    dropHint: "Drag your image here",
    formats: "PNG, JPG, WebP, up to 25 MB",
    privacyNote:
      "Everything runs in your browser: no image is ever sent to a server",
  },
  removeBg: {
    title: "Drop your image and the background is removed automatically.",
    subtitle: "PNG, JPG or WebP, up to 25 MB, instant processing",
    loader: "Local model: processing",
    modalTitle: "Background removal preview",
    before: "Before",
    after: "After",
    zoomAria: "Zoom in on the result",
    download: "Download",
    retry: "Try again",
    altSource: "source",
    altResult: "cut-out result",
    altPreview: "Result preview",
  },
  convert: {
    title: "Convert to WebP",
    subtitle:
      "Convert your PNG, JPG and GIF images to WebP in one click, with no visible quality loss.",
    loader: "Converting locally",
    source: "Source",
    result: "Result (WebP)",
    download: "Download WebP",
    retry: "Try again",
    altSource: "source",
    altResult: "WebP result",
  },
  contact: {
    title: "Contact us",
    line1: "A question, feedback, or an idea to share?",
    line2: "Email us directly; we read every message.",
    cta: "Send an email",
    note: "No forms, no storage: your messages stay between you and your mail client.",
  },
  about: {
    title: "A simple tool for clean images",
    intro:
      "Silhouet is an online tool that does one thing: removing the background from your images, fast and without cutting corners on quality.",
    tagline: "No sign-up, no storage",
    problemTitle: "The problem",
    problem1: "Pointless sign-ups",
    problem2: "Unclear quotas",
    problem3: "Forced image storage",
    problem4: "Cluttered interfaces",
    philosophyTitle: "The philosophy",
    philosophy1: "A direct, transparent tool that respects the user.",
    philosophy2:
      "You drop an image, the background is removed, and you get a file ready to use. No middle steps, no extra actions.",
    privacyTitle: "Your images, kept private",
    privacyText:
      "Silhouet keeps none of your images. Files are processed only as long as needed, then automatically deleted.",
    forTitle: "Built for",
    for1: "Content creators",
    for2: "Freelancers",
    for3: "Developers",
    for4: "Product teams",
    for5: "Anyone who needs clean images fast",
    notForTitle: "Not meant for",
    notFor1: "Advanced photo editing",
    notFor2: "Complex workflows",
    notFor3: "Bloated all-in-one tools",
    conclusion1:
      "Silhouet deliberately does few things, and does them well.",
    conclusion2: "A simple, reliable tool designed not to slow you down.",
    alt: "artistic photo",
  },
  footer: {
    rights: "All rights reserved.",
    photo: "Photo:",
  },
  modal: {
    close: "Close",
  },
  errors: {
    notImage: "The selected file is not an image.",
    tooLarge: "The image exceeds the 25 MB limit.",
    removal: "Something went wrong during background removal.",
    engineUnavailable: "The background removal engine is unavailable.",
    conversion: "The conversion failed. This format may not be supported.",
  },
};

const dicts: Record<Lang, Dict> = { fr, en };

type I18n = {
  lang: Lang;
  t: Dict;
  setLang: (lang: Lang) => void;
};

const I18nContext = createContext<I18n>({
  lang: "fr",
  t: fr,
  setLang: () => {},
});

function writeCookie(name: string, value: string) {
  document.cookie = `${name}=${value};path=/;max-age=31536000;samesite=lax`;
}

export function I18nProvider({
  initial,
  children,
}: {
  initial: Lang;
  children: ReactNode;
}) {
  const [lang, setLangState] = useState<Lang>(initial);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    writeCookie("lang", next);
    document.documentElement.lang = next;
  }, []);

  const value = useMemo(
    () => ({ lang, t: dicts[lang], setLang }),
    [lang, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
