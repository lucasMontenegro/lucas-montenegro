#!/usr/bin/env bash
# chmod u+x scripts.sh connection.private.sh scripts.sh
case $1 in
  create-db-dump)
    npm run db-example -- create-dump lib__node__postgres "$(pwd)/dump.tar"
    ;;
  db-setup)
    npm run db-example -- setup "$(pwd)/dump.tar"
    ;;
  db-teardown)
    npm run db-example -- teardown lib__node__postgres
    ;;
  example)
    source ./connection.private.sh && \
      npm run node-example -- lib/node/postgres
    ;;
esac