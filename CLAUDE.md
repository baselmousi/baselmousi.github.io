# CLAUDE.md

Basel Mousi's personal academic website. It is aimed at industry recruiters (research/ML
internships) and academic researchers. See README.md for the content formats.

## Stack

- Astro 7, fully static. No UI framework, and JavaScript only for the theme toggle and the BibTeX copy button.
- Deployed to GitHub Pages at https://baselmousi.github.io (user site, root path) by
  `.github/workflows/deploy.yml` on every push to `main`.
- Commands: `npm run dev` (port 4321), `npm run build`, `npm run preview`.
- Libraries: `@retorquere/bibtex-parser` for `publications.bib`, `marked` for markdown,
  `@fontsource-variable/source-serif-4` for the font, and `astro:assets` (sharp) for images.

## Layout

- `content/` holds all site content: text, links, publications and images. It is the only source of truth.
- `src/lib/` has one loader per content file (`bio.ts`, `news.ts`, `publications.ts`,
  `projects.ts`, `experience.ts`, `links.ts`, `images.ts`), plus shared helpers in `content.ts`.
  Loaders read `content/` with `fs` at build time.
- `src/pages/` contains `index`, `publications`, `projects`, `cv`, `news` and `404`. The `cv` page renders `experience.md`.
- `src/components/` holds the presentational pieces. `src/layouts/Base.astro` has the head, SEO/OG
  tags, JSON-LD and the theme script. `src/styles/global.css` has the design tokens and dark mode.
- The nav lives in `src/lib/site.ts`.

## Rules

1. **Content only in `content/`.** Never hard-code bios, dates, titles, links or other facts in
   `src/`. Layout code reads from the loaders. To change what the site says, edit `content/`.
2. **Never invent anything.** No made-up facts, dates, metrics, links, author names or images. If
   something is missing, ask Basel, or leave a `TODO` comment in the code. Never put it on the
   rendered site.
3. **TODO and HTML comments never render.** HTML comments in content files are stripped. Any value
   containing `TODO` is dropped, and the build prints a warning. A link whose value is `TODO` is
   skipped. Keep it that way. After a build, `grep -ri todo dist` should find nothing.
4. **`content/cv.pdf` is a reference document.** Don't link or publish it unless Basel asks.
5. A missing BibTeX key, image or project title must fail the build with `ContentError`. Don't
   let it fail silently.

## Content decisions to respect

- Both Fanar reports use `author = {{Fanar Team}}`.
- Some papers are deliberately left out of `publications.bib` (EverydayMMQA, naous2023open,
  elzini2022evaluation). Don't re-add them.
- No Shaheen demo link and no NeuroX code link. No dates for Omdena. No talks or service section.
- Spell it "Yousseif Elshahawy".

## Quality bar

Semantic HTML, accessible (skip link, labelled icons, visible focus, reduced motion), light and dark
mode, responsive with no horizontal scroll at 375px, minimal JS, Lighthouse 95+. Check desktop,
phone width and dark mode after visual changes.
