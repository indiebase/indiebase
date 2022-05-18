FROM node:16-alpine

LABEL org.opencontainers.image.authors="deskbtm@outlook.com"

ARG RUNTIME_ENV

ENV NODE_ENV=$RUNTIME_ENV

WORKDIR /opt/letscollab/msg

ADD ./dist ./dist
ADD ./public ./public
ADD ./package.json ./package.json
ADD ./.env.${RUNTIME_ENV:-production} ./

EXPOSE 23333

CMD [ "node", "dist/index.js" ]
