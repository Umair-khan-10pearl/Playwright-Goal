import winston from 'winston';
import type { APIResponse } from '@playwright/test';
import { ENV } from '../config/Env';

const SENSITIVE_KEYS = ['password', 'token', 'authorization', 'secret'];

/** Masks top-level keys that look sensitive so secrets never reach log files. */
function redact(payload?: Record<string, unknown>): Record<string, unknown> | undefined {
  if (!payload) return payload;
  const masked = { ...payload };
  for (const key of Object.keys(masked)) {
    if (SENSITIVE_KEYS.some((sensitive) => key.toLowerCase().includes(sensitive))) {
      masked[key] = '***REDACTED***';
    }
  }
  return masked;
}

export const logger = winston.createLogger({
  level: ENV.LOG_LEVEL,
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'test-results/automation.log' }),
  ],
});

export function logApiRequest(method: string, url: string, payload?: Record<string, unknown>): void {
  logger.info(`API REQUEST -> ${method} ${url}`, redact(payload));
}

export async function logApiResponse(method: string, url: string, response: APIResponse): Promise<void> {
  const body = await response.json().catch(() => response.text().catch(() => '<unreadable body>'));
  logger.info(`API RESPONSE <- ${method} ${url} [${response.status()}]`, { body });
}

export function logUiAction(action: string, details?: Record<string, unknown>): void {
  logger.info(`UI ACTION -> ${action}`, details);
}
