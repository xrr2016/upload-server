#!/usr/bin/env bash

set -e

echo '拉取代码'
git pull origin dev

echo '关闭容器'
# 关闭容器
docker-compose stop || true
# 删除容器
docker-compose down || true
# 构建镜像
docker-compose build
# 启动并后台运行
docker-compose up -d
# 查看日志
docker logs upload_server
# 对空间进行自动清理
docker system prune -a -f

exit
EOF
