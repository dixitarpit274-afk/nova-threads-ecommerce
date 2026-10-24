/**
 * DEMO CATALOGUE
 * ---------------------------------------------------------------------------
 * Every product below is sample data used to showcase the storefront. Names,
 * prices, sizes, stock and images are placeholders — replace them with real
 * inventory before launch. Images live in /public/img and are served through
 * the Netlify Image CDN (see src/lib/image.ts).
 *
 * The rest of the app only reads products through src/lib/catalog.ts, so this
 * file can later be swapped for a database without touching any UI.
 */

export type Category = 't-shirts' | 'shirts' | 'hoodies' | 'trousers' | 'accessories'
export type Gender = 'men' | 'women' | 'unisex'
export type Tag = 'new' | 'bestseller'
export type SizeChart = 'mens-tops' | 'womens-tops' | 'mens-bottoms' | 'womens-bottoms'

export interface ProductColor {
  name: string
  hex: string
}

export interface Product {
  id: string
  slug: string
  name: string
  category: Category
  gender: Gender
  /** Selling price in INR (whole rupees). */
  price: number
  /** Original price in INR, shown struck-through when the item is discounted. */
  compareAtPrice?: number
  colors: ProductColor[]
  sizes: string[]
  /** When false (e.g. one-size accessories), no size has to be chosen. */
  sizeDependent: boolean
  sizeChart?: SizeChart
  images: string[]
  shortDescription: string
  description: string
  details: string[]
  fabric: string
  fit: string
  care: string
  tags: Tag[]
  /** Demo stock level per product — replace with real inventory tracking. */
  stock: number
  isDemo: boolean
}

const BLACK = { name: 'Jet Black', hex: '#111111' }
const BONE = { name: 'Bone', hex: '#ece6da' }
const ECRU = { name: 'Ecru', hex: '#e3d9c4' }
const CHARCOAL = { name: 'Charcoal', hex: '#3a3a38' }
const SAND = { name: 'Sand', hex: '#cbb99a' }
const STONE = { name: 'Stone', hex: '#b5a993' }

const TOPS_M = ['S', 'M', 'L', 'XL', 'XXL']
const TOPS_W = ['XS', 'S', 'M', 'L', 'XL']
const WAIST_M = ['28', '30', '32', '34', '36']
const WAIST_W = ['24', '26', '28', '30', '32']

