#!/bin/sh

BACKUP_DIR=~/backup/full
LATEST_FILE=~/backuplatest
NOW=$(date "+%F_%H-%M-%S")

if [!-f "$BACKUP_DIR"]; then
  mkdir -p $BACKUP_DIR
fi

full_backup() {
  docker run --rm --network letscollab_default -v $BACKUP_DIR/$NOW:/backup \
    --name percona-xtrabackup --volumes-from $(docker ps -q -f name=letscollab_mysql -f ancestor=nacos/nacos-mysql:8.0.16) \
    percona/percona-xtrabackup:8.0 \
    xtrabackup --backup --compress=LZ4 --datadir=/var/lib/mysql/ --target-dir=/backup --user=root --password=letscollab -H mysql -P 3306
  echo $NOW >$LATEST_FILE
}

full_backup
