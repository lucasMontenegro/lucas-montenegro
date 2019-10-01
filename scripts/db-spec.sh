cd ./db-spec
chmod u+x ./connection.private.sh
. ./connection.private.sh # source connection data
dump () { # user password host dbname file
  pg_dump \
    -w --dbname="postgresql://$1:$2@$3/$4" -f $5 \
    -s -n public -O -x \
    -E utf8 --quote-all-identifiers
  # postgresql://[user[:password]@][netloc][:port][/dbname][?param1=value1&...]
}
dump $PG_USER_DEV $PG_PASSWORD_DEV $PG_HOST_DEV $PG_DATABASE_DEV ./dev-dump.private.sql &&
dump $PG_USER_PROD $PG_PASSWORD_PROD $PG_HOST_PROD $PG_DATABASE_PROD ./prod-dump.private.sql &&
jest -c jest.config.js "$(pwd)/start.js"