'use client';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { MoonIcon, SunDimIcon } from '@phosphor-icons/react';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Pour empêcher toute lecture du thème pendant le rendu SSR
  useEffect(() => setMounted(true), []);

  const icon = !mounted ? '◑' : resolvedTheme === 'dark' ? <SunDimIcon size={24} /> : <MoonIcon size={24}  />;

  return (
    <button
      type="button"
      className="rounded-md border border-border px-3 py-1.5 shadow-soft hover:shadow-float transition cursor-pointer"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      aria-label="Basculer le thème clair/sombre"
      title="Basculer le thème"
    >
      {icon}
    </button>
  );
}
