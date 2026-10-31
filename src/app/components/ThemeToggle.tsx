"use client";

import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer rounded-full p-2 transition duration-300 ease-in-out"
      aria-label={
        mounted
          ? isDark
            ? "Activer le thème clair"
            : "Activer le thème sombre"
          : "Changer de thème"
      }
    >
      {mounted && isDark ? <SunIcon size={28} /> : <MoonIcon size={28} />}
    </button>
  );
}
