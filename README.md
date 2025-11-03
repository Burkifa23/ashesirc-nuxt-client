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

Key color scheme:
- `text-ink` - Primary text
- `bg-paper` - Background
- `text-accent` - Highlights

## Adding Content

1. **New Article**: Add to topic blocks in `Home.vue`
2. **New Page**: Create in `src/pages/` and update router
3. **New Component**: Add to `src/components/`

Built for the Ashesi University research community.
