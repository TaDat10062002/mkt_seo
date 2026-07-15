import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseCompanyRepository } from '../../infrastructure/persistence/mongoose/mongoose-company.repository';
import {
  CompanyDocument,
  CompanySchema,
} from '../../infrastructure/persistence/mongoose/company.schema';
import { CompanyController } from './company.controller';
import { CompanyRepositoryToken } from './company.interface';
import { CompanyService } from './company.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CompanyDocument.name, schema: CompanySchema },
    ]),
  ],
  controllers: [CompanyController],
  providers: [
    CompanyService,
    {
      provide: CompanyRepositoryToken,
      useClass: MongooseCompanyRepository,
    },
  ],
})
export class CompanyModule {}
