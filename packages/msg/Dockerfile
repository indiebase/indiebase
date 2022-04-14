FROM node:16-alpine

LABEL org.opencontainers.image.authors="deskbtm@outlook.com"

WORKDIR /opt/letscollab/service-msg

COPY ./dist ./dist
COPY ./public ./public
COPY ./package.json ./package.json
COPY ./env.${ENV:-prodction} ./

EXPOSE 23333

CMD [ "node", "dist/index.js" ]
