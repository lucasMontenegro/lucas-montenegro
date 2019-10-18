# dynamically generate WebPack's entry file because create-react-app donesn't allow customization
case $1 in
  legacy)
    entry='app/index'
    ;;
  examples)
    entry='lib/examples'
    ;;
  server)
    entry='server/index'
    ;;
  ui)
    entry='ui/index'
    ;;
  *)
    echo "./scripts/build-entry-point.sh: Error invalid entry point parameter: $1"
    exit 1
    ;;
esac
echo "require('$entry')" > ./src/index.js