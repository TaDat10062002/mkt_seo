import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

const logger = new Logger('MongoDB');

export function createMongooseOptions(config: ConfigService): MongooseModuleOptions {
  const isProduction = config.get<string>('NODE_ENV') === 'production';

  return {
    uri: config.getOrThrow<string>('MONGODB_URI'),
    serverSelectionTimeoutMS: 5_000,
    maxPoolSize: config.get<number>('MONGODB_MAX_POOL_SIZE', 10),
    minPoolSize: config.get<number>('MONGODB_MIN_POOL_SIZE', 1),
    autoIndex: !isProduction,
    retryAttempts: 3,
    retryDelay: 1_000,
    connectionFactory: (connection: Connection) => {
      logger.log('MongoDB connection established');
      connection.on('disconnected', () => logger.warn('Connection lost'));
      connection.on('error', (error: Error) => logger.error(`Connection error: ${error.message}`));
      return connection;
    },
  };
}
