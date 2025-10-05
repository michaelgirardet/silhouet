export default function Footer() {
	return (
		<footer className="mx-auto flex max-w-6xl items-center justify-center px-4 py-8 text-sm text-neutral-500">
			© {new Date().getFullYear()} · Silhouet · Tout droits réservés.
		</footer>
	);
}
