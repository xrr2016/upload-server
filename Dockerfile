FROM node:lts-alpine

# 设置时区
RUN apk --update add tzdata \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
    && apk del tzdata

WORKDIR /upload-server

COPY package*.json /upload-server

RUN npm install --registry=https://registry.npm.taobao.org

COPY . /upload-server

RUN npm run tsc && npm prune --production

EXPOSE 7001

CMD npm start
