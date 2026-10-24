import type { Collection, Gender } from '@/lib/catalog'

export interface NavItem {
  label: string
  search: { gender?: Gender; collection?: Collection }
}

export const mainNav: NavItem[] = [
  { label: 'Men', search: { gender: 'men' } },
  { label: 'Women', search: { gender: 'women' } },
  { label: 'New Arrivals', search: { collection: 'new' } },
  { label: 'Best Sellers', search: { collection: 'best' } },
  { label: 'Sale', search: { collection: 'sale' } },
]
