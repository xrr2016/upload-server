FROM node:lts-alpine

WORKDIR /upload-server

COPY . /upload-server

RUN npm install --registry=https://registry.npm.taobao.org && npm run tsc && npm prune --production

EXPOSE 7001

CMD [ "npm", "start" ]
