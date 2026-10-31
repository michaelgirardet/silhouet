export const MAX_FILE_BYTES = 25 * 1024 * 1024;

export const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];

export function validateImageFile(file: File): string | null {
	if (!file.type.startsWith("image/")) {
		return "Le fichier sélectionné n'est pas une image.";
	}
	if (file.size > MAX_FILE_BYTES) {
		return "L'image dépasse la limite de 25 Mo.";
	}
	return null;
}

export async function downscaleImage(
	file: File,
	maxSide = 2000,
): Promise<Blob> {
	const imgBitmap = await createImageBitmap(file);
	const { width, height } = imgBitmap;
	const scale = Math.min(1, maxSide / Math.max(width, height));
	if (scale === 1) return file;

	const targetW = Math.round(width * scale);
	const targetH = Math.round(height * scale);

	const canvas = document.createElement("canvas");
	canvas.width = targetW;
	canvas.height = targetH;
	const ctx = canvas.getContext("2d", { alpha: true });
	if (!ctx) {
		throw new Error("Contexte 2D non disponible.");
	}
	ctx.imageSmoothingEnabled = true;
	ctx.imageSmoothingQuality = "high";
	ctx.drawImage(imgBitmap, 0, 0, targetW, targetH);

	const blob = await new Promise<Blob>((res, rej) =>
		canvas.toBlob(
			(b) => (b ? res(b) : rej(new Error("Échec de canvas.toBlob"))),
			"image/png",
			1,
		),
	);
	return blob;
}

export function fileFromBlob(blob: Blob, name = "image.png"): File {
	return new File([blob], name, { type: blob.type || "image/png" });
}
