import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseSubKeywordRepository } from '../../infrastructure/persistence/mongoose/mongoose-sub-keyword.repository';
import {
  SubKeywordDocument,
  SubKeywordSchema,
} from '../../infrastructure/persistence/mongoose/sub-keyword.schema';
import { SubKeywordController } from './sub-keyword.controller';
import { SubKeywordRepositoryToken } from './sub-keyword.interface';
import { SubKeywordService } from './sub-keyword.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubKeywordDocument.name, schema: SubKeywordSchema },
    ]),
  ],
  controllers: [SubKeywordController],
  providers: [
    SubKeywordService,
    {
      provide: SubKeywordRepositoryToken,
      useClass: MongooseSubKeywordRepository,
    },
  ],
})
export class SubKeywordModule {}
