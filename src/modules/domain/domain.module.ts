import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DomainDocument,
  DomainSchema,
} from '../../infrastructure/persistence/mongoose/domain.schema';
import { MongooseDomainRepository } from '../../infrastructure/persistence/mongoose/mongoose-domain.repository';
import { DomainController } from './domain.controller';
import { DomainRepositoryToken } from './domain.interface';
import { DomainService } from './domain.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DomainDocument.name, schema: DomainSchema },
    ]),
  ],
  controllers: [DomainController],
  providers: [
    DomainService,
    {
      provide: DomainRepositoryToken,
      useClass: MongooseDomainRepository,
    },
  ],
})
export class DomainModule {}
