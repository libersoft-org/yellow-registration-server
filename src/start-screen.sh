#!/bin/sh

[ ! -d "./node_modules/" ] && bun i
screen -dmS yellow-registration-server bash -c '
while true; do
 bun yellow-registration-server.js || exit 1
done
'
