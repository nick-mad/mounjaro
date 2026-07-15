1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`
3. Open your browser and navigate to `http://localhost:3000` to see the app in action.

## Site URL (SEO / Open Graph)

The absolute site URL used in `<link rel="canonical">`, `og:url`, `og:image` and `twitter:image` is configured in one place via the `VITE_SITE_URL` environment variable (see `.env.example`). Copy it to `.env` and set the real domain before deploying:

```
VITE_SITE_URL=https://your-domain.com
```

The value must not have a trailing slash — it is substituted into `index.html` at build time via Vite's `%VITE_SITE_URL%` placeholder syntax.
