FROM node:5

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

EXPOSE 8080

ENV PORT 8080
CMD [ "npm", "run", "dev" ]
