FROM node:24-slim AS dev 

WORKDIR /app

COPY ./package*.json .

RUN npm i

CMD [ "npm", "run", "dev", "--", "--host" ]

FROM node:24-slim AS builder 

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:24-slim AS prod 

WORKDIR /app

COPY --from=builder /app/react-node /app

RUN npm i -g serve

EXPOSE 3000
CMD [ "serve", "-s", ".", "-p", "3000" ]