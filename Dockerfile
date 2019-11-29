FROM node:lts-alpine

# 设置时区
RUN apk --update add tzdata \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
    && apk del tzdata

WORKDIR /upload-server

COPY package.json /upload-server/package.json

RUN npm install --registry=https://registry.npm.taobao.org && npm run tsc && npm prune --production

COPY . /upload-server

EXPOSE 7001

CMD npm start
