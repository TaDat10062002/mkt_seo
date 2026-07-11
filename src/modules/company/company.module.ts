import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyService } from './application/company.service';
import { CompanyRepositoryToken } from './domain/repositories/company.repository';
import { MongooseCompanyRepository } from './infrastructure/persistence/mongoose/repositories/mongoose-company.repository';
import { CompanyDocument, CompanySchema } from './infrastructure/persistence/mongoose/schemas/company.schema';
import { CompanyController } from './presentation/http/company.controller';
@Module({ imports:[MongooseModule.forFeature([{name:CompanyDocument.name,schema:CompanySchema}])],controllers:[CompanyController],providers:[CompanyService,{provide:CompanyRepositoryToken,useClass:MongooseCompanyRepository}],exports:[CompanyService] })
export class CompanyModule {}
