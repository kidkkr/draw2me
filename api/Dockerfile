# test-target

FROM node:14.15-slim as test-target
ENV NODE_ENV=development

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

WORKDIR /usr/src/app

COPY --from=build-target /usr/src/app/node_modules node_modules
COPY --from=build-target /usr/src/app/dist dist
COPY --from=build-target /usr/src/app/package.json package.json

EXPOSE 3001

CMD ["npm", "start"]