import type { Category } from './products'

export interface CategoryInfo {
  slug: Category
  label: string
  blurb: string
  image: string
}

export const categories: CategoryInfo[] = [
  { slug: 't-shirts', label: 'T-Shirts', blurb: 'Heavyweight essentials', image: '/img/tee-essential-1.jpg' },
  { slug: 'shirts', label: 'Shirts', blurb: 'Oxford, linen & poplin', image: '/img/shirt-oxford-1.jpg' },
  { slug: 'hoodies', label: 'Hoodies', blurb: '400 GSM fleece', image: '/img/hoodie-core-1.jpg' },
  { slug: 'trousers', label: 'Trousers', blurb: 'Pleats & cargos', image: '/img/trouser-pleat-1.jpg' },
  { slug: 'accessories', label: 'Accessories', blurb: 'Totes & knitwear', image: '/img/tote-1.jpg' },
]

export const categoryLabel = (slug: Category) =>
  categories.find((c) => c.slug === slug)?.label ?? slug
