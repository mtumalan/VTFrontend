# ─── Etapa 1: construir la app ─────────────────────────────────────────────
FROM node:18-alpine AS builder
WORKDIR /app

COPY package.json yarn.lock ./
# Cambiamos --frozen-lockfile por yarn install normal
RUN yarn install

COPY . .
RUN yarn build

# ─── Etapa 2: servir la app ─────────────────────────────────────────────────
FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
ENV NEXT_TELEMETRY_DISABLED=1
CMD ["yarn", "start"]
