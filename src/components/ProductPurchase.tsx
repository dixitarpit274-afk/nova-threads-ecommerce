import { useId, useRef, useState } from 'react'
import { Heart, Minus, Plus } from 'lucide-react'
import { SizeGuideButton } from './SizeGuide'
import { Price } from './ui'
import { MAX_QTY, useShop } from '@/lib/shop'
import type { Product } from '@/lib/catalog'

/** Colour, size and quantity selection plus Add to Bag — shared by the product page and quick view. */
export function ProductPurchase({ product, onAdded }: { product: Product; onAdded?: () => void }) {
  const { addToCart, isWishlisted, toggleWishlist } = useShop()
  const [color, setColor] = useState(product.colors[0].name)
  const [size, setSize] = useState<string | null>(product.sizeDependent ? null : product.sizes[0])
  const [qty, setQty] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const sizeGroup = useRef<HTMLFieldSetElement>(null)
  const uid = useId()
  const wished = isWishlisted(product.id)

  function handleAdd() {
    if (product.sizeDependent && !size) {
      setError('Please select a size to continue.')
      sizeGroup.current?.querySelector<HTMLInputElement>('input')?.focus()
      return
    }
    addToCart({ productId: product.id, size: product.sizeDependent ? size : null, color, quantity: qty })
    onAdded?.()
  }

  return (
    <div className="space-y-7">
      <Price price={product.price} compareAt={product.compareAtPrice} size="lg" />

      <fieldset>
        <legend className="mb-3 text-xs">
          <span className="eyebrow">Colour</span> <span className="ml-1 text-ash">— {color}</span>
        </legend>
        <div className="flex flex-wrap gap-2.5">
          {product.colors.map((c) => (
            <label key={c.name} className="cursor-pointer" title={c.name}>
              <input type="radio" name={`${uid}-color`} value={c.name} checked={color === c.name} onChange={() => setColor(c.name)} className="peer sr-only" />
              <span className="sr-only">{c.name}</span>
              <span
                className="block size-9 rounded-full border border-ink/20 ring-offset-2 ring-offset-paper transition peer-checked:ring-2 peer-checked:ring-ink peer-focus-visible:ring-2 peer-focus-visible:ring-ink/50"
                style={{ backgroundColor: c.hex }}
                aria-hidden="true"
              />
            </label>
          ))}
        </div>
      </fieldset>

      {product.sizeDependent ? (
        <fieldset ref={sizeGroup} aria-describedby={error ? `${uid}-err` : undefined} aria-invalid={!!error}>
          <div className="mb-3 flex items-center justify-between">
            <legend className="eyebrow">Size {size && <span className="ml-1 normal-case tracking-normal text-ash">— {size}</span>}</legend>
            {product.sizeChart && <SizeGuideButton chart={product.sizeChart} />}
          </div>
          <div className="grid grid-cols-5 gap-2">
            {product.sizes.map((s) => (
              <label key={s} className="cursor-pointer">
                <input
                  type="radio"
                  name={`${uid}-size`}
                  value={s}
                  checked={size === s}
                  onChange={() => {
                    setSize(s)
                    setError(null)
                  }}
                  className="peer sr-only"
                />
                <span
                  className={`flex h-12 items-center justify-center border text-sm font-medium transition peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink hover:border-ink ${error ? 'border-sale/60' : 'border-ink/20'}`}
                >
                  {s}
                </span>
              </label>
            ))}
          </div>
          {error && (
            <p id={`${uid}-err`} role="alert" className="mt-2.5 text-sm font-medium text-sale">{error}</p>
          )}
        </fieldset>
      ) : (
        <p className="text-sm text-ash"><span className="eyebrow mr-2 text-ink">Size</span> One size</p>
      )}

      <div className="flex gap-3">
        <div className="flex h-14 items-center border border-ink/20" role="group" aria-label="Quantity">
          <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1} className="grid h-full w-11 place-items-center disabled:opacity-30" aria-label="Decrease quantity">
            <Minus className="size-4" aria-hidden="true" />
          </button>
          <span className="w-8 text-center text-sm font-semibold tabular-nums" aria-live="polite" aria-label={`Quantity ${qty}`}>{qty}</span>
          <button type="button" onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))} disabled={qty >= MAX_QTY} className="grid h-full w-11 place-items-center disabled:opacity-30" aria-label="Increase quantity">
            <Plus className="size-4" aria-hidden="true" />
          </button>
        </div>
        <button type="button" onClick={handleAdd} className="btn btn-dark h-14 flex-1">
          Add to bag
        </button>
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          className="grid size-14 shrink-0 place-items-center border border-ink/20 transition hover:border-ink"
          aria-pressed={wished}
          aria-label={wished ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`size-5 ${wished ? 'fill-ink' : ''}`} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
