"use client";

import { EnvelopeIcon } from "@phosphor-icons/react";

export default function Contact() {
  return (
    <div className="flex flex-col items-center px-6 py-20 md:py-32">
      <div className="max-w-3xl space-y-6 text-center">
        <h2 className="text-ivory font-display text-heading-lg font-medium">
          Nous contacter
        </h2>
        <p className="text-body text-slate">
          Une question, un retour ou une idée d&apos;amélioration ?
        </p>
        <p className="text-body-sm text-stone">
          Écrivez-nous directement par email, nous lisons tous les messages.
        </p>
        <a
          href="mailto:michaelgirardet@outlook.com?subject=Silhouet%20-%20Contact"
          className="bg-chalk text-canvas hover:bg-ivory mt-8 inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-body-sm transition-colors duration-150"
        >
          <EnvelopeIcon size={20} weight="light" />
          Envoyer un email
        </a>
        <p className="text-body-sm text-stone">
          Aucun formulaire, aucun stockage : vos messages restent entre vous et
          votre client mail.
        </p>
      </div>
    </div>
  );
}
