#!/bin/sh

CONFIG_DIR=. docker stack deploy -c ./docker-compose.yaml letscollab
