import { NextRequest, NextResponse } from "next/server";

// CSP avec nonce par requête : Next.js lit l'en-tête Content-Security-Policy
// de la requête et applique automatiquement le nonce à ses scripts (y compris
// les scripts inline du payload d'hydratation), ce qu'une CSP statique dans
// next.config.ts ne permet pas.
export function middleware(request: NextRequest) {
	const nonce = crypto.randomUUID().replace(/-/g, "");

	const isDev = process.env.NODE_ENV === "development";

	// CSP fonctionnelle pour le moteur de détourage :
	// - blob: : la lib reconstruit .mjs et .wasm d'onnxruntime-web depuis
	//   /models/ en URLs blob: (imports, workers et fetch blob).
	// - 'wasm-unsafe-eval' : compilation WebAssembly du binaire reconstruit.
	// - 'unsafe-eval' : la dépendance ndarray du moteur génère du code JS par
	//   string (Function(...)) à l'initialisation. Sans elle, EvalError.
	// Aucun de ces assouplissements n'ouvre le réseau : connect-src/img-src/
	// default-src restent confinés à l'origine et au contenu local blob:, et
	// les scripts ne peuvent pas joindre de domaine tiers.
	const csp = [
		"default-src 'self'",
		`script-src 'self' 'nonce-${nonce}' 'unsafe-eval' 'wasm-unsafe-eval' blob:${isDev ? " 'unsafe-eval'" : ""}`,
		"style-src 'self' 'unsafe-inline'",
		"img-src 'self' blob: data:",
		"connect-src 'self' blob:",
		"font-src 'self'",
		"object-src 'none'",
		"base-uri 'self'",
		"worker-src 'self' blob:",
		"frame-ancestors 'none'",
	].join("; ");

	const requestHeaders = new Headers(request.headers);
	requestHeaders.set("x-nonce", nonce);
	requestHeaders.set("Content-Security-Policy", csp);

	const response = NextResponse.next({
		request: { headers: requestHeaders },
	});
	response.headers.set("Content-Security-Policy", csp);
	return response;
}

export const config = {
	matcher: [{ source: "/(.*)" }],
};
