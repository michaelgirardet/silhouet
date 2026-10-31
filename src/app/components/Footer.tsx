"use client";

import { EnvelopeIcon, QuestionIcon } from "@phosphor-icons/react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-grey dark:text-[#98a1a9] flex h-16 items-center justify-evenly gap-24 py-2 text-sm">
      <div className="flex">
        <p>Crédit Photo: </p>
        <a
          href="https://unsplash.com/fr/@rosarafael?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          target="_blank"
        >
          Rosa Rafael
        </a>
      </div>
      <p>© {new Date().getFullYear()} · Silhouet · Tout droits réservés.</p>
      <ul className="flex gap-8">
        <Link href={"/contact"}>
          <li className="flex items-center justify-center gap-1">
            <EnvelopeIcon size={32} />
            Contact
          </li>
        </Link>

        <Link href={"/a-propos"}>
          <li className="flex items-center justify-center gap-1">
            <QuestionIcon size={32} />À Propos
          </li>
        </Link>
      </ul>
    </footer>
  );
}
