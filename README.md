# baselmousi.github.io

Source for Basel Mousi's personal website, live at <https://baselmousi.github.io>.

Built with [Astro](https://astro.build) as a static site. Every page is generated at build time from
the files in `content/`, so updating the site means editing those files and pushing to `main`.

## Running it locally

Requires Node 22.12 or newer.

```bash
npm install
npm run dev       # http://localhost:4321, reloads when content/ changes
npm run build     # writes the static site to dist/
npm run preview   # serves dist/ to check the production build
```

## Deploying

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to
GitHub Pages. You can also run it by hand from the repository's Actions tab.

## Editing content

All text, links and images live in `content/`. Two rules apply to every file there:

- **HTML comments are never shown.** Use `<!-- ... -->` for notes to yourself.
- **Anything containing `TODO` is skipped.** A link whose value is `TODO` is left off the site, and
  the build prints a warning so you know it's missing.

| File | Shown on |
| --- | --- |
| `bio.md` | Home (tagline, bio, research interests). The tagline is also the link-preview text. |
| `news.md` | Home (5 most recent) and News |
| `publications.bib` | Publications, Home (selected papers), Projects (paper citations) |
| `projects.md` | Projects, Home (featured projects), CV (project links) |
| `experience.md` | CV |
| `links.md` | Home and footer icons (GitHub, LinkedIn, Google Scholar, email) |
| `images/` | Headshot (`headshot.png`) and project images |

`cv.pdf` is a reference document and is not linked from the site.

### Add a news item

Add a line to the top of `content/news.md` (newest first):

```markdown
- **Oct 2026**: Short sentence about what happened. Use **bold** for a venue if you like.
```

Months can be short (`Oct`) or full (`October`). The homepage shows the five most recent items.

### Add a paper

Add a BibTeX entry to `content/publications.bib`. Standard fields (`title`, `author`, `booktitle` or
`journal`, `year`, `url`) work as usual. These extra fields control how it appears on the site, and
are stripped from the BibTeX that visitors copy:

| Field | Effect |
| --- | --- |
| `abbr` | Short venue badge, e.g. `{EMNLP 2025}` |
| `selected` | `{true}` to show it in "Selected publications" on the homepage |
| `pdf`, `arxiv`, `code`, `dataset`, `video` | Link buttons |
| `equal_contribution` | Authors who share first authorship, in BibTeX form: `{Durrani, Nadir and Mousi, Basel}` |

Papers are grouped by `year` and can be linked to directly at `/publications/#<bibkey>`. Lines
starting with `%` are comments.

To show the paper under a project, add its key to that project's `papers:` field in `projects.md`.

### Add a project

Add a `###` entry to `content/projects.md` under one of the three sections: `## Featured` (large
cards), `## Research projects` (smaller cards) or `## Earlier work` (a compact list).

```markdown
### Project Title
- **one_liner:** One sentence shown under the title.
- **description:** A short paragraph.
- **role:** Team Lead
- **org:** QCRI
- **tags:** Tag One, Tag Two
- **papers:** bibkey2026a, bibkey2025b
- **links:** code: https://github.com/..., dataset: https://huggingface.co/...
- **image:** images/project.png
- **featured:** true
```

All fields except the title are optional. `featured: true` also puts the project on the homepage.
`papers` takes keys from `publications.bib`. `links` is for non-paper links only (paper links belong
in the `.bib`). Put images in `content/images/`. Each project can be linked to at
`/projects/#<slugified-title>`.

To list the project under a role on the CV page, add its exact title to that role's `projects:`
field in `experience.md`.

### Edit the CV page

Each `###` heading in `content/experience.md` is one role or degree, under `## Education` or
`## Work`. The fields are `org`, `period`, `summary`, `details` and `projects`, and the format is
described in the comment at the top of the file.
