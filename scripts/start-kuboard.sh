#!/usr/bin/env bash

# set +e
# docker kill $(docker container ls -f "name=kuboard" -q) && docker rm $(docker container ls -a -f "name=kuboard" -q)
# set -e

IP=$(microk8s kubectl get node -o json | jq '.items[].status.addresses[] | select(.type=="InternalIP") | .address' | xargs)

echo $IP

docker run -d \
  --restart=unless-stopped \
  --name=kuboard \
  -p 10088:80/tcp \
  -p 10081:10081/tcp \
  -e KUBOARD_ENDPOINT="http://$IP:10088" \
  -e KUBOARD_AGENT_SERVER_TCP_PORT="10081" \
  -v /root/kuboard-data:/data \
  swr.cn-east-2.myhuaweicloud.com/kuboard/kuboard:v3

# sudo docker run -d \
#   --restart=unless-stopped \
#   --name=kuboard-spray \
#   -p 10089:80/tcp \
#   -v /var/run/docker.sock:/var/run/docker.sock \
#   -v ~/kuboard-spray-data:/data \
#   swr.cn-east-2.myhuaweicloud.com/kuboard/kuboard-spray:latest-amd64
