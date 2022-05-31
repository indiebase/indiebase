FROM node:16-alpine

LABEL org.opencontainers.image.authors="deskbtm@outlook.com"

WORKDIR /opt/letscollab/service-user

ENV NODE_ENV=${ENV:-prodction}

COPY ./dist ./dsit
COPY ./i18n ./i18n
COPY ./package.json ./package.json
COPY ./env.${ENV:-prodction} ./

EXPOSE 23332

CMD [ "node", "index.js" ]
