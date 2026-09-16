FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

EXPOSE 3030

CMD ["sh", "-c", "npx knex migrate:latest && node server.js"]
