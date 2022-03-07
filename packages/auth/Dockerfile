FROM node:16-alpine

LABEL org.opencontainers.image.authors="deskbtm@outlook.com"


WORKDIR /opt/letscollab/service/auth

COPY package.json ./
COPY pnpm-lock yaml ./


RUN npm ci

COPY ./dist ./dist
COPY ./bootstrap.js ./

EXPOSE 10888

CMD [ "npm", "start" ]
