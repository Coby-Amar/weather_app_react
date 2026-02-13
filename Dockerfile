FROM node:24-slim AS dev 

WORKDIR /app

COPY ./package*.json .

RUN npm i

CMD [ "npm", "run", "dev", "--", "--host" ]

# docker build . -t cobyamar/weather_app_react:1.0.0 --build-arg VITE_GOOGLE_API_KEY=$VITE_GOOGLE_API_KEY --build-arg VITE_BASE_URL=$VITE_BASE_URL --push

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