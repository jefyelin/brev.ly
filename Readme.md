![Thumbnail](https://github.com/user-attachments/assets/bea6f9a2-b8e0-4a4f-839e-e8dbf6b9a003)

# Brev.ly

Brev.ly is a modern URL shortener application, featuring a React + Vite web frontend and a Node.js backend with PostgreSQL and Cloudflare R2 integration. It allows users to create, manage, and track shortened links with a focus on usability, responsiveness, and a clean UI. This project is part of a postgraduate program at [Faculdade de Tecnologia Rocketseat](https://www.rocketseat.com.br/).

---

## Features

- Create, delete, and list shortened links
- Prevents creation with malformed or duplicate short codes
- Retrieve the original URL from a short code
- Track access counts for each link
- Download a CSV report of created links (stored on Cloudflare R2)
- Responsive design for desktop and mobile
- Enhanced UX with empty states, loading indicators, and action blocking
- OpenAPI documentation for the backend

---

## Monorepo Structure

- [`web/`](./web) — React + Vite frontend
- [`server/`](./server) — Node.js backend (Fastify, PostgreSQL, Cloudflare R2)

---

## Getting Started

### Prerequisites

- Node.js v22 or higher
- pnpm
- PostgreSQL (for backend)

### Clone the repository

```bash
git clone https://github.com/jefyelin/brev.ly.git
cd brev.ly
```

---

### Setup

#### 1. Install dependencies

```bash
pnpm install
```

#### 2. Configure environment variables

- Copy `.env.exemple` to `.env` in both `web/` and `server/` folders and adjust as needed.
- See [`web/README.md`](./web/README.md) and [`server/Readme.md`](./server/Readme.md) for details.

#### 3. Database (for backend)

- Start PostgreSQL (Docker Compose is supported)
- Run migrations:

```bash
cd server
pnpm run db:migrate
```

---

## Running the Apps

### Web (Frontend)

```bash
cd web
pnpm dev
```
App runs at [http://localhost:5173](http://localhost:5173) by default.

### Server (Backend)

```bash
cd server
pnpm dev
```
API runs at [http://localhost:3333](http://localhost:3333) by default.

---

## Building for Production

See [`web/README.md`](./web/README.md) and [`server/Readme.md`](./server/Readme.md) for build and deployment instructions.

---

## API Documentation

- OpenAPI docs available at `/docs` endpoint on the backend.

---

## License

This project is for educational purposes as part of the Rocketseat postgraduate program.

---

## More Info

- [Frontend README](./web/README.md)
- [Backend README](./server/Readme.md)
