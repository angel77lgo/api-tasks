FROM node:14.15.4-alpine3.12

RUN mkdir /app

WORKDIR /app

COPY . .

RUN npm install -g typescript
RUN npm install
RUN tsc

ENTRYPOINT ["node","build/index.js"]
