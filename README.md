# Portfolio

Personal portfolio of Prashast Awasthi. A single-page static site built with Next.js, TypeScript, Tailwind CSS and Motion.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Edit the content

All text lives in `data/`:

| File | Content |
|---|---|
| `site.ts` | Name, links, email, resume path |
| `experience.ts` | Internships |
| `projects.ts` | Projects, links and screenshots |
| `beyond.ts` | Leadership and volunteering |
| `skills.ts` | Toolkit and marquee |

Optional fields (links, screenshots, notes) are hidden automatically when left out.

## Build

```bash
npm run build
```

The static site is written to `out/`. Pushes to `main` deploy to GitHub Pages through `.github/workflows/deploy.yml`.
