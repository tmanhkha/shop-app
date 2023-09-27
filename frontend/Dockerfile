FROM node:16-alpine

WORKDIR /shop-app/frontend

COPY package.json .
RUN yarn install

COPY . .

EXPOSE 8080
CMD ["yarn", "dev"]
