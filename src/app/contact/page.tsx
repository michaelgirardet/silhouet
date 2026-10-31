"use client";

import { EnvelopeIcon } from "@phosphor-icons/react";
import { useI18n } from "@/lib/i18n";

export default function Contact() {
  const { t } = useI18n();

  return (
    <div className="flex flex-col items-center px-6 py-20 md:py-32">
      <div className="max-w-3xl space-y-6 text-center">
        <h1 className="text-ivory font-display text-heading font-medium sm:text-heading-lg">
          {t.contact.title}
        </h1>
        <p className="text-body text-slate">{t.contact.line1}</p>
        <p className="text-body-sm text-stone">{t.contact.line2}</p>
        <a
          href="mailto:michaelgirardet@outlook.com?subject=Silhouet%20-%20Contact"
          className="bg-chalk text-canvas hover:bg-ivory mt-8 inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-body-sm transition-colors duration-150"
        >
          <EnvelopeIcon size={20} weight="light" />
          {t.contact.cta}
        </a>
        <p className="text-body-sm text-stone">{t.contact.note}</p>
      </div>
    </div>
  );
}
