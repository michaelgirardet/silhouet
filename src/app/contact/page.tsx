"use client";

import { EnvelopeIcon } from "@phosphor-icons/react";

export default function Contact() {
  return (
    <div className="flex flex-col items-center px-6 py-20">
      <div className="max-w-3xl space-y-6 text-center">
        <h2 className="text-3xl font-medium">Nous contacter</h2>
        <p className="text-base text-gray-600 dark:text-gray-300">
          Une question, un retour ou une idée d&apos;amélioration ?
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Écrivez-nous directement par email, nous lisons tous les messages.
        </p>
        <a
          href="mailto:michaelgirardet@outlook.com?subject=Silhouet%20-%20Contact"
          className="bg-accent hover:bg-accent/80 mt-8 inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 font-semibold text-white transition duration-150 ease-in-out"
        >
          <EnvelopeIcon size={24} />
          Envoyer un email
        </a>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Aucun formulaire, aucun stockage : vos messages restent entre vous et
          votre client mail.
        </p>
      </div>
    </div>
  );
}
