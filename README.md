# Chronos

Time tracking by project and task. Built with Next.js and shadcn/ui (Radix).

## Getting started

Requires Node.js and Docker.

```bash
npm install
docker compose up -d --build   # starts PostgreSQL on localhost:5433
npm run dev                    # http://localhost:3000
```

The database works with its built-in development defaults. To change them, copy `.env.example` to `.env`.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Check TypeScript types |
| `npm run format` | Format with Prettier |

## UI components

Components live in `components/ui`. To add one:

```bash
npx shadcn@latest add <component>
```

## Database

```bash
docker compose stop      # stop PostgreSQL, keep the data
docker compose down -v   # remove the container and delete the data
```
