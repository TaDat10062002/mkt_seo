import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ArticleDocument,
  ArticleSchema,
} from '../../infrastructure/persistence/mongoose/article.schema';
import { MongooseArticleRepository } from '../../infrastructure/persistence/mongoose/mongoose-article.repository';
import { ArticleController } from './article.controller';
import { ArticleRepositoryToken } from './article.interface';
import { ArticleService } from './article.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ArticleDocument.name, schema: ArticleSchema },
    ]),
  ],
  controllers: [ArticleController],
  providers: [
    ArticleService,
    {
      provide: ArticleRepositoryToken,
      useClass: MongooseArticleRepository,
    },
  ],
})
export class ArticleModule {}
