FROM node:25-alpine3.23 AS dev 
WORKDIR /app
COPY ./package*.json .
RUN npm i
CMD [ "npm", "run", "dev", "--", "--host" ]

FROM node:25.6-alpine AS builder
WORKDIR /app
COPY ./package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --omit=dev

FROM node:25.6-alpine AS prod
WORKDIR /app
COPY --from=builder /app/react-node ./
RUN npm i -g serve
EXPOSE 3000
CMD [ "serve", "-s", ".", "-p", "3000" ]