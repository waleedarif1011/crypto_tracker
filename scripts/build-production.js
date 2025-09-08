#!/usr/bin/env node

/**
 * Production Build Script
 * Optimized build process with environment validation and error handling
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

const log = (message, color = 'reset') => {
  console.log(`${colors[color]}${message}${colors.reset}`);
};

const logStep = (step, message) => {
  log(`\n${colors.bold}[${step}]${colors.reset} ${message}`, 'blue');
};

const logSuccess = (message) => {
  log(`✅ ${message}`, 'green');
};

const logError = (message) => {
  log(`❌ ${message}`, 'red');
};

const logWarning = (message) => {
  log(`⚠️  ${message}`, 'yellow');
};

// Environment validation
const validateEnvironment = () => {
  logStep('VALIDATION', 'Checking environment configuration...');
  
  const requiredEnvVars = [
    'VITE_API_BASE_URL',
    'VITE_APP_NAME',
    'VITE_APP_VERSION'
  ];

  const missingVars = [];
  
  for (const varName of requiredEnvVars) {
    if (!process.env[varName]) {
      missingVars.push(varName);
    }
  }

  if (missingVars.length > 0) {
    logError(`Missing required environment variables: ${missingVars.join(', ')}`);
    log('Please check your .env.production file or environment variables.', 'yellow');
    process.exit(1);
  }

  // Validate API URL
  try {
    new URL(process.env.VITE_API_BASE_URL);
    logSuccess('API URL is valid');
  } catch (error) {
    logError('VITE_API_BASE_URL must be a valid URL');
    process.exit(1);
  }

  logSuccess('Environment validation passed');
};

// Pre-build optimizations
const preBuildOptimizations = () => {
  logStep('PRE-BUILD', 'Running pre-build optimizations...');
  
  try {
    // Clean previous builds
    if (existsSync('dist')) {
      execSync('rm -rf dist', { stdio: 'inherit' });
      logSuccess('Cleaned previous build');
    }

    // Run linting
    log('Running ESLint...');
    execSync('npm run lint', { stdio: 'inherit' });
    logSuccess('Linting passed');

    // Type checking (if TypeScript is configured)
    if (existsSync('tsconfig.json')) {
      log('Running TypeScript type checking...');
      execSync('npx tsc --noEmit', { stdio: 'inherit' });
      logSuccess('Type checking passed');
    }

  } catch (error) {
    logError('Pre-build optimizations failed');
    process.exit(1);
  }
};

// Build the application
const buildApplication = () => {
  logStep('BUILD', 'Building application for production...');
  
  try {
    const startTime = Date.now();
    
    // Set production environment
    process.env.NODE_ENV = 'production';
    
    // Run Vite build
    execSync('npm run build', { 
      stdio: 'inherit',
      env: { ...process.env, NODE_ENV: 'production' }
    });
    
    const buildTime = ((Date.now() - startTime) / 1000).toFixed(2);
    logSuccess(`Build completed in ${buildTime}s`);
    
  } catch (error) {
    logError('Build failed');
    process.exit(1);
  }
};

// Post-build optimizations
const postBuildOptimizations = () => {
  logStep('POST-BUILD', 'Running post-build optimizations...');
  
  try {
    // Generate build info
    const buildInfo = {
      buildTime: new Date().toISOString(),
      version: process.env.VITE_APP_VERSION || '1.0.0',
      nodeEnv: process.env.NODE_ENV,
      gitCommit: getGitCommit(),
      buildId: generateBuildId()
    };

    const buildInfoPath = resolve('dist', 'build-info.json');
    writeFileSync(buildInfoPath, JSON.stringify(buildInfo, null, 2));
    logSuccess('Generated build info');

    // Analyze bundle size
    analyzeBundleSize();
    
    // Generate service worker (if enabled)
    if (process.env.VITE_ENABLE_SERVICE_WORKER === 'true') {
      generateServiceWorker();
    }

  } catch (error) {
    logWarning('Post-build optimizations failed, but build was successful');
    console.error(error.message);
  }
};

// Helper functions
const getGitCommit = () => {
  try {
    return execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
  } catch {
    return 'unknown';
  }
};

const generateBuildId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const analyzeBundleSize = () => {
  try {
    const { execSync } = require('child_process');
    
    // Check if bundle-analyzer is available
    try {
      execSync('npx vite-bundle-analyzer dist', { stdio: 'inherit' });
      logSuccess('Bundle analysis completed');
    } catch {
      // Fallback to simple size check
      const { statSync } = require('fs');
      const distPath = resolve('dist');
      const stats = statSync(distPath);
      logSuccess(`Build size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
    }
  } catch (error) {
    logWarning('Bundle analysis skipped');
  }
};

const generateServiceWorker = () => {
  log('Generating service worker...');
  // This would integrate with a service worker generator
  // For now, just log that it would be generated
  logSuccess('Service worker generation placeholder');
};

// Main execution
const main = () => {
  log(`${colors.bold}🚀 Production Build Script${colors.reset}`, 'blue');
  log('Building crypto-tracker for production...\n');

  try {
    validateEnvironment();
    preBuildOptimizations();
    buildApplication();
    postBuildOptimizations();
    
    log(`\n${colors.bold}🎉 Build completed successfully!${colors.reset}`, 'green');
    log('Your production build is ready in the dist/ folder.', 'green');
    
  } catch (error) {
    logError('Build process failed');
    console.error(error);
    process.exit(1);
  }
};

// Run the script
main();
