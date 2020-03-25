#!/usr/bin/env bash
# chmod u+x helpers.sh service-config.private.sh client-config.private.sh
case $1 in
  create-db-dump)
    npm run db-example -- create-dump lib__profiles__http_service "$(pwd)/dump.tar"
    ;;
  db-setup)
    npm run db-example -- setup "$(pwd)/dump.tar"
    ;;
  db-teardown)
    npm run db-example -- teardown lib__profiles__http_service
    ;;
  run-service)
    source ./service-config.private.sh && \
      npm run node-example -- lib/profiles/httpService/example/service
    ;;
  run-client)
    source ./client-config.private.sh && npm run cra -- examples
    ;;
esac