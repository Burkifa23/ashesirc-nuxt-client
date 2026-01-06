# Ashesi Research Magazine UI

Modern frontend for the Ashesi Research Magazine. Renders clean, accessible UI for showcasing academic research and publications.

## Quick Start

```bash
npm install
npm run dev    # Start development server
```

## Tech Stack

- **Vue 3.5** + TypeScript + Composition API
- **TailwindCSS 3.4** for styling
- **Vite 7** for build tooling
- **Vitest** for testing

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ArticleCard.vue
│   ├── Header.vue
│   ├── Footer.vue
│   └── NewsletterSignup.vue
├── pages/              # Page components
│   ├── Home.vue
│   ├── About.vue
│   └── Article.vue
├── router/             # Routing configuration
├── assets/             # Styles and static assets
├── App.vue             # Root component
└── main.ts             # Application entry
```

## Key Components

- **Header/Footer**: Site navigation and branding
- **ArticleCard**: Displays research articles with metadata
- **TopicBlock**: Organizes content by research areas
- **NewsletterSignup**: Subscription form component

## Development

```bash
npm run dev          # Development server
npm run build        # Production build
npm run test:unit    # Run tests
npm run lint         # Code linting
```

## Styling

Uses TailwindCSS utility classes. Custom styles in `src/assets/main.css`.

**Brand Colors:**
- **Vista Blue** (`#92ACFF`) - Secondary buttons, accents, highlights
- **Blue Oxford** (`#0E0929`) - Primary backgrounds, main text

**Key Classes:**
- `bg-primary` / `text-primary` - Blue Oxford (#0E0929)
- `bg-secondary` / `text-secondary` - Vista Blue (#92ACFF)
- `bg-paper` - Light background (#fafaf7)
- `text-ink` - Primary text (Blue Oxford)
- `text-accent` - Highlights (Vista Blue)

## Adding Content

1. **New Article**: Add to topic blocks in `Home.vue`
2. **New Page**: Create in `src/pages/` and update router
3. **New Component**: Add to `src/components/`

## Sanity CMS (optional)

This project supports fetching articles from Sanity as a fallback to the existing API. Sanity integration is optional and disabled by default. To enable:

1. Install packages:

   npm install @sanity/client @sanity/image-url @portabletext/vue

2. Add environment variables (Vercel or local `.env`):

   VITE_SANITY_PROJECT_ID=yourProjectId
   VITE_SANITY_DATASET=production
   VITE_SANITY_API_VERSION=2021-10-21
   VITE_SANITY_USE_CDN=true
   VITE_SANITY_READ_TOKEN=yourOptionalReadToken

3. The app exposes `src/lib/sanity.ts` which exports `sanityClient`, `urlFor`, and `fetchBySlug`.

4. `src/pages/Article.vue` will attempt to fetch from Sanity when `VITE_SANITY_PROJECT_ID` is present. It falls back to the previous API behavior if Sanity isn't configured or the request fails.

Notes:
- Portable Text rendering requires `@portabletext/vue`. If your Sanity `body` is Portable Text, replace the `v-html` rendering with the PortableText component.
- Keep your read token private when enabling preview/drafts.

Built for the Ashesi University research community.
