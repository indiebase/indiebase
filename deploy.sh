#!/bin/sh

CONFIG_DIR=./self_hosted docker stack deploy -c ./docker-compose.yaml letscollab
