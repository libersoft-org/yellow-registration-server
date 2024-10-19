#!/bin/sh

[ ! -d "./node_modules/" ] && bun i
bun yellow-registration-server.js $1
