<<<<<<< Updated upstream
FROM node:20-alpine

RUN npm i -g pnpm

WORKDIR /usr/src/app

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install

COPY . .

EXPOSE 3000

RUN ["pnpm", "build"]

=======
FROM node:20-alpine

# ติดตั้ง pnpm
RUN npm i -g pnpm

WORKDIR /usr/src/app

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install

COPY . .

# Build โปรเจค
RUN pnpm build

EXPOSE 3000

# ใช้ shell form
>>>>>>> Stashed changes
CMD ["node", "--max-old-space-size=512", "dist/main"]