import { storeConfig } from '@/config/store'

interface SeoInput {
  title?: string
  description?: string
  image?: string
  path?: string
}

/** Builds route `head` metadata (title, description, Open Graph, Twitter). */
export function seo({ title, description = storeConfig.description, image = '/img/hero.jpg', path = '/' }: SeoInput = {}) {
  const fullTitle = title ? `${title} | ${storeConfig.brand}` : `${storeConfig.brand} — ${storeConfig.tagline}`
  const url = new URL(path, storeConfig.siteUrl).toString()
  const imageUrl = new URL(`/.netlify/images?url=${encodeURIComponent(image)}&w=1200&h=630&fit=cover&fm=jpg`, storeConfig.siteUrl).toString()
  return {
    meta: [
      { title: fullTitle },
      { name: 'description', content: description },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: imageUrl },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: imageUrl },
    ],
    links: [{ rel: 'canonical', href: url }],
  }
}
