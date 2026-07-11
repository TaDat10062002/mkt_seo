import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
@Schema({ timestamps: true, versionKey: false, collection: 'domains' })
export class DomainDocument {
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true, index: true }) companyId!: Types.ObjectId;
  @Prop({ required: true, trim: true }) name!: string;
  @Prop({ required: true, trim: true }) url!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
export type DomainMongoDocument = HydratedDocument<DomainDocument>;
export const DomainSchema = SchemaFactory.createForClass(DomainDocument);
