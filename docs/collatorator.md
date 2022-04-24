`docker-compose ` 在 `config`中

### 环境搭建

#### portainer

Port: `13331:9443`

- `cd ./config/portainer`
- `docker stack deploy -c ./docker-compose.yaml portainer`

<!-- #### minio

Port: `13337:9000`,

Console Port: `13338:9001`

`docker stack deploy -c ./docker-compose.yaml minio` -->

#### apisix

Apisix Ports: `13320:9080`,`13321:9091`,`13322:9443`,`13323:9092`

Apisix Dashboard Posts: `13336:9000`

`docker stack deploy -c ./docker-compose.yaml apisix`

#### nacos

Ports: `13324:8848`,`13325:9848`,`13326:9555`

`docker stack deploy -c ./docker-compose.yaml nacos`

#### prometheus

Port: `13334:9090`

#### grafana

Port: `13335:3000`

#### loki

安装驱动

`docker plugin install grafana/loki-docker-driver:latest --alias loki --grant-all-permissions`

Port: `13339:3100`

### 应用

Ports Range `23330~23350`

#### @letscollab/service-auth

#### @letscollab/service-user
