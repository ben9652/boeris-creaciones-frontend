const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const environmentsDir = './src/environments';

const targetPathDev = path.join(environmentsDir, 'environment.ts');
const targetPathProd = path.join(environmentsDir, 'environment.prod.ts');

let envConfigFile = "export const environment = {";
let envConfigFileProd = "export const environment = {";

const envFilePath = path.join(__dirname, '.env');

const envFileContent = fs.readFileSync(envFilePath, { encoding: 'utf8' });

const envConfig = dotenv.parse(envFileContent);

for (const [key, value] of Object.entries(envConfig)) {
    envConfigFile += `
    ${key}: '${value}'
}`
    envConfigFileProd += `
    ${key}: '${value}'
}`
}

// Función para crear un directorio si es que no existe
function createDirectoryIfNotExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory ${dir}`);
  } else {
    console.log(`Directory ${dir} already exists`);
  }
}

// Función para crear el archivo environment si es que no existe
function createEnvFile(path, content) {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, content, { encoding: 'utf8' });
    console.log(`Created ${path}`);
  } else {
    console.log(`${path} already exists`);
  }
}

// Crear el directorio de entornos si no existe
createDirectoryIfNotExists(environmentsDir);

// Crear los archivos de entorno si no existen
createEnvFile(targetPathDev, envConfigFile);
createEnvFile(targetPathProd, envConfigFileProd);

// Sobrescribir los archivos de entorno con las variables de entorno actuales
fs.writeFileSync(targetPathDev, envConfigFile, { encoding: 'utf8' });
fs.writeFileSync(targetPathProd, envConfigFileProd, { encoding: 'utf8' });

console.log(`Environment variables written to ${targetPathDev} and ${targetPathProd}`);
