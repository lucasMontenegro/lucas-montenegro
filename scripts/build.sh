printf '\n> ./scripts/build-server.sh\n' &&
./scripts/build-server.sh &&
printf '\n\n> react-scripts build\n' &&
./scripts/build-entry-point.sh ui &&
react-scripts build