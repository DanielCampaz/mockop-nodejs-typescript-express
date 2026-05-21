# 📦 Stage 1: build
FROM node:24-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn build

# 🚀 Stage 2: runtime
FROM node:24-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

RUN yarn install --production

EXPOSE 3000

CMD ["node", "dist/root.js"]