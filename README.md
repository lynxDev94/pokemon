# Pokémon Search

Search for a Pokémon by name and see its artwork. Built with TypeScript and Next.js (App Router), server-rendered.

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

## How it works

**Search.** The form is a Server Component posting to a server action. The action
normalises the input and redirects to `/pokemon/<name>`. A plain HTML form cannot build a
URL _path_ segment, so that mapping has to happen somewhere — doing it in an action keeps
the form free of client JavaScript, and search works before (or without) JS loading.

**The Pokémon page** is an `async` Server Component. It validates the route parameter,
fetches on the server, and renders. Responses are cached for 24 hours, since Pokémon data
does not change.

**Input normalisation** (`lib/normalize.ts`) does more than trim and lowercase: it also
bridges how people actually type names, so `Mr. Mime` → `mr-mime` and `Farfetch'd` →
`farfetchd` resolve instead of 404ing.

## Scripts

| Command                     | Purpose                    |
| --------------------------- | -------------------------- |
| `pnpm dev`                  | Development server         |
| `pnpm build` / `pnpm start` | Production build and serve |
| `pnpm test`                 | Jest + Testing Library     |
| `pnpm lint`                 | ESLint                     |
| `pnpm format`               | Prettier                   |

## On dependencies

I kept these minimal deliberately. The task emphasises SSR, so I fetched in Server
Components rather than reaching for React Query, and used CSS Modules over styled-components
so components stay server-rendered. In a codebase already standardised on those tools I'd
use a styled-components registry.
