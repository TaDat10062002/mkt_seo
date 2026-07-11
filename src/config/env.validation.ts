export function validateEnv(config: Record<string, unknown>) {
  const nodeEnv = String(config.NODE_ENV ?? 'development');
  if (!['development', 'test', 'production'].includes(nodeEnv)) {
    throw new Error('NODE_ENV must be development, test, or production');
  }

  const port = Number(config.PORT ?? 3000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be a valid TCP port');
  }

  const mongodbUri = String(config.MONGODB_URI ?? '').trim();
  if (!mongodbUri) throw new Error('MONGODB_URI is required');
  if (!/^mongodb(\+srv)?:\/\//.test(mongodbUri)) {
    throw new Error('MONGODB_URI must be a valid MongoDB connection string');
  }
  const authority = mongodbUri.slice(mongodbUri.indexOf('://') + 3).split('/', 1)[0];
  if ((authority.match(/@/g) ?? []).length > 1) {
    throw new Error('MONGODB_URI credentials contain an unescaped @; encode it as %40');
  }

  const maxPoolSize = parsePositiveInteger(config.MONGODB_MAX_POOL_SIZE, 10, 'MONGODB_MAX_POOL_SIZE');
  const minPoolSize = parsePositiveInteger(config.MONGODB_MIN_POOL_SIZE, 1, 'MONGODB_MIN_POOL_SIZE', true);
  if (minPoolSize > maxPoolSize) {
    throw new Error('MONGODB_MIN_POOL_SIZE cannot exceed MONGODB_MAX_POOL_SIZE');
  }

  return {
    ...config,
    NODE_ENV: nodeEnv,
    PORT: port,
    MONGODB_URI: mongodbUri,
    MONGODB_MAX_POOL_SIZE: maxPoolSize,
    MONGODB_MIN_POOL_SIZE: minPoolSize,
  };
}

function parsePositiveInteger(
  value: unknown,
  fallback: number,
  name: string,
  allowZero = false,
): number {
  const parsed = Number(value ?? fallback);
  const minimum = allowZero ? 0 : 1;
  if (!Number.isInteger(parsed) || parsed < minimum) {
    throw new Error(`${name} must be an integer greater than or equal to ${minimum}`);
  }
  return parsed;
}
