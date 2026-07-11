import { validateEnv } from '../src/config/env.validation';

describe('validateEnv', () => {
  it('applies safe defaults and keeps the MongoDB URI as the single database source', () => {
    expect(validateEnv({ MONGODB_URI: 'mongodb://127.0.0.1:27017/article_management' })).toMatchObject({
      NODE_ENV: 'development',
      PORT: 3000,
      MONGODB_URI: 'mongodb://127.0.0.1:27017/article_management',
      MONGODB_MAX_POOL_SIZE: 10,
      MONGODB_MIN_POOL_SIZE: 1,
    });
  });

  it('rejects a missing MongoDB URI', () => {
    expect(() => validateEnv({})).toThrow('MONGODB_URI is required');
  });

  it('rejects an invalid connection pool range', () => {
    expect(() =>
      validateEnv({
        MONGODB_URI: 'mongodb://127.0.0.1:27017/article_management',
        MONGODB_MIN_POOL_SIZE: 11,
        MONGODB_MAX_POOL_SIZE: 10,
      }),
    ).toThrow('MONGODB_MIN_POOL_SIZE cannot exceed MONGODB_MAX_POOL_SIZE');
  });

  it('rejects an unescaped at-sign in MongoDB credentials', () => {
    expect(() =>
      validateEnv({ MONGODB_URI: 'mongodb+srv://user:password@2002@cluster.example.net/database' }),
    ).toThrow('MONGODB_URI credentials contain an unescaped @; encode it as %40');
  });
});
