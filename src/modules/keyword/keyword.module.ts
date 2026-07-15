import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  KeywordDocument,
  KeywordSchema,
} from '../../infrastructure/persistence/mongoose/keyword.schema';
import { MongooseKeywordRepository } from '../../infrastructure/persistence/mongoose/mongoose-keyword.repository';
import { KeywordController } from './keyword.controller';
import { KeywordRepositoryToken } from './keyword.interface';
import { KeywordService } from './keyword.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: KeywordDocument.name, schema: KeywordSchema },
    ]),
  ],
  controllers: [KeywordController],
  providers: [
    KeywordService,
    {
      provide: KeywordRepositoryToken,
      useClass: MongooseKeywordRepository,
    },
  ],
})
export class KeywordModule {}
