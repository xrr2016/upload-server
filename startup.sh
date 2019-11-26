set -e

echo '拉取代码'

# git checkout dev

# git pull origin dev

echo '运行容器'

docker stop upload-server

docker build -t upload-server .

docker run -d -p 7001:7001 --rm --name=upload-server upload-server

exit
