. ./scripts/node-path.sh
export BUILD_PATH="$(cd ./cra-ui/build && pwd)"
node start.js $@