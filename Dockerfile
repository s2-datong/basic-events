FROM node:12 as builder

WORKDIR /app

COPY . .

WORKDIR /app/backend

RUN npm install

RUN npm run build


FROM node:12

WORKDIR /app

COPY --from=builder /app/backend/package*.json ./backend

RUN npm install --only=prod

COPY --from=builder /app/backend/dist ./backend

COPY --from=builder /app/frontend ./frontend

WORKDIR /app/backend

CMD ["npm", "run", "start"]