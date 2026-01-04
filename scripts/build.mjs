#!/usr/bin/env node
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

console.log('Starting Nuxt build...');
console.log('Project root:', projectRoot);

// Try different methods to run the build
const nuxtMjsPath = join(projectRoot, 'node_modules', 'nuxt', 'bin', 'nuxt.mjs');
const nuxtBinPath = join(projectRoot, 'node_modules', '.bin', 'nuxt');

let buildCommand;
let buildArgs;

if (existsSync(nuxtMjsPath)) {
  console.log('Using nuxt.mjs directly');
  buildCommand = 'node';
  buildArgs = [nuxtMjsPath, 'build'];
} else if (existsSync(nuxtBinPath)) {
  console.log('Using .bin/nuxt');
  buildCommand = 'node';
  buildArgs = [nuxtBinPath, 'build'];
} else {
  console.log('Falling back to npx');
  buildCommand = 'npx';
  buildArgs = ['--yes', 'nuxt', 'build'];
}

console.log('Running:', buildCommand, buildArgs.join(' '));

const buildProcess = spawn(buildCommand, buildArgs, {
  cwd: projectRoot,
  stdio: 'inherit',
  shell: false,
  env: {
    ...process.env,
    NODE_ENV: 'production'
  }
});

buildProcess.on('error', (error) => {
  console.error('Build error:', error);
  process.exit(1);
});

buildProcess.on('close', (code) => {
  if (code !== 0) {
    console.error(`Build process exited with code ${code}`);
    process.exit(code);
  }
  console.log('Build completed successfully');
});

