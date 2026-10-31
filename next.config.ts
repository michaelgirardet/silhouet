import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	async headers() {
		return [
			{
				source: "/:path*",
				headers: [
					{
						key: "Referrer-Policy",
						value: "no-referrer",
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "Permissions-Policy",
						value: "camera=(), microphone=(), geolocation=()",
					},
				],
			},
			{
				// Assets du moteur de détourage, versionnés par chemin :
				// tout le contenu de /models/<version>/ change d'URL à
				// chaque upgrade du paquet de données, y compris
				// resources.json. Tout peut donc être immutable un an —
				// c'est ce qui rend le détourage possible hors-ligne après
				// un premier chargement (sinon max-age=0 force une
				// revalidation réseau impossible en mode avion).
				source: "/models/:version/:path*",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
		];
	},
};

export default nextConfig;
