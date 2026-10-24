/**
 * Builds a Netlify Image CDN URL so pages never ship full-resolution originals.
 * Pass both width and height to crop to a fixed aspect ratio.
 */
export function cdn(src: string, width: number, height?: number, quality = 75) {
  const params = new URLSearchParams({ url: src, w: String(width), fm: 'webp', q: String(quality) })
  if (height) {
    params.set('h', String(height))
    params.set('fit', 'cover')
  }
  return `/.netlify/images?${params.toString()}`
}

/** Responsive srcset for a 4:5 product image. */
export function productSrcSet(src: string, widths = [360, 540, 720, 960]) {
  return widths.map((w) => `${cdn(src, w, Math.round(w * 1.25))} ${w}w`).join(', ')
}
