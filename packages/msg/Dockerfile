FROM node:16-alpine

LABEL org.opencontainers.image.authors="deskbtm@outlook.com"

WORKDIR /opt/letscollab/msg

ARG RUNTIME_ENV

COPY ./dist ./dist
COPY ./public ./public
COPY ./package.json ./package.json
COPY ./.env.${RUNTIME_ENV:-production} ./

EXPOSE 23333

CMD [ "node", "dist/index.js" ]
