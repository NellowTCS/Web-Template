#!/bin/bash
set -e

echo "Building project"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"         # project root
BUILD_DIR="$ROOT_DIR/Build"                         # e.g., Build/
PUBLIC_DIR="$ROOT_DIR/Build/public"                 # Files such as the main index.html, manifest, etc.
DIST_DIR="$BUILD_DIR/dist"                          # final output

cd "$BUILD_DIR"

npm install
vite build
cd dist
cp -a public/index.html index.html
rm -rf public/
cd ..

echo "Copying extra files..."
cp "$PUBLIC_DIR/favicon.png" "$DIST_DIR/"
cp "$PUBLIC_DIR/manifest.json" "$DIST_DIR/"
cp "$PUBLIC_DIR/service-worker.js" "$DIST_DIR/"

echo "Build completed."
