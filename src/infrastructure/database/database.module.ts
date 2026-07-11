import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { createMongooseOptions } from './mongoose.config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: createMongooseOptions,
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
