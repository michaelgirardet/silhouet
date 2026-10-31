"use client";

import Image from "next/image";
import { useI18n } from "@/lib/i18n";

export default function About() {
  const { t } = useI18n();

  return (
    <div className="mx-auto flex max-w-page flex-col items-center px-6 py-16 md:py-24">
      {/* Hero */}
      <div className="max-w-3xl space-y-6 text-center">
        <h1 className="text-ivory font-display text-heading font-medium sm:text-heading-lg">
          {t.about.title}
        </h1>

        <p className="text-body text-slate">{t.about.intro}</p>

        <p className="text-body-sm text-stone">{t.about.tagline}</p>
      </div>

      {/* Problem / Philosophy */}
      <div className="mt-20 grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-ivory font-display text-subheading font-medium">
            {t.about.problemTitle}
          </h2>
          <ul className="text-body-sm list-inside list-disc space-y-2 text-slate">
            <li>{t.about.problem1}</li>
            <li>{t.about.problem2}</li>
            <li>{t.about.problem3}</li>
            <li>{t.about.problem4}</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-ivory font-display text-subheading font-medium">
            {t.about.philosophyTitle}
          </h2>
          <p className="text-body-sm text-slate">{t.about.philosophy1}</p>
          <p className="text-body-sm text-slate">{t.about.philosophy2}</p>
        </div>

        <Image
          src="/images/about.jpg"
          alt={t.about.alt}
          width={720}
          height={360}
          className="rounded-images col-span-2 h-auto w-full border border-white/6"
        />
      </div>

      {/* Privacy */}
      <div className="bg-soot rounded-cards mt-20 max-w-3xl space-y-4 border border-white/6 p-8 text-center md:p-10">
        <h2 className="text-ivory font-display text-subheading font-medium">
          {t.about.privacyTitle}
        </h2>
        <p className="text-body-sm text-slate">{t.about.privacyText}</p>
      </div>

      {/* For / Not for */}
      <div className="mt-20 grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-ivory font-display text-subheading font-medium">
            {t.about.forTitle}
          </h2>
          <ul className="text-body-sm list-inside list-disc space-y-2 text-slate">
            <li>{t.about.for1}</li>
            <li>{t.about.for2}</li>
            <li>{t.about.for3}</li>
            <li>{t.about.for4}</li>
            <li>{t.about.for5}</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-ivory font-display text-subheading font-medium">
            {t.about.notForTitle}
          </h2>
          <ul className="text-body-sm list-inside list-disc space-y-2 text-slate">
            <li>{t.about.notFor1}</li>
            <li>{t.about.notFor2}</li>
            <li>{t.about.notFor3}</li>
          </ul>
        </div>
      </div>

      {/* Conclusion */}
      <div className="mt-24 max-w-3xl space-y-4 text-center">
        <p className="text-body text-ivory">{t.about.conclusion1}</p>
        <p className="text-body-sm text-stone">{t.about.conclusion2}</p>
      </div>
    </div>
  );
}
