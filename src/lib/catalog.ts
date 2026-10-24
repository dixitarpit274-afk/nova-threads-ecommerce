/**
 * Catalogue access layer. Every page reads products through these functions,
 * so replacing the demo array with a database or headless CMS only requires
 * changing this file (see PLAN.md, milestone 2).
 */
import products, { type Category, type Gender, type Product } from '@/data/products'

export type { Product, Category, Gender }

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest'
export type Collection = 'new' | 'best' | 'sale'

export interface ProductQuery {
  category?: Category
  gender?: Gender
  collection?: Collection
  q?: string
  sort?: SortOption
}

export const getAllProducts = () => products

export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug)

export const getProductById = (id: string) => products.find((p) => p.id === id)

export const isOnSale = (p: Product) => !!p.compareAtPrice && p.compareAtPrice > p.price

export function queryProducts({ category, gender, collection, q, sort = 'featured' }: ProductQuery) {
  const term = q?.trim().toLowerCase()
  const list = products.filter((p) => {
    if (category && p.category !== category) return false
    // Unisex pieces appear in both the Men and Women edits.
    if (gender && p.gender !== gender && p.gender !== 'unisex') return false
    if (collection === 'new' && !p.tags.includes('new')) return false
    if (collection === 'best' && !p.tags.includes('bestseller')) return false
    if (collection === 'sale' && !isOnSale(p)) return false
    if (term) {
      const haystack = [p.name, p.category, p.gender, p.shortDescription, ...p.colors.map((c) => c.name)]
        .join(' ')
        .toLowerCase()
      if (!term.split(/\s+/).every((word) => haystack.includes(word))) return false
    }
    return true
  })

  switch (sort) {
    case 'price-asc':
      return [...list].sort((a, b) => a.price - b.price)
    case 'price-desc':
      return [...list].sort((a, b) => b.price - a.price)
    case 'newest':
      return [...list].sort((a, b) => Number(b.tags.includes('new')) - Number(a.tags.includes('new')))
    default:
      return list
  }
}

export function getRelatedProducts(product: Product, limit = 4) {
  const same = products.filter((p) => p.id !== product.id && p.category === product.category)
  const rest = products.filter((p) => p.id !== product.id && p.category !== product.category && (p.gender === product.gender || p.gender === 'unisex'))
  return [...same, ...rest].slice(0, limit)
}
