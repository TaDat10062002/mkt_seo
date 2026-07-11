export function validateEnv(config: Record<string, unknown>) {
  const port = Number(config.PORT ?? 3000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PORT must be a valid TCP port');
  if (!config.MONGODB_URI) throw new Error('MONGODB_URI is required');
  return { ...config, PORT: port };
}
