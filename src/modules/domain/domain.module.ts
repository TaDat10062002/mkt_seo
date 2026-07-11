import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DomainService } from './application/domain.service';
import { DomainRepositoryToken } from './domain/repositories/domain.repository';
import { MongooseDomainRepository } from './infrastructure/persistence/mongoose/repositories/mongoose-domain.repository';
import { DomainDocument, DomainSchema } from './infrastructure/persistence/mongoose/schemas/domain.schema';
import { DomainController } from './presentation/http/domain.controller';
@Module({ imports:[MongooseModule.forFeature([{name:DomainDocument.name,schema:DomainSchema}])],controllers:[DomainController],providers:[DomainService,{provide:DomainRepositoryToken,useClass:MongooseDomainRepository}],exports:[DomainService] })
export class DomainModule {}
