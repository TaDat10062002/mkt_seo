import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from './config/env.validation';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ArticleModule } from './modules/article/article.module';
import { CompanyModule } from './modules/company/company.module';
import { DomainModule } from './modules/domain/domain.module';
import { KeywordModule } from './modules/keyword/keyword.module';
import { SubKeywordModule } from './modules/sub-keyword/sub-keyword.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: validateEnv }),
    DatabaseModule,
    CompanyModule,
    DomainModule,
    KeywordModule,
    SubKeywordModule,
    ArticleModule,
  ],
})
export class AppModule {}
