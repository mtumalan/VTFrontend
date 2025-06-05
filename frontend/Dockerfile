# Dockerfile.dev para desarrollo con hot reload en Next.js
FROM node:18-alpine
WORKDIR /app

# Copia solo package.json y yarn.lock para instalar dependencias
COPY package.json yarn.lock ./

# Instala dependencias
RUN yarn install

# Copia el resto del código (opcional, para build inicial, pero será sobreescrito por el volumen)
COPY . .

# Expone el puerto 3000
EXPOSE 3000

# Desactiva la telemetría de Next.js
ENV NEXT_TELEMETRY_DISABLED=1

# Comando por defecto: modo desarrollo
CMD ["yarn", "dev"]