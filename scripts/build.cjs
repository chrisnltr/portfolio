const { spawn } = require('child_process');
const { join } = require('path');
const { existsSync } = require('fs');

const projectRoot = process.cwd();
const nuxtMjsPath = join(projectRoot, 'node_modules', 'nuxt', 'bin', 'nuxt.mjs');

let buildCommand;
let buildArgs;

if (existsSync(nuxtMjsPath)) {
  buildCommand = 'node';
  buildArgs = [nuxtMjsPath, 'build'];
} else {
  buildCommand = 'npx';
  buildArgs = ['--yes', 'nuxt', 'build'];
}

const buildProcess = spawn(buildCommand, buildArgs, {
  cwd: projectRoot,
  stdio: 'inherit',
  shell: false
});

buildProcess.on('error', (error) => {
  console.error('Build error:', error);
  process.exit(1);
});

buildProcess.on('close', (code) => {
  process.exit(code || 0);
});

