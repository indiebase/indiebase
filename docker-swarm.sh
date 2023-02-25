#!/bin/sh

CONFIG_DIR=./self_hosting docker stack deploy -c ./docker-compose.yaml letscollab
