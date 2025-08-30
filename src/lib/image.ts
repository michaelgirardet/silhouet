export async function downscaleImage(file: File, maxSide = 2000): Promise<Blob> {
  const imgBitmap = await createImageBitmap(file);
  const { width, height } = imgBitmap;
  const scale = Math.min(1, maxSide / Math.max(width, height));
  if (scale === 1) return file;

  const targetW = Math.round(width * scale);
  const targetH = Math.round(height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext("2d", { alpha: true })!;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(imgBitmap, 0, 0, targetW, targetH);
  const blob = await new Promise<Blob>((res) => canvas.toBlob((b) => res(b!), "image/png", 1));
  return blob;
}

export function fileFromBlob(blob: Blob, name = "image.png"): File {
  return new File([blob], name, { type: blob.type || "image/png" });
}
