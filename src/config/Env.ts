import dotenv from 'dotenv';

dotenv.config();

function optional(name: string, defaultValue: string): string {
  return process.env[name] ?? defaultValue;
}

export const ENV = {
  BASE_URL: optional('BASE_URL', 'https://automationexercise.com'),
  API_BASE_URL: optional('API_BASE_URL', 'https://automationexercise.com/api'),
  USERNAME: optional('TEST_USERNAME', 'defaultuser@gmail.com'),
  PASSWORD: optional('TEST_PASSWORD', 'defaultpassword'),
  DEFAULT_TIMEOUT: Number(optional('DEFAULT_TIMEOUT', '30000')),
  HEADLESS: optional('HEADLESS', 'true') === 'true',
  LOG_LEVEL: optional('LOG_LEVEL', 'info') as 'error' | 'warn' | 'info' | 'debug',
  CI: optional('CI', 'false') === 'true',
};

export type Env = typeof ENV;
