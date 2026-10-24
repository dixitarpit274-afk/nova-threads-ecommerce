# NOVA THREADS — Wear Your Next Chapter.

A premium streetwear D2C storefront for Indian men and women aged 18–30, built with TanStack Start (React 19), Tailwind CSS v4 and deployed on Netlify.

## Tech
- TanStack Start + TanStack Router (file routes in `src/routes`)
- Tailwind CSS v4 (design tokens in `src/styles.css`)
- Netlify Image CDN for optimised imagery, Netlify Forms for newsletter/contact
- Cart and wishlist persisted in localStorage

## Run locally
```bash
pnpm install
netlify dev        # or: pnpm dev
```

## Configure
Edit `src/config/store.ts`, or set env vars in Netlify: `VITE_WHATSAPP_NUMBER` (digits, e.g. 919876543210), `VITE_SUPPORT_EMAIL`, `VITE_SITE_URL`. Replace demo products in `src/data/products.ts` and images in `public/img`.

## Deploy to Netlify
Connect the repo; build command `vite build`, publish `dist/client` (already in `netlify.toml`). Set the env vars above in Site settings → Environment variables.

## Roadmap
See [PLAN.md](PLAN.md). Remaining: wiring the root layout, homepage, shop, product, cart, wishlist, checkout and policy pages onto the components and data already built.
