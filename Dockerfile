# test-target

FROM node:14.15-slim as test-target
ENV NODE_ENV=development
ENV PATH $PATH:/usr/src/app/node_modules/.bin

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm ci

COPY . .


# build-target

FROM test-target as build-target
ENV NODE_ENV=production

RUN npm run build
RUN npm prune --production


# archive-target

FROM node:14.15-slim as archive-target
ENV NODE_ENV=production
ENV PATH $PATH:/usr/src/app/node_modules/.bin

WORKDIR /usr/src/app

COPY --from=build-target /usr/src/app/node_modules node_modules
COPY --from=build-target /usr/src/app/build .

EXPOSE $PORT
EXPOSE $POST_WS

CMD ["node", "server.js"]
