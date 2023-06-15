FROM node:16-alpine

LABEL org.opencontainers.image.authors="deskbtm@outlook.com"

ARG RUNTIME_ENV

ENV NODE_ENV=$RUNTIME_ENV

WORKDIR /opt/indiebase-community

COPY ./dist ./dist
COPY ./model ./model
COPY ./package.json ./package.json
COPY ./.env.${RUNTIME_ENV:-production} ./

EXPOSE 23331

CMD [ "node", "dist/index.js" ]
