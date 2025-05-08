# Brev.ly

Brev.ly is a modern URL shortener web application built with React and Vite. It allows users to create, manage, and track shortened links with a focus on usability, responsiveness, and a clean UI. This project is part of a postgraduate program at [Faculdade de Tecnologia Rocketseat](https://www.rocketseat.com.br/).

## Features

- Create shortened links
  - Prevents creation with malformed or duplicate short codes
- Delete links
- Retrieve the original URL from a short code
- List all registered URLs
- Increment access count for each link
- Download a CSV report of created links
- Responsive design for desktop and mobile
- [Figma-inspired layout](https://www.figma.com/community/file/1234567890)
- Enhanced UX with empty states, loading indicators, and action blocking based on app state

## Getting Started

### Prerequisites

- Node.js v22 or higher
- pnpm

### Installation

```bash
pnpm install
```

### Running the Development Server

```bash
pnpm dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### Building for Production

```bash
pnpm build
```

### Previewing Production Build

```bash
pnpm preview
```

## Environment Variables

Copy `.env.exemple` to `.env` and adjust as needed:

```env
VITE_SERVER_CLIENT_URL="http://localhost:3333"
```