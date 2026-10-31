import { NextRequest, NextResponse } from "next/server";

// CSP avec nonce par requête : Next.js lit l'en-tête Content-Security-Policy
// de la requête et applique automatiquement le nonce à ses scripts (y compris
// les scripts inline du payload d'hydratation), ce qu'une CSP statique dans
// next.config.ts ne permet pas.
export function middleware(request: NextRequest) {
	const nonce = crypto.randomUUID().replace(/-/g, "");

	const isDev = process.env.NODE_ENV === "development";

	// blob: et 'wasm-unsafe-eval' sont nécessaires au moteur de détourage :
	// @imgly/background-removal reconstruit le module .mjs et le binaire
	// .wasm d'onnxruntime-web depuis /models/ en URLs blob:, puis onnxruntime
	// les importe et compile le WASM en mode multi-thread (workers blob:).
	// Aucun de ces schémas ne permet une requête vers un domaine tiers :
	// connect-src 'self' blob: reste confiné à l'origine et au contenu local.
	const csp = [
		"default-src 'self'",
		`script-src 'self' 'nonce-${nonce}' 'wasm-unsafe-eval' blob:${isDev ? " 'unsafe-eval'" : ""}`,
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
