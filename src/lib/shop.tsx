import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { storeConfig } from '@/config/store'
import { getProductById, type Product } from '@/lib/catalog'

const CART_KEY = 'nova-threads:cart:v1'
const WISHLIST_KEY = 'nova-threads:wishlist:v1'
export const MAX_QTY = 10

export interface CartLine {
  productId: string
  size: string | null
  color: string
  quantity: number
}

export interface ResolvedCartLine extends CartLine {
  key: string
  product: Product
  lineTotal: number
}

interface Toast {
  id: number
  message: string
  action?: { label: string; to: '/cart' | '/wishlist' }
}

interface ShopContextValue {
  /** False until localStorage has been read on the client. */
  ready: boolean
  lines: ResolvedCartLine[]
  itemCount: number
  subtotal: number
  shipping: number
  addToCart: (line: CartLine) => void
  updateQuantity: (key: string, quantity: number) => void
  removeLine: (key: string) => void
  clearCart: () => void
  wishlist: string[]
  isWishlisted: (productId: string) => boolean
  toggleWishlist: (productId: string) => void
  toast: Toast | null
  dismissToast: () => void
}

const ShopContext = createContext<ShopContextValue | null>(null)

export const lineKey = (l: Pick<CartLine, 'productId' | 'size' | 'color'>) =>
  `${l.productId}|${l.size ?? ''}|${l.color}`

export function shippingFor(subtotal: number) {
  if (subtotal === 0) return 0
  return subtotal >= storeConfig.shipping.freeThreshold ? 0 : storeConfig.shipping.standardFee
}

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

/** Drops anything in storage that no longer matches the catalogue. */
function sanitizeLines(raw: unknown): CartLine[] {
  if (!Array.isArray(raw)) return []
  return raw.flatMap((l) => {
    const product = l && typeof l.productId === 'string' ? getProductById(l.productId) : undefined
    if (!product) return []
    const size = product.sizeDependent ? (product.sizes.includes(l.size) ? l.size : null) : null
    if (product.sizeDependent && !size) return []
    const color = product.colors.some((c) => c.name === l.color) ? l.color : product.colors[0].name
    const quantity = Math.min(MAX_QTY, Math.max(1, Math.floor(Number(l.quantity) || 1)))
    return [{ productId: product.id, size, color, quantity }]
  })
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false)
  const [cart, setCart] = useState<CartLine[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])
  const [toast, setToast] = useState<Toast | null>(null)
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    setCart(sanitizeLines(readStorage(CART_KEY, [])))
    const wl = readStorage<unknown>(WISHLIST_KEY, [])
    setWishlist(Array.isArray(wl) ? wl.filter((id): id is string => typeof id === 'string' && !!getProductById(id)) : [])
    setReady(true)

    // Keep multiple open tabs in sync.
    const onStorage = (e: StorageEvent) => {
      if (e.key === CART_KEY) setCart(sanitizeLines(readStorage(CART_KEY, [])))
      if (e.key === WISHLIST_KEY) setWishlist(readStorage(WISHLIST_KEY, []))
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  useEffect(() => {
    if (ready) window.localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }, [cart, ready])

  useEffect(() => {
    if (ready) window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist))
  }, [wishlist, ready])

  const showToast = useCallback((t: Omit<Toast, 'id'>) => {
    clearTimeout(toastTimer.current)
    setToast({ ...t, id: Date.now() })
    toastTimer.current = setTimeout(() => setToast(null), 4000)
  }, [])

  const addToCart = useCallback(
    (line: CartLine) => {
      const product = getProductById(line.productId)
      if (!product) return
      if (product.sizeDependent && !line.size) throw new Error('A size is required for this product')
      const key = lineKey(line)
      setCart((prev) => {
        const existing = prev.find((l) => lineKey(l) === key)
        if (existing) {
          return prev.map((l) =>
            lineKey(l) === key ? { ...l, quantity: Math.min(MAX_QTY, l.quantity + line.quantity) } : l,
          )
        }
        return [...prev, { ...line, quantity: Math.min(MAX_QTY, line.quantity) }]
      })
      showToast({ message: `${product.name} added to your bag`, action: { label: 'View bag', to: '/cart' } })
    },
    [showToast],
  )

  const updateQuantity = useCallback((key: string, quantity: number) => {
    setCart((prev) =>
      prev.map((l) => (lineKey(l) === key ? { ...l, quantity: Math.min(MAX_QTY, Math.max(1, quantity)) } : l)),
    )
  }, [])

  const removeLine = useCallback((key: string) => {
    setCart((prev) => prev.filter((l) => lineKey(l) !== key))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const toggleWishlist = useCallback(
    (productId: string) => {
      const has = wishlist.includes(productId)
      const name = getProductById(productId)?.name ?? 'Item'
      setWishlist((prev) => (has ? prev.filter((id) => id !== productId) : [...prev, productId]))
      showToast(
        has
          ? { message: `${name} removed from wishlist` }
          : { message: `${name} saved to wishlist`, action: { label: 'View', to: '/wishlist' } },
      )
    },
    [wishlist, showToast],
  )

  const value = useMemo<ShopContextValue>(() => {
    const lines = cart.flatMap((l) => {
      const product = getProductById(l.productId)
      return product ? [{ ...l, key: lineKey(l), product, lineTotal: product.price * l.quantity }] : []
    })
    const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0)
    return {
      ready,
      lines,
      itemCount: lines.reduce((sum, l) => sum + l.quantity, 0),
      subtotal,
      shipping: shippingFor(subtotal),
      addToCart,
      updateQuantity,
      removeLine,
      clearCart,
      wishlist,
      isWishlisted: (id) => wishlist.includes(id),
      toggleWishlist,
      toast,
      dismissToast: () => setToast(null),
    }
  }, [cart, ready, wishlist, toast, addToCart, updateQuantity, removeLine, clearCart, toggleWishlist])

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export function useShop() {
  const ctx = useContext(ShopContext)
  if (!ctx) throw new Error('useShop must be used inside <ShopProvider>')
  return ctx
}
