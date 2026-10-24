# NOVA THREADS — Build Plan

1. ✅ Brand foundation — design tokens (black/off-white/charcoal/beige), typography, buttons, fields (`src/styles.css`).
2. ✅ Data layer — 12 demo products in INR, categories, size charts, demo reviews, store config (COD, WhatsApp, shipping), catalogue query layer (`src/lib/catalog.ts`).
3. ✅ Imagery — 27 editorial/product images (4:5 products, 16:9 hero) in `public/img`, served via Netlify Image CDN helpers (`src/lib/image.ts`).
4. ✅ Cart & wishlist state with localStorage persistence (`src/lib/shop.tsx`).
5. ✅ Shared components built (not yet wired into routes): Header + mobile menu + search overlay, AnnouncementBar, Footer, NewsletterForm (Netlify Forms), WhatsAppButton, Toast, Modal, SizeGuide, ProductPurchase (size validation).
6. ⬜ Root layout — wrap app in `ShopProvider`, render Header/Footer/Toast/WhatsApp, fonts, SEO via `src/lib/seo.ts`.
7. ⬜ Homepage — hero "STYLE THAT SPEAKS.", new arrivals, best sellers, shop by category, editorial campaign, demo reviews, newsletter.
8. ⬜ `/shop` route — search params (category, gender, collection, q, sort), filters, sorting, ProductCard with wishlist + quick view.
9. ⬜ `/products/$slug` — gallery, ProductPurchase, details, delivery info, related products; remove the old `/products/$productId` and starter index.
10. ⬜ `/cart` and `/wishlist` — quantity updates, remove, subtotal/shipping/total, empty states.
11. ⬜ `/checkout` — validated form (name, phone, email, address, city, state, PIN), COD + online-payment placeholder, clear demo notice, no fake success.
12. ⬜ Policy pages — shipping, returns, exchange, privacy, terms, contact (Netlify Forms contact form).
13. ⬜ `public/forms.html` registration for `newsletter` and `contact`, then run the Netlify Forms enable script.
14. ⬜ Future: Netlify Database for products/orders/inventory, payment gateway (e.g. Razorpay) via server functions with webhooks.
