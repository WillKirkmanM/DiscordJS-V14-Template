if (Test-Path -Path "./node_modules") {
  node index.js
} else {
  echo "Dependencies Not Found, Installing..."
  npm install
  node index.js
}