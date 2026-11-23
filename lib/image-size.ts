import fs from "node:fs";

/**
 * Reads the pixel size of a JPEG, PNG or WebP file from its header (no dependency).
 * Returns undefined if the format is not recognised.
 */
export function imageSize(file: string): { width: number; height: number } | undefined {
  let buf: Buffer;
  try {
    buf = fs.readFileSync(file);
  } catch {
    return undefined;
  }
  // PNG
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  // WebP
  if (buf.length > 30 && buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const chunk = buf.toString("ascii", 12, 16);
    if (chunk === "VP8X") return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
    if (chunk === "VP8 ") return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    if (chunk === "VP8L") {
      const b = buf.readUInt32LE(21);
      return { width: (b & 0x3fff) + 1, height: ((b >> 14) & 0x3fff) + 1 };
    }
  }
  // JPEG: walk segments to a start-of-frame marker, noting the EXIF orientation on the way
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    let orientation = 1;
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) return undefined;
      const marker = buf[i + 1];
      const len = buf.readUInt16BE(i + 2);
      if (marker === 0xe1 && buf.toString("ascii", i + 4, i + 8) === "Exif") orientation = exifOrientation(buf, i + 10) ?? 1;
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        const h = buf.readUInt16BE(i + 5);
        const w = buf.readUInt16BE(i + 7);
        // Orientations 5–8 mean the camera stored the photo rotated 90°: swap to the displayed size.
        return orientation >= 5 ? { width: h, height: w } : { width: w, height: h };
      }
      i += 2 + len;
    }
  }
  return undefined;
}

/** Reads the EXIF orientation tag (0x0112) from a TIFF block starting at `start`. */
function exifOrientation(buf: Buffer, start: number): number | undefined {
  try {
    const little = buf.toString("ascii", start, start + 2) === "II";
    const u16 = (o: number) => (little ? buf.readUInt16LE(o) : buf.readUInt16BE(o));
    const u32 = (o: number) => (little ? buf.readUInt32LE(o) : buf.readUInt32BE(o));
    const ifd = start + u32(start + 4);
    const count = u16(ifd);
    for (let n = 0; n < count; n++) {
      const entry = ifd + 2 + n * 12;
      if (u16(entry) === 0x0112) return u16(entry + 8);
    }
  } catch {
    /* malformed EXIF: ignore */
  }
  return undefined;
}
