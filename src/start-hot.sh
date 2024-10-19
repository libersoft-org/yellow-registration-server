#!/bin/sh

[ ! -d "./node_modules/" ] && bun i
bun --watch yellow-registration-server.js
