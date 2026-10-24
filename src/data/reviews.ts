/**
 * DEMO REVIEWS — illustrative placeholders only, not written by real
 * customers. They are labelled as samples in the UI. Replace with verified
 * reviews once orders are being fulfilled (see PLAN.md).
 */
export interface Review {
  id: string
  author: string
  city: string
  rating: number
  title: string
  body: string
  productSlug: string
  isDemo: boolean
}

export const reviews: Review[] = [
  {
    id: 'r1',
    author: 'Sample reviewer A.',
    city: 'Pune',
    rating: 5,
    title: 'The weight is unreal',
    body: 'Example review: the heavyweight tee feels far more expensive than it is and the collar hasn’t lost shape after multiple washes.',
    productSlug: 'essential-heavyweight-tee',
    isDemo: true,
  },
  {
    id: 'r2',
    author: 'Sample reviewer B.',
    city: 'Bengaluru',
    rating: 5,
    title: 'Perfect oversized fit',
    body: 'Example review: sized down as suggested and the oxford shirt drapes exactly like the photos. Works open over a tee too.',
    productSlug: 'oversized-oxford-shirt',
    isDemo: true,
  },
  {
    id: 'r3',
    author: 'Sample reviewer C.',
    city: 'Delhi',
    rating: 4,
    title: 'Cosy and structured',
    body: 'Example review: the hood actually stands up and the fleece is thick. Slightly warm for Delhi in March, perfect for winter.',
    productSlug: 'core-fleece-hoodie',
    isDemo: true,
  },
  {
    id: 'r4',
    author: 'Sample reviewer D.',
    city: 'Mumbai',
    rating: 5,
    title: 'My new everyday trousers',
    body: 'Example review: pleats sit clean, the wide leg moves beautifully and they barely crease on the commute.',
    productSlug: 'pleated-wide-leg-trouser',
    isDemo: true,
  },
]
