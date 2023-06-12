#!/bin/sh

env CONFIG_DIR=. docker stack deploy -c ./docker-compose.yaml indiebase
