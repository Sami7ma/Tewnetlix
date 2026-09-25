# Tewnetlix

Tewnetlix is organized as a small monorepo with separate frontend and backend
packages.

## Structure

- [`frontend/`](./frontend) - React and Vite application, including the UI,
  pages, components, assets, and current TMDB client.
- [`backend/`](./backend) - Node.js HTTP API foundation. It currently exposes
  `GET /health` and is ready for server-side features.

## Requirements

- Node.js 20 or newer
- npm 10 or newer

## Setup

Install dependencies from the repository root:

```bash
npm install
```

Copy the environment templates and provide the frontend values:

```bash
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

## Development

Run the frontend:

```bash
npm run dev
```

Run the backend in a separate terminal:

```bash
npm run dev:backend
```

The frontend is served by Vite, and the backend health check is available at
`http://localhost:3000/health`.

## Validation

```bash
npm run lint
npm run build
```

## Cloudflare Workers deployment

The root Wrangler configuration serves the production build from
`frontend/dist`. After authenticating Wrangler with Cloudflare, deploy with:

```bash
npm run build
npm run deploy
```
