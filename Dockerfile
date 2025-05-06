FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm@latest-10

RUN pnpm install

COPY . .

RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "run", "start:dev"]
