#!/bin/bash

set -e

IMAGE_NAME="upload-server"
CONTAINER_NAME="upload-server"

#echo '拉取代码'

# git checkout dev

# git pull origin dev

echo '运行容器'

docker rm -f ${CONTAINER_NAME} || true

docker build -t ${IMAGE_NAME} .

docker run -d -p 7001:7001 --name=${CONTAINER_NAME} ${IMAGE_NAME}

exit
EOF
