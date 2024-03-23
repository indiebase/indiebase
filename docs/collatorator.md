## Prepare development environment.

Docker

- `docker stack deploy -c docker-compose.yaml indiebase  --with-registry-auth`

Https for local.

- Install [mkcert](https://github.com/FiloSottile/mkcert)
- Install root CA `mkcert -install`
- Set hosts

```shell
127.0.0.1 indiebase-dev.deskbtm.com
127.0.0.1 *.indiebase-dev.deskbtm.com
```

Development account

username: `dev@indiebase.com`
password: `dev@indiebase.com`

### Services

Redis

- indiebase-dev.deskbtm.com:6379 127.0.0.1:6379

Postgres

- indiebase-dev.deskbtm.com:5432 127.0.0.1:5432

Traefik

- Dashboard https://indiebase-dev.deskbtm.com:20801/dashboard https://127.0.0.1:20801

### Optional

Portainer

- Dashboard https://indiebase-dev.deskbtm.com:19443

```shell
cd docker/portainer
docker stack deploy -c docker-compose.yaml indiebase
```