const products: Product[] = [
  {
    id: 'nt-001',
    slug: 'essential-heavyweight-tee',
    name: 'Essential Heavyweight Tee',
    category: 't-shirts',
    gender: 'men',
    price: 1299,
    compareAtPrice: 1599,
    colors: [BONE, BLACK, CHARCOAL],
    sizes: TOPS_M,
    sizeDependent: true,
    sizeChart: 'mens-tops',
    images: ['/img/tee-essential-1.jpg', '/img/tee-essential-2.jpg'],
    shortDescription: 'A 240 GSM boxy tee that holds its shape, wash after wash.',
    description:
      'The tee everything else is built around. Cut from dense 240 GSM combed cotton with a dropped shoulder and a slightly cropped, boxy body, it sits clean on its own and layers without bulk.',
    details: ['240 GSM combed cotton jersey', 'Dropped shoulder, boxy body', 'Thick 1x1 rib collar that won’t sag', 'Pre-shrunk and enzyme washed'],
    fabric: '100% combed cotton',
    fit: 'Relaxed, boxy. Take your usual size; size down for a closer fit.',
    care: 'Machine wash cold, inside out. Dry in shade.',
    tags: ['bestseller'],
    stock: 42,
    isDemo: true,
  },
  {
    id: 'nt-002',
    slug: 'chapter-01-oversized-tee',
    name: 'Chapter 01 Oversized Tee',
    category: 't-shirts',
    gender: 'unisex',
    price: 1499,
    colors: [BLACK, BONE],
    sizes: TOPS_M,
    sizeDependent: true,
    sizeChart: 'mens-tops',
    images: ['/img/tee-chapter-1.jpg', '/img/tee-chapter-2.jpg'],
    shortDescription: 'Oversized drape with a tonal Chapter 01 back print.',
    description:
      'Our signature oversized silhouette, finished with a subtle tonal print across the upper back — the first chapter of the NOVA story. Loud in cut, quiet in detail.',
    details: ['220 GSM cotton jersey', 'Tonal puff print on back', 'Extended sleeve and longer hem', 'Unisex sizing'],
    fabric: '100% cotton',
    fit: 'Oversized. Size down for a regular fit.',
    care: 'Machine wash cold, inside out. Do not iron on print.',
    tags: ['new', 'bestseller'],
    stock: 30,
    isDemo: true,
  },
  {
    id: 'nt-003',
    slug: 'cropped-rib-tee',
    name: 'Cropped Rib Tee',
    category: 't-shirts',
    gender: 'women',
    price: 999,
    colors: [SAND, BLACK, BONE],
    sizes: TOPS_W,
    sizeDependent: true,
    sizeChart: 'womens-tops',
    images: ['/img/tee-rib-1.jpg', '/img/tee-rib-2.jpg'],
    shortDescription: 'A close-fitting cropped tee in soft stretch rib.',
    description:
      'A sculpted, cropped tee in a soft ribbed knit with just enough stretch. Made to pair with high-rise trousers and our oversized shirts.',
    details: ['Cotton-elastane rib knit', 'Cropped length hits at the waist', 'Narrow crew neckline', 'Holds shape after washing'],
    fabric: '95% cotton, 5% elastane',
    fit: 'Slim, cropped. True to size.',
    care: 'Machine wash cold. Lay flat to dry.',
    tags: ['new'],
    stock: 24,
    isDemo: true,
  },
  {
    id: 'nt-004',
    slug: 'oversized-oxford-shirt',
    name: 'Oversized Oxford Shirt',
    category: 'shirts',
    gender: 'men',
    price: 2299,
    colors: [ECRU, BLACK],
    sizes: TOPS_M,
    sizeDependent: true,
    sizeChart: 'mens-tops',
    images: ['/img/shirt-oxford-1.jpg', '/img/shirt-oxford-2.jpg'],
    shortDescription: 'Washed oxford cotton in a roomy, modern cut.',
    description:
      'A classic button-down, re-proportioned. Garment-washed oxford cotton gives it a lived-in softness from day one, while the generous body works open over a tee or buttoned up.',
    details: ['Garment-washed oxford cotton', 'Button-down collar', 'Single chest pocket', 'Curved hem, box pleat at back'],
    fabric: '100% cotton oxford',
    fit: 'Oversized. Take your usual size.',
    care: 'Machine wash cold. Warm iron.',
    tags: ['bestseller'],
    stock: 18,
    isDemo: true,
  },
  {
    id: 'nt-005',
    slug: 'linen-camp-collar-shirt',
    name: 'Linen Camp-Collar Shirt',
    category: 'shirts',
    gender: 'men',
    price: 1999,
    compareAtPrice: 2499,
    colors: [CHARCOAL, BONE],
    sizes: TOPS_M,
    sizeDependent: true,
    sizeChart: 'mens-tops',
    images: ['/img/shirt-linen-1.jpg', '/img/shirt-linen-2.jpg'],
    shortDescription: 'Breathable linen-blend made for Indian summers.',
    description:
      'An open camp collar and a straight, boxy body in a breathable linen-cotton blend. Built for humid afternoons and late evenings alike.',
    details: ['Linen-cotton blend', 'Camp collar, short sleeves', 'Coconut-shell buttons', 'Straight hem for wearing untucked'],
    fabric: '55% linen, 45% cotton',
    fit: 'Relaxed, boxy. True to size.',
    care: 'Hand wash or gentle cycle. Line dry.',
    tags: [],
    stock: 15,
    isDemo: true,
  },
  {
    id: 'nt-006',
    slug: 'relaxed-poplin-shirt',
    name: 'Relaxed Poplin Shirt',
    category: 'shirts',
    gender: 'women',
    price: 2199,
    colors: [BONE, BLACK],
    sizes: TOPS_W,
    sizeDependent: true,
    sizeChart: 'womens-tops',
    images: ['/img/shirt-poplin-1.jpg', '/img/shirt-poplin-2.jpg'],
    shortDescription: 'Crisp cotton poplin with an easy, oversized drape.',
    description:
      'A crisp poplin shirt with a dropped shoulder and a longer back hem. Wear it tucked, knotted or open as a light layer.',
    details: ['Crisp cotton poplin', 'Dropped shoulder', 'Longer back hem', 'Tonal buttons'],
    fabric: '100% cotton poplin',
    fit: 'Oversized. Size down for a closer fit.',
    care: 'Machine wash cold. Warm iron.',
    tags: ['new'],
    stock: 20,
    isDemo: true,
  },
  {
    id: 'nt-007',
    slug: 'core-fleece-hoodie',
    name: 'Core Fleece Hoodie',
    category: 'hoodies',
    gender: 'unisex',
    price: 2999,
    colors: [CHARCOAL, BLACK, SAND],
    sizes: TOPS_M,
    sizeDependent: true,
    sizeChart: 'mens-tops',
    images: ['/img/hoodie-core-1.jpg', '/img/hoodie-core-2.jpg'],
    shortDescription: '400 GSM brushed fleece with a double-lined hood.',
    description:
      'A heavyweight hoodie with real structure: 400 GSM brushed-back fleece, a double-layer hood that stands on its own and ribbed cuffs that keep their grip.',
    details: ['400 GSM brushed-back fleece', 'Double-layer hood, flat drawcords', 'Kangaroo pocket', 'Ribbed cuffs and hem'],
    fabric: '80% cotton, 20% polyester',
    fit: 'Relaxed. Take your usual size.',
    care: 'Machine wash cold, inside out. Do not tumble dry.',
    tags: ['bestseller'],
    stock: 26,
    isDemo: true,
  },
  {
    id: 'nt-008',
    slug: 'zip-through-hoodie',
    name: 'Zip-Through Hoodie',
    category: 'hoodies',
    gender: 'women',
    price: 2799,
    compareAtPrice: 3299,
    colors: [SAND, CHARCOAL],
    sizes: TOPS_W,
    sizeDependent: true,
    sizeChart: 'womens-tops',
    images: ['/img/hoodie-zip-1.jpg', '/img/hoodie-zip-2.jpg'],
    shortDescription: 'An oversized zip hoodie with a two-way metal zip.',
    description:
      'Soft brushed fleece in a roomy, slightly cropped shape with a two-way metal zip — easy to throw on over everything.',
    details: ['350 GSM brushed fleece', 'Two-way metal zip', 'Split side pockets', 'Slightly cropped length'],
    fabric: '80% cotton, 20% polyester',
    fit: 'Oversized, slightly cropped. True to size.',
    care: 'Machine wash cold, inside out. Dry in shade.',
    tags: ['new'],
    stock: 12,
    isDemo: true,
  },
  {
    id: 'nt-009',
    slug: 'pleated-wide-leg-trouser',
    name: 'Pleated Wide-Leg Trouser',
    category: 'trousers',
    gender: 'men',
    price: 2799,
    colors: [BLACK, CHARCOAL],
    sizes: WAIST_M,
    sizeDependent: true,
    sizeChart: 'mens-bottoms',
    images: ['/img/trouser-pleat-1.jpg', '/img/trouser-pleat-2.jpg'],
    shortDescription: 'Double-pleated tailoring with a fluid wide leg.',
    description:
      'Tailoring for everyday. Deep double pleats, a high rise and a wide, fluid leg in a soft wool-feel blend that doesn’t crease easily.',
    details: ['Double front pleats', 'Extended waistband with hook closure', 'Side adjusters', 'Wide, full-length leg'],
    fabric: '68% polyester, 30% viscose, 2% elastane',
    fit: 'Wide leg, high rise. True to waist size.',
    care: 'Dry clean or gentle cold wash. Warm iron.',
    tags: ['new', 'bestseller'],
    stock: 16,
    isDemo: true,
  },
  {
    id: 'nt-010',
    slug: 'utility-parachute-cargo',
    name: 'Utility Parachute Cargo',
    category: 'trousers',
    gender: 'women',
    price: 2399,
    compareAtPrice: 2999,
    colors: [STONE, BLACK],
    sizes: WAIST_W,
    sizeDependent: true,
    sizeChart: 'womens-bottoms',
    images: ['/img/trouser-cargo-1.jpg', '/img/trouser-cargo-2.jpg'],
    shortDescription: 'Lightweight cargo with toggled hems and deep pockets.',
    description:
      'A light, crisp parachute cargo with volume through the leg, toggle-adjustable hems and roomy utility pockets.',
    details: ['Lightweight cotton-nylon blend', 'Adjustable toggle hems', 'Six pockets', 'Elasticated back waist'],
    fabric: '60% cotton, 40% nylon',
    fit: 'Relaxed, mid rise. True to waist size.',
    care: 'Machine wash cold. Line dry.',
    tags: [],
    stock: 22,
    isDemo: true,
  },
  {
    id: 'nt-011',
    slug: 'heavy-canvas-tote',
    name: 'Heavy Canvas Tote',
    category: 'accessories',
    gender: 'unisex',
    price: 899,
    colors: [BONE, BLACK],
    sizes: ['One Size'],
    sizeDependent: false,
    images: ['/img/tote-1.jpg', '/img/tote-2.jpg'],
    shortDescription: '16 oz canvas tote that fits a laptop and then some.',
    description:
      'A structured tote in 16 oz cotton canvas with an inner zip pocket. Fits a 15-inch laptop, a hoodie and the rest of your day.',
    details: ['16 oz cotton canvas', 'Inner zip pocket', 'Reinforced shoulder straps', '40 × 38 × 12 cm'],
    fabric: '100% cotton canvas',
    fit: 'One size',
    care: 'Spot clean only.',
    tags: ['bestseller'],
    stock: 50,
    isDemo: true,
  },
  {
    id: 'nt-012',
    slug: 'rib-knit-beanie',
    name: 'Rib Knit Beanie',
    category: 'accessories',
    gender: 'unisex',
    price: 699,
    compareAtPrice: 899,
    colors: [BLACK, CHARCOAL, SAND],
    sizes: ['One Size'],
    sizeDependent: false,
    images: ['/img/beanie-1.jpg', '/img/beanie-2.jpg'],
    shortDescription: 'A soft, deep-cuff beanie in fine rib knit.',
    description:
      'A fine-gauge rib beanie with a deep fold-over cuff. Soft enough for all-day wear, structured enough to keep its shape.',
    details: ['Fine-gauge rib knit', 'Deep fold-over cuff', 'Unisex, one size', 'Label-free finish'],
    fabric: '70% acrylic, 30% wool',
    fit: 'One size, stretch fit',
    care: 'Hand wash cold. Dry flat.',
    tags: ['new'],
    stock: 40,
    isDemo: true,
  },
]

export default products
