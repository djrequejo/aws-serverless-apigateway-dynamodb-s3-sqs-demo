const { execSync } = require('child_process');
const os = require('os');

const isWindows = os.platform() === 'win32';

if (isWindows) {
  console.log('Ejecutando generate-layer.ps1...');
  execSync('powershell -ExecutionPolicy Bypass -File .\\scripts\\generate-layer.ps1');
} else {
  console.log('Ejecutando generate-layer.sh...');
  execSync('./scripts/generate-layer.sh');
}
