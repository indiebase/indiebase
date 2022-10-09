FROM node:16-alpine

LABEL org.opencontainers.image.authors="deskbtm@outlook.com"

ARG RUNTIME_ENV

ENV NODE_ENV=$RUNTIME_ENV

WORKDIR /opt/letscollab/user

COPY ./dist ./dsit
COPY ./i18n ./i18n
COPY ./package.json ./package.json
COPY ./.env.${RUNTIME_ENV:-prodction} ./

EXPOSE 23332

CMD [ "node", "dist/index.js" ]
