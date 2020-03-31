#!/usr/bin/env bash
case $1 in
  export) # npm run auth0 -- export
    a0deploy export -c ./auth0/deploy-cli.private.json -f yaml -o ./auth0
    ;;
esac