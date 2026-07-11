import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
@Schema({ timestamps: true, versionKey: false, collection: 'sub_keywords' })
export class SubKeywordDocument {
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true, index: true }) keywordId!: Types.ObjectId;
  @Prop({ required: true, trim: true }) name!: string;
  @Prop({ required: true, trim: true }) slug!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
export type SubKeywordMongoDocument = HydratedDocument<SubKeywordDocument>;
export const SubKeywordSchema = SchemaFactory.createForClass(SubKeywordDocument);
