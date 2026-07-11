import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KeywordService } from './application/keyword.service';
import { KeywordRepositoryToken } from './domain/repositories/keyword.repository';
import { MongooseKeywordRepository } from './infrastructure/persistence/mongoose/repositories/mongoose-keyword.repository';
import { KeywordDocument, KeywordSchema } from './infrastructure/persistence/mongoose/schemas/keyword.schema';
import { KeywordController } from './presentation/http/keyword.controller';
@Module({ imports:[MongooseModule.forFeature([{name:KeywordDocument.name,schema:KeywordSchema}])],controllers:[KeywordController],providers:[KeywordService,{provide:KeywordRepositoryToken,useClass:MongooseKeywordRepository}],exports:[KeywordService] })
export class KeywordModule {}
