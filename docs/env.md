# Environment Variables

## Frontend

- `PORT`: Vite dev/preview port. Default is `3000`.
- `BASE_PATH`: Vite base path. Default is `/`.
- `VITE_AGENTS_API_URL`: optional absolute API origin for agent/API calls. Empty means same origin.

## API

- `PORT`: Express server port for local/serverful runtime. Default is `5000`.
- `NODE_ENV`: runtime environment.
- `LOG_LEVEL`: Pino log level.
- `MONGODB_URI`: MongoDB connection string. Required on Vercel.
- `GROQ_API_KEY`: optional Groq API key for LLM concierge responses. Without it, keyword/fallback chat still works.

## Legacy/Future Database Package

- `DATABASE_URL`: PostgreSQL connection string for `lib/db`. The current Express API routes do not use this package at runtime.
