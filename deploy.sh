#!/bin/bash

set -e

CONTAINER_NAME="upload-server"
CONTAINER_IMAGE="upload-server"

#echo '拉取代码'

# git checkout dev

# git pull origin dev

echo '运行容器'

docker rm -f ${CONTAINER_NAME} || true

docker build -t ${CONTAINER_NAME} .

docker run -d -p 7001:7001 --rm --name=${CONTAINER_NAME} ${CONTAINER_IMAGE}

exit
EOF
