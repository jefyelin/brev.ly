# Brev.ly Server

A URL shortener backend service with CSV export and CDN integration. This project is part of a postgraduate program at [Faculdade de Tecnologia Rocketseat](https://www.rocketseat.com.br/).

---

## Features

- Create, delete, and list shortened links
- Get original URLs by short code
- Track access counts
- Export all links as CSV (stored on Cloudflare R2)
- OpenAPI documentation

---

## Table of Contents

- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Development](#development)
- [Build & Production](#build--production)
- [Docker Usage](#docker-usage)
- [API Documentation](#api-documentation)
- [Features](#features)
- [Troubleshooting](#troubleshooting)

---

## Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/jefyelin/brev.ly.git

cd brev.ly/server

pnpm install
```

---

## Environment Variables

Copy `.env.exemple` to `.env` and fill in the required values:

```bash
cp .env.exemple .env
```

**Required variables:**

- `PORT` - Server port (default: 3333)
- `NODE_ENV` - Environment (`development`, `test`, `production`)
- `DATABASE_URL` - PostgreSQL connection string (see [Database Setup](#database-setup))
- `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_ACCESS_KEY_ID`, `CLOUDFLARE_SECRET_ACCESS_KEY`, `CLOUDFLARE_BUCKET`, `CLOUDFLARE_PUBLIC_URL` - Cloudflare R2 credentials for CSV export

---

## Database Setup

This project uses PostgreSQL. You can use Docker Compose for local development.

1. **Start the database:**

    ```bash
    docker compose up -d
    ```

2. **Run migrations:**

    ```bash
    pnpm run db:migrate
    ```

---

## Development

Start the server in development mode with hot reload:

```bash
pnpm run dev
```

The server will run on [http://localhost:3333](http://localhost:3333) by default.

---

## Build & Production

Build the project:

```bash
pnpm run build
```

Start the production server:

```bash
pnpm run start
```

---

## Docker Usage

Build the Docker image:

```bash
docker build -t brev.ly .
```

Run the container (ensure your `.env` is configured):

```bash
docker run -p 3333:3333 brev.ly
```

---

## API Documentation

- Scalar API Reference: `/docs`

---

## Troubleshooting

- Ensure PostgreSQL is running and accessible at `DATABASE_URL`
- Cloudflare R2 credentials must be valid for CSV export
- For any issues, check logs and ensure all environment variables are set