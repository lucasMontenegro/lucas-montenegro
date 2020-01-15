echo "require('$1/example')" > ./src/index.js &&
webpack --config webpack.config.js &&
./scripts/start.sh