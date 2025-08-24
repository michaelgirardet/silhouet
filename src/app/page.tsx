export default function Home() {
  return (
    <section className="grid gap-6">
      <div className="rounded-lg p-8 border border-border shadow-soft bg-[hsl(var(--muted))]">
        <h1 className="text-3xl font-bold mb-2">Silhouet</h1>
        <p className="text-base opacity-80">
          Outil d’images minimal et élégant : détourage (background remover) et conversions (resize/format/qualité).
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <a href="/remove-bg" className="rounded-lg border border-border p-6 hover:shadow-float transition">
          <h2 className="font-semibold mb-1">Remove BG</h2>
          <p className="text-sm opacity-70">Obtenez un PNG transparent en un clic.</p>
        </a>
        <a href="/toolkit" className="rounded-lg border border-border p-6 hover:shadow-float transition">
          <h2 className="font-semibold mb-1">Toolkit</h2>
          <p className="text-sm opacity-70">Redimensionner, convertir, compresser…</p>
        </a>
      </div>

      <div className="rounded-lg border border-border p-6">
        <h3 className="font-semibold mb-2">Design System</h3>
        <ul className="text-sm list-disc pl-5 space-y-1 opacity-80">
          <li>Variables HSL (bg/fg/muted/border/accent/radius/ombres)</li>
          <li>Mode sombre via <code>next-themes</code></li>
          <li>Layout Tailwind, styles spécifiques en CSS Modules (plus tard)</li>
        </ul>
      </div>
    </section>
  );
}
