import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
@Schema({ timestamps: true, collection: 'companies' })
export class CompanyDocument {
  @Prop({ required: true, trim: true }) name!: string;
  @Prop({ required: false, trim: true }) description?: string;
  createdAt!: Date;
  updatedAt!: Date;
}
export type CompanyMongoDocument = HydratedDocument<CompanyDocument>;
export const CompanySchema = SchemaFactory.createForClass(CompanyDocument);
