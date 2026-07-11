import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleService } from './application/article.service';
import { ArticleRepositoryToken } from './domain/repositories/article.repository';
import { MongooseArticleRepository } from './infrastructure/persistence/mongoose/repositories/mongoose-article.repository';
import { ArticleDocument, ArticleSchema } from './infrastructure/persistence/mongoose/schemas/article.schema';
import { ArticleController } from './presentation/http/article.controller';
@Module({ imports:[MongooseModule.forFeature([{name:ArticleDocument.name,schema:ArticleSchema}])],controllers:[ArticleController],providers:[ArticleService,{provide:ArticleRepositoryToken,useClass:MongooseArticleRepository}],exports:[ArticleService] })
export class ArticleModule {}
