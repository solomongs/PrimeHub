# PrimeHub HR Website

PrimeHub is a static corporate website for a Nigeria-based human resources and workforce consulting firm. It presents PrimeHub's recruitment, executive search, talent assessment, HR strategy, payroll, and workforce-compliance services through an interactive single-page experience.

The site also includes:

- A company profile and service portfolio.
- An interactive 12-week HR consulting proposal and retainer calculator.
- A rules-based workforce planning guide for common recruitment and compliance questions.
- Proposal and pricing-request forms.
- A browser-local request dashboard that demonstrates how submitted briefs are organized.

## Static website architecture

The project builds entirely to static HTML, CSS, JavaScript, and image assets. It does not require an application server, API key, database, or server-side AI service. Form submissions and dashboard records are demonstration data stored in the visitor's browser using `localStorage`; they are not transmitted to PrimeHub or sent by email.

## Run locally

**Prerequisite:** Node.js 18 or newer.

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Build the static files

```bash
npm run build
```

The deployable static website is generated in `dist/`. Upload the contents of that directory to any static host, such as GitHub Pages, Netlify, Cloudflare Pages, an S3-compatible bucket, or a standard web server.

To inspect the production build locally:

```bash
npm run preview
```

## Project structure

- `index.html` — static HTML entry point.
- `src/` — React components, styles, images, and browser-local data services.
- `vite.config.ts` — static Vite build configuration with relative asset paths.
- `dist/` — generated deployable files after running `npm run build`.
