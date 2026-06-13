# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Qingzao Homepage is a static studio portfolio website built with React 19 + Vite 6. It showcases the studio's products (a renovation mind-mapping tool and an AI image trimmer), about section, and contact info. Deployed on Vercel with SPA routing.

## Commands

```bash
npm run dev        # Start dev server on port 22333
npm run build      # Production build to dist/
npm run preview    # Preview production build locally
```

## Architecture

### Routing (App.jsx)

- `<LanguageProvider>` wraps the entire app
- `<Routes>` (react-router-dom v7) defines:
  - `/` -> `<HomePage>` (Header + Hero + Products + About + Contact + Footer)
  - `/privacy` -> `<PrivacyPage>`
  - `/terms` -> `<TermsPage>`

### Multi-language System

- `src/locales/` - JSON files: `zh-CN.json`, `en-US.json`
- `src/contexts/LanguageContext.jsx` - Context + Provider with `t(key, params)` function supporting nested dot-notation keys, parameter replacement, and `returnObjects` for arrays
- `src/hooks/useLanguage.jsx` - Hook to consume context
- `src/components/LanguageSwitcher.jsx` - Dropdown UI in Header
- Language preference persisted in `localStorage` (`qingzao-language-preference`), fallback to browser language
- All text in components must use `t()` — no hardcoded strings

### Component Structure

Each component is a single JSX file + matching CSS file in `src/components/`:

| Component | Purpose |
|-----------|---------|
| Header | Sticky nav with logo, nav links, LanguageSwitcher, CTA button, mobile hamburger menu |
| Hero | Hero section with product showcase window, chat sidebar, panel display |
| Products | Two-column product cards (decoration / trimmer) with images, descriptions, stats |
| About | Studio philosophy text with signature |
| Contact | Email and social links |
| Footer | Dark multi-column links, copyright, Legal `<Link>` buttons (privacy/terms) |
| LegalPage | Reusable layout for privacy/terms pages (title, intro, sections array) |
| PrivacyPage / TermsPage | Thin wrappers around LegalPage with locale-specific content |

### Key Patterns

- **No external UI libraries** — all styling is custom CSS with CSS variables
- **No TypeScript** — plain JSX + JSON
- **CSS variables** defined in `index.css` (`--primary-color`, `--text-primary`, etc.)
- **Mobile-first** responsive via `@media` queries in each component's CSS
- **react-router-dom v7** uses `<Routes>`/`<Route>`/`<Link>` (not history router)
- **Vercel deploy**: `vercel.json` rewrites all routes to `index.html`

### Adding a New Language

1. Create `src/locales/{lang}.json` mirroring the structure of `zh-CN.json`
2. Import and add to `languageResources` in `LanguageContext.jsx`
3. Add to `availableLanguages` array in `LanguageContext.jsx`
4. (Optional) Add browser detection in `getBrowserLanguage()`

### Legal Pages

`LegalPage.jsx` is a shared layout component. Individual pages (`PrivacyPage.jsx`, `TermsPage.jsx`) pass translation keys to render locale-specific content from the `legal` section of the JSON files.
