# Routes

TanStack Start uses **file-based routing**. Every `.tsx` file in this directory
defines a route. Do **not** create `src/pages/`, `src/routes/_app/index.tsx`, or
`app/layout.tsx` — those are Next.js / Remix conventions. The only root layout
is `src/routes/__root.tsx`.

## This app's routes

| File | URL | Description |
| --- | --- | --- |
| `__root.tsx` | *(layout)* | App shell — wraps every page in `AppLayout` + `Toaster`. |
| `index.tsx` | `/` | Dashboard with tool cards, quick actions, and demo stats. |
| `email.tsx` | `/email` | Smart Email Generator. |
| `meetings.tsx` | `/meetings` | Meeting Notes Summarizer. |
| `tasks.tsx` | `/tasks` | AI Task Planner. |
| `research.tsx` | `/research` | AI Research Assistant. |
| `chat.tsx` | `/chat` | AI Workplace Chatbot. |
| `prompts.tsx` | `/prompts` | Prompt Library. |
| `responsible-ai.tsx` | `/responsible-ai` | Responsible AI guidance. |

Navigation is defined in `src/components/AppLayout.tsx` (the `NAV` array).

## Conventions

- `routeTree.gen.ts` is auto-generated. Don't edit it by hand.
- Every layout/parent route must render `<Outlet />`.
- Create a route file for every path a `<Link>` / `navigate` / `redirect`
  references — never link first and defer the page.
