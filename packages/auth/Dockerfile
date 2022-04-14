FROM node:16-alpine

LABEL org.opencontainers.image.authors="deskbtm@outlook.com"

WORKDIR /opt/letscollab/service-auth

COPY ./dist ./dist

EXPOSE 23331

CMD [ "node", "dist/index.js" ]
