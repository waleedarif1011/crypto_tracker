#!/usr/bin/env node

/**
 * Environment Validation Script
 * Validates environment configuration before deployment
 */

import { readFileSync, existsSync } from 'fs';
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

const logSuccess = (message) => {
  log(`✅ ${message}`, 'green');
};

const logError = (message) => {
  log(`❌ ${message}`, 'red');
};

const logWarning = (message) => {
  log(`⚠️  ${message}`, 'yellow');
};

// Load environment variables from .env files
const loadEnvFile = (filePath) => {
  if (!existsSync(filePath)) {
    return {};
  }

  const content = readFileSync(filePath, 'utf8');
  const env = {};

  content.split('\n').forEach(line => {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const [key, ...valueParts] = trimmedLine.split('=');
      if (key && valueParts.length > 0) {
        env[key.trim()] = valueParts.join('=').trim();
      }
    }
  });

  return env;
};

// Validate environment configuration
const validateEnvironment = (envName) => {
  log(`\n${colors.bold}🔍 Validating ${envName} environment...${colors.reset}`, 'blue');

  const envFile = resolve(`.env.${envName}`);
  const env = loadEnvFile(envFile);

  // Required environment variables
  const requiredVars = [
    'VITE_API_BASE_URL',
    'VITE_APP_NAME',
    'VITE_APP_VERSION'
  ];

  const missingVars = [];
  const invalidVars = [];

  // Check required variables
  for (const varName of requiredVars) {
    if (!env[varName]) {
      missingVars.push(varName);
    }
  }

  // Validate API URL
  if (env.VITE_API_BASE_URL) {
    try {
      new URL(env.VITE_API_BASE_URL);
    } catch {
      invalidVars.push('VITE_API_BASE_URL (must be a valid URL)');
    }
  }

  // Validate numeric values
  const numericVars = [
    'VITE_API_TIMEOUT',
    'VITE_API_RETRY_ATTEMPTS',
    'VITE_CACHE_DURATION'
  ];

  for (const varName of numericVars) {
    if (env[varName] && isNaN(parseInt(env[varName]))) {
      invalidVars.push(`${varName} (must be a number)`);
    }
  }

  // Validate boolean values
  const booleanVars = [
    'VITE_ENABLE_ANALYTICS',
    'VITE_ENABLE_ERROR_REPORTING',
    'VITE_ENABLE_DEBUG_MODE',
    'VITE_ENABLE_SERVICE_WORKER'
  ];

  for (const varName of booleanVars) {
    if (env[varName] && !['true', 'false'].includes(env[varName].toLowerCase())) {
      invalidVars.push(`${varName} (must be 'true' or 'false')`);
    }
  }

  // Report results
  if (missingVars.length > 0) {
    logError(`Missing required variables: ${missingVars.join(', ')}`);
  }

  if (invalidVars.length > 0) {
    logError(`Invalid variables: ${invalidVars.join(', ')}`);
  }

  if (missingVars.length === 0 && invalidVars.length === 0) {
    logSuccess(`${envName} environment validation passed`);
    return true;
  }

  return false;
};

// Environment-specific checks
const validateEnvironmentSpecific = (envName) => {
  const envFile = resolve(`.env.${envName}`);
  const env = loadEnvFile(envFile);

  log(`\n${colors.bold}🔧 Environment-specific checks for ${envName}...${colors.reset}`, 'blue');

  switch (envName) {
    case 'production':
      if (env.VITE_ENABLE_DEBUG_MODE === 'true') {
        logWarning('Debug mode is enabled in production');
      }
      
      if (env.VITE_ENABLE_ERROR_REPORTING !== 'true') {
        logWarning('Error reporting is disabled in production');
      }
      
      if (!env.VITE_SENTRY_DSN && env.VITE_ENABLE_ERROR_REPORTING === 'true') {
        logWarning('Error reporting is enabled but no Sentry DSN provided');
      }
      break;

    case 'staging':
      if (env.VITE_ENABLE_ANALYTICS !== 'true') {
        logWarning('Analytics is disabled in staging');
      }
      break;

    case 'development':
      if (env.VITE_ENABLE_ANALYTICS === 'true') {
        logWarning('Analytics is enabled in development');
      }
      break;
  }
};

// Main validation function
const main = () => {
  log(`${colors.bold}🔍 Environment Validation Script${colors.reset}`, 'blue');
  
  const environments = ['development', 'staging', 'production'];
  let allValid = true;

  for (const env of environments) {
    const isValid = validateEnvironment(env);
    if (isValid) {
      validateEnvironmentSpecific(env);
    } else {
      allValid = false;
    }
  }

  if (allValid) {
    log(`\n${colors.bold}🎉 All environment validations passed!${colors.reset}`, 'green');
    process.exit(0);
  } else {
    log(`\n${colors.bold}❌ Some environment validations failed!${colors.reset}`, 'red');
    process.exit(1);
  }
};

// Run validation
main();
