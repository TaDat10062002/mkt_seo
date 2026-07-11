import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubKeywordService } from './application/sub-keyword.service';
import { SubKeywordRepositoryToken } from './domain/repositories/sub-keyword.repository';
import { MongooseSubKeywordRepository } from './infrastructure/persistence/mongoose/repositories/mongoose-sub-keyword.repository';
import { SubKeywordDocument, SubKeywordSchema } from './infrastructure/persistence/mongoose/schemas/sub-keyword.schema';
import { SubKeywordController } from './presentation/http/sub-keyword.controller';
@Module({ imports:[MongooseModule.forFeature([{name:SubKeywordDocument.name,schema:SubKeywordSchema}])],controllers:[SubKeywordController],providers:[SubKeywordService,{provide:SubKeywordRepositoryToken,useClass:MongooseSubKeywordRepository}],exports:[SubKeywordService] })
export class SubKeywordModule {}
