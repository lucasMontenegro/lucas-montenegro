if test -z $1; then
  entry=legacy
else
  entry=$1
fi
./scripts/build-entry-point.sh $entry &&
react-scripts start