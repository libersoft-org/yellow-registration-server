#!/bin/sh

[ ! -d "./node_modules/" ] && bun i
screen -dmS yellow-registration-server bun --watch yellow-registration-server.js
