## Prepare development environment.

1. Docker

- `docker stack deploy -c docker-compose.yaml indiebase  --with-registry-auth`

2. Https for local.

- Install [mkcert](https://github.com/FiloSottile/mkcert)
- Install root CA `mkcert -install`
- Set hosts

```shell
0.0.0.0 indiebase-dev.deskbtm.com
0.0.0.0 *.indiebase-dev.deskbtm.com
```

### Optional

1. Portainer
   - Dashboard port: `19443`

```shell
cd docker/portainer
docker stack deploy -c docker-compose.yaml indiebase
```
