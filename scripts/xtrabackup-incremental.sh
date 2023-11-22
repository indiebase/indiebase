#!/bin/sh

set -e

BACKUP_DIR=~/backup/incremental
LATEST_FILE=~/backuplatest
LATEST=$(cat $LATEST_FILE)
NOW=$(date "+%F_%H-%M-%S")
NETWORK=indiebase_default
TARGET_NAME=indiebase_mysql
IMAGE=mysql:8.0.32
PASSWORD=indiebase

if [!-f "$BACKUP_DIR"]; then
  mkdir -p $BACKUP_DIR
fi

full_backup() {
  docker run --rm --network $NETWORK -v $BACKUP_DIR/$NOW:/backup \
    --name percona-xtrabackup --volumes-from $(docker ps -q -f name="$TARGET_NAME" -f ancestor="$IMAGE") \
    percona/percona-xtrabackup:8.0 \
    xtrabackup --backup --compress=LZ4 --datadir=/var/lib/mysql/ --target-dir=/backup --user=root --password=$PASSWORD -H mysql -P 3306
  echo $NOW >$LATEST_FILE
}

incremental_backup() {
  docker run --rm --network $NETWORK \
    -v $BACKUP_DIR/$NOW:/backup \
    -v $BACKUP_DIR/$LATEST:/incremental-basedir \
    --name percona-xtrabackup --volumes-from $(docker ps -q -f name="$TARGET_NAME" -f ancestor="$IMAGE") \
    percona/percona-xtrabackup:8.0 \
    xtrabackup --backup --compress=LZ4 --incremental-basedir=/incremental-basedir --datadir=/var/lib/mysql/ --target-dir=/backup --user=root --password=$PASSWORD -H mysql -P 3306
  echo $NOW >$LATEST_FILE
}

show_usage() {
  cat <<'HELP_EOF'
xtrabakup-incremental.sh is a script to incremental backup indiebase mysql database.
The backup output folder is `~/backup`.
Usage:
  .sh [command_options]
Available command_options:
  [ -n  | --init ]             Init xtrabackup full backup. 


HELP_EOF
}

while ( ($# >0)); do
  case "$1" in
  -n | --init)
    show_usage
    full_backup
    ;;
  *)
    echo "[!] Got unknown option '$1'" 1>&2
    ;;
  esac
  shift 1
done

show_usage
incremental_backup
