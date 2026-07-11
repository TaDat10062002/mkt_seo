import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
@Schema({ timestamps: true, versionKey: false, collection: 'keywords' })
export class KeywordDocument {
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true, index: true }) domainId!: Types.ObjectId;
  @Prop({ required: true, trim: true }) name!: string;
  @Prop({ required: true, trim: true }) slug!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
export type KeywordMongoDocument = HydratedDocument<KeywordDocument>;
export const KeywordSchema = SchemaFactory.createForClass(KeywordDocument);
