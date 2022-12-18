#!/bin/bash
if [ -d "./node_modules/" ]; then
  node index.js
  exit 1 
fi

if [ ! -d "./node_modules/"  ]; then
  echo "Dependencies Not Found, Installing..."
  npm install
  node index.js
fi 
