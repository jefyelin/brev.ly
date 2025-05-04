FROM node:22-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY . .

RUN pnpm install --frozen-lockfile --force

RUN pnpm run build

FROM node:22-alpine AS production

WORKDIR /app

RUN npm install -g pnpm

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm install --frozen-lockfile --prod

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/.env ./.env

EXPOSE 3333

ENV NODE_ENV=production

CMD ["pnpm", "run", "start"]
