#!/bin/bash

echo "Step 1: Removing 'node_modules' folder if exists..."
rm -rf node_modules

echo "Step 2: Removing 'nodejs' folder if exists..."
rm -rf app/nodejs

echo "Step 3: Removing 'package-lock.json' and 'nodejs.zip' files if exists..."
rm -f package-lock.json app/nodejs.zip

echo "Step 4: Executing 'npm install --only=prod --arch=x64 --platform=linux --target=18x sharp'..."
npm install --only=prod --arch=x64 --platform=linux sharp

echo "Step 5: Creating 'nodejs' folder..."
mkdir app/nodejs

echo "Step 6: Copying 'node_modules' folder to 'nodejs'..."
cp -r node_modules app/nodejs/

echo "Step 7: Compressing 'nodejs' folder as 'nodejs.zip'..."
zip -r nodejs.zip app/nodejs

echo "Step 8: Removing 'nodejs' folder..."
rm -rf app/nodejs

echo "Step 9: Executing 'npm install'..."
npm install
