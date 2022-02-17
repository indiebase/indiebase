`docker-compose ` 在 `config`中

### 环境搭建

#### portainer

- `cd ./config/portainer`
- `docker stack deploy -c ./docker-compose.yaml portainer`

Ports: `13331:9443`

#### minio

`docker stack deploy -c ./docker-compose.yaml minio`

Ports: `13337:9000`,

Console Ports: `13338:9001`

#### apisix

`docker stack deploy -c ./docker-compose.yaml apisix`

Apisix Ports: `13320:9080`,`13321:9091`,`13322:9443`,`13323:9092`

Apisix Dashboard Posts: `13336:9000`

#### nacos

`docker stack deploy -c ./docker-compose.yaml nacos`

Ports: `13324:8848`,`13325:9848`,`13326:9555`

#### prometheus

Ports: `13334:9090`

#### grafana

Ports: `13335:3000`

### 应用
