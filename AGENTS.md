# NOVA THREADS — agent notes

TanStack Start + React 19 + Tailwind v4 on Netlify. **Read PLAN.md first** — it lists finished and remaining milestones.

## Layout
- `src/config/store.ts` — business settings (demo mode, COD, online payments flag, WhatsApp, shipping thresholds).
- `src/data/` — demo products (string ids + slugs, INR, `images[]`, `sizeDependent`), categories, size charts, demo reviews. All marked `isDemo`.
- `src/lib/catalog.ts` — the only way UI reads products; swap for Netlify Database later.
- `src/lib/shop.tsx` — `ShopProvider`/`useShop`: cart, wishlist, toast; localStorage read only in effects (SSR-safe).
- `src/lib/image.ts` — `cdn()` / `productSrcSet()` for Netlify Image CDN URLs (4:5 product ratio).
- `src/lib/seo.ts` — per-route head metadata. `src/lib/netlify-form.ts` — posts to `/forms.html` (must be created in `public/`).
- `src/components/` — Header, Footer, Modal (native `<dialog>`), ProductPurchase, SizeGuide, NewsletterForm, WhatsAppButton, Toast, ui primitives.
- `public/img/` — generated editorial photography (jpg).

## Conventions & decisions
- Stripe starter was removed; checkout must never fake payment success or collect card data. Online payment is a placeholder until a provider is integrated server-side.
- Utility classes `btn`, `btn-dark`, `btn-light`, `btn-outline`, `field`, `eyebrow`, `font-display` are defined in `styles.css`.
- Nav links target `/shop` with search params (`gender`, `collection`, `category`, `q`) — the `/shop` route must validate these.
- The legacy `src/routes/index.tsx` and `src/routes/products/$productId.tsx` are temporary starter pages to be replaced.
- After adding Netlify Forms, run `node /opt/buildhome/.claude/skills/netlify-forms/scripts/enable.cjs`.
