# ChronoCraft

ChronoCraft is a watch discovery and customization web app. Browse a curated
catalog of timepieces, filter watches by brand and style, or create a visual
custom design by choosing case, dial, and strap options.

## Features

- Interactive watch customizer with a live SVG preview.
- Customizable case, dial, strap color, and strap type.
- Watch catalog with brand and style filters.
- Save custom designs through the backend API.
- Sample watch catalog data for development.

## Technology

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS 4.
- **Backend:** FastAPI, SQLAlchemy, Pydantic.
- **Data:** PostgreSQL with pgvector support.

## Project structure

```text
backend/
  data/watches.json          Sample catalog data
  main.py                    FastAPI routes
  models.py                  SQLAlchemy data models
  requirements.txt           Python dependencies
  scripts/                   Development data utilities
frontend/
  src/app/                   Next.js pages
  src/components/            Watch UI components
```

## Run the frontend

Requirements: Node.js and npm.

```bash
cd frontend
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other useful commands, run from `frontend/`:

```bash
npm run lint
npm run build
```

The Discover page and design-saving action call the API at
`http://localhost:8000`.

## Backend status

The API source and sample catalog are included, but the database connection
module and local Docker Compose configuration are intentionally not included
because they contained hard-coded database credentials. As a result, the
backend is not ready to run from this repository as-is. Before starting it,
provide a secure, environment-based database configuration and local database
service; do not commit credentials.

The API currently defines these routes:

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/` | API welcome message |
| `GET` | `/watches` | List watches; optionally filter by `brand` and `style` |
| `GET` | `/watches/{watch_id}` | Get a watch by ID |
| `POST` | `/designs` | Save a custom design |
| `GET` | `/designs/{design_id}` | Retrieve a saved design |

Install the Python dependencies from `backend/requirements.txt` after the
database configuration is in place.
