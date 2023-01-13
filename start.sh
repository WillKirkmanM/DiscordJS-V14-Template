#!/bin/bash
if [ -d "./node_modules/" ]; then
  node index.js
fi

if [ ! -d "./node_modules/"  ]; then
  echo "Dependencies Not Found, Installing..."
  npm install
  node index.js
fi 
