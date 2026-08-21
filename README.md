# CS 886: Learning Theory for Modern AI

Course website for the Fall 2026 University of Waterloo graduate seminar
**Learning Theory for Modern AI: Transformers and Large Language Models**.

The public website is available at:

<https://watcl-lab.github.io/cs886-learning-theory/>

## Local development

```sh
npm install
npm run dev
```

Public course facts, meeting logistics, paper records, policies, and the project
deadline are maintained in `app/courseData.ts`. The site currently uses `TBA`
for instructor-controlled logistics that have not yet been confirmed. Do not
publish a `TODO_INSTRUCTOR_*` placeholder.

## Validation

Run the deterministic checks and the network link check separately so that a
temporary remote-site failure is easy to distinguish from a content failure:

```sh
npm ci
npm run lint
npm test
npm run check:links
npm run build
SITE_URL=https://watcl-lab.github.io/cs886-learning-theory/ node scripts/export-static.mjs
```

`npm test` validates the rendered content, course-data arithmetic, navigation
and accessibility structure, and the GitHub Pages static export. The
`check:links` command makes bounded external requests to every course URL and
reports the title or data field associated with any failure.

## Deployment

Pushes to `main` are built and published automatically with GitHub Pages.
The deployment workflow runs linting, deterministic tests, external-link
validation, a production build, and the static export before publishing.
