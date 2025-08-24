export default function Home() {
  return (
    <section className="grid gap-6">
      {/* Hero */}
      <div className="rounded-lg p-8 border border-border shadow-soft bg-muted">
        <h1 className="text-3xl font-bold mb-2">Silhouet</h1>
        <p className="text-base opacity-80">
          Outil d’images minimal et élégant : détourage (background remover) et conversions
          (resize/format/qualité).
        </p>
      </div>

      {/* Links */}
      <div className="grid sm:grid-cols-2 gap-4">
        <a
          href="/remove-bg"
          className="rounded-lg border border-border p-6 hover:shadow-float transition-colors hover:border-accent-400"
        >
          <h2 className="font-semibold mb-1">Remove BG</h2>
          <p className="text-sm opacity-70">Obtenez un PNG transparent en un clic.</p>
        </a>
        <a
          href="/toolkit"
          className="rounded-lg border border-border p-6 hover:shadow-float transition-colors hover:border-accent-400"
        >
          <h2 className="font-semibold mb-1">Toolkit</h2>
          <p className="text-sm opacity-70">Redimensionner, convertir, compresser…</p>
        </a>
      </div>

      {/* Design system */}
      <div className="rounded-lg border border-border p-6">
        <h3 className="font-semibold mb-2">Design System</h3>
        <ul className="text-sm list-disc pl-5 space-y-1 opacity-80">
          <li>Couleurs via variables CSS (bg/fg/muted/border/accent)</li>
          <li>Mode sombre via <code>next-themes</code></li>
          <li>Layout Tailwind + styles spécifiques (CSS Modules pour custom UI)</li>
        </ul>
      </div>
    </section>
  );
}
