echo "require('$1')" > ./src/index.js &&
webpack --config webpack.config.js &&
./scripts/start.sh