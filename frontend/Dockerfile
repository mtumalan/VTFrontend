# Filename: Dockerfile

# ─── Stage 1: install dependencies and build ───
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies (no --frozen-lockfile)
# This lets yarn update lockfile if needed during build
RUN yarn install

# Copy the rest of the frontend sources
COPY . .

# Build the Next.js app
RUN yarn build

# ─── Stage 2: run the built app ───
FROM node:18-alpine AS runner
WORKDIR /app

# Copy only the production build from “builder”
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/package.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

# Expose port 3000 (Next.js default)
EXPOSE 3000

ENV NEXT_TELEMETRY_DISABLED=1

CMD ["yarn", "start"]
