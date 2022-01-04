FROM node:16-alpine

LABEL org.opencontainers.image.authors="deskbtm@outlook.com"


WORKDIR /opt/letscollab/auth-service

COPY package.json ./
COPY pnpm-lock yaml ./

RUN npm i pnpm -g
RUN pnpm i --lockfile-only

COPY ./dist ./dist
COPY ./bootstrap.js ./

EXPOSE 10888

CMD [ "npm", "start" ]
