#!/usr/bin/env bash
case $1 in
  create-dump) # npm run db-example -- create-dump <db name> <dump filename>
    sudo -u postgres   pg_dump   --no-owner -n public -O -x   -F t $2 > $3
    ;;
  teardown) # npm run db-example -- teardown <db name>
    sudo -u postgres   dropdb -U postgres $2
    ;;
  setup) # npm run db-example -- setup <dump filename>
    sudo -u postgres   pg_restore -d postgres -U postgres --create $2
esac