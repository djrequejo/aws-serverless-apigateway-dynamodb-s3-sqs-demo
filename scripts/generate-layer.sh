#!/bin/bash

echo "Step 1: Removing 'node_modules' folder if exists..."
rm -rf node_modules

echo "Step 2: Removing 'layers' folder if exists..."
rm -rf layers

echo "Step 3: Removing 'package-lock.json' files if exists..."
rm -f package-lock.json

echo "Step 4: Executing 'npm install --production --arch=x64 --platform=linux --target=18x sharp'..."
npm install --production --arch=x64 --platform=linux sharp

echo "Step 5: Creating 'nodejs' folder..."
mkdir layers/nodejs

echo "Step 6: Copying 'node_modules' folder to 'nodejs'..."
cp -r node_modules layers/nodejs/

echo "Step 7: Compressing 'nodejs' folder as 'nodejs.zip'..."
zip -r nodejs.zip layers/nodejs

echo "Step 8: Removing 'nodejs' folder..."
rm -rf layers/nodejs

echo "Step 9: Executing 'npm install'..."
npm install
