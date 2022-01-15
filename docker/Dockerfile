FROM node:16.13-slim

WORKDIR /usr/src/app
COPY ./docker .
RUN npm i --only=production
RUN mkdir ./node_modules/nuxt-cision-block
COPY ./lib ./node_modules/nuxt-cision-block/lib
COPY ./package*.json ./node_modules/nuxt-cision-block/.
RUN npm run build

ARG NUXT_PORT

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=$NUXT_PORT

EXPOSE $NUXT_PORT

CMD ["npm", "run", "start"]
