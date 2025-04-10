const fs = require('fs');
const path = require('path');

// Ensure build directory exists
const buildDir = path.join(__dirname, 'build');
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir);
}

// Copy necessary files to build directory
const filesToCopy = [
  'index.js',
  'config.js',
  'errors.js',
  'jupiterApi.js',
  'jitoService.js',
  'transactionUtils.js',
  'utils.js',
  'validation.js',
  'public'
];

filesToCopy.forEach(file => {
  const sourcePath = path.join(__dirname, file);
  const targetPath = path.join(buildDir, file);

  if (fs.existsSync(sourcePath)) {
    if (fs.lstatSync(sourcePath).isDirectory()) {
      fs.cpSync(sourcePath, targetPath, { recursive: true });
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
});

// Create a production-ready package.json
const packageJson = require('./package.json');
const prodPackageJson = {
  name: packageJson.name,
  version: packageJson.version,
  description: packageJson.description,
  main: packageJson.main,
  author: packageJson.author,
  license: packageJson.license,
  dependencies: packageJson.dependencies,
  engines: packageJson.engines
};

fs.writeFileSync(
  path.join(buildDir, 'package.json'),
  JSON.stringify(prodPackageJson, null, 2)
); 