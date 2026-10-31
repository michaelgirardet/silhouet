"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-white/6 px-6">
      <div className="text-micro mx-auto flex max-w-page flex-col items-center justify-between gap-4 py-6 text-stone sm:flex-row">
        <p>
          © {new Date().getFullYear()} · Silhouet · {t.footer.rights}
        </p>
        <p>
          {t.footer.photo}{" "}
          <a
            href="https://unsplash.com/fr/@rosarafael?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
            target="_blank"
            className="hover:text-ivory underline decoration-white/6 underline-offset-2 transition-colors duration-150"
            rel="noreferrer"
          >
            Rosa Rafael
          </a>
        </p>
        <ul className="flex items-center gap-6">
          <li>
            <Link
              href="/contact"
              className="hover:text-ivory inline-block py-2 transition-colors duration-150"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/a-propos"
              className="hover:text-ivory inline-block py-2 transition-colors duration-150"
            >
              {t.nav.about}
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
