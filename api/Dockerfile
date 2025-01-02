FROM node:18-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install --production

COPY . .

EXPOSE 5000

CMD ["node", "index.js"]
