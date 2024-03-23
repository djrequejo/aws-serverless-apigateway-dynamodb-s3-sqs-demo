Write-Host "Step 1: Removing 'node_modules' folder if exists..."
Remove-Item -Path ".\node_modules" -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "Step 2: Removing 'nodejs' folder if exists..."
Remove-Item -Path ".\app\nodejs" -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "Step 3: Removing 'package-lock.json' and 'nodejs.zip' files if exists..."
Remove-Item -Path ".\package-lock.json" -Force -ErrorAction SilentlyContinue
Remove-Item -Path ".\app\nodejs.zip" -Force -ErrorAction SilentlyContinue

Write-Host "Step 4: Executing 'npm install --only=prod --arch=x64 --platform=linux --target=18x sharp'..."
npm install --only=prod --arch=x64 --platform=linux --target=18x sharp

Write-Host "Step 5: Creating 'nodejs' folder..."
New-Item -ItemType Directory -Path ".\app\nodejs" | Out-Null

Write-Host "Step 6: Copying 'node_modules' folder to 'nodejs'..."
Copy-Item -Path ".\node_modules" -Destination ".\app\nodejs" -Recurse -Force

Write-Host "Step 7: Compressing 'nodejs' folder as 'nodejs.zip'..."
Compress-Archive -Path ".\app\nodejs" -DestinationPath ".\app\nodejs.zip"

Write-Host "Step 8: Removing 'nodejs' folder..."
Remove-Item -Path ".\nodejs" -Recurse -Force

Write-Host "Step 9: Executing 'npm install'..."
npm install
