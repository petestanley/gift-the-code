# Defines the production environment for our application

FROM node:8-alpine

ENV HOME=/app
WORKDIR /app
RUN set -ex && \
    adduser node root && \
    chmod g+w /app && \
    apk add --update --no-cache \
      g++ make python \
      openjdk8-jre

RUN set -ex && \
    npm cache clean --force
COPY ./ /app/

RUN set -ex && \
    chmod -R g=u /app/.config && \
    apk del g++ make python

USER node
EXPOSE 4000
ENTRYPOINT ["npm"]
CMD ["start"]
