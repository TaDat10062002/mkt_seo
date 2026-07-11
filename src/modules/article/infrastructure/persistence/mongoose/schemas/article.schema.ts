import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
@Schema({ timestamps: true, versionKey: false, collection: 'articles' })
export class ArticleDocument {
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true }) companyId!: Types.ObjectId;
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true, index: true }) domainId!: Types.ObjectId;
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true, index: true }) keywordId!: Types.ObjectId;
  @Prop({ type: MongooseSchema.Types.ObjectId, required: false }) subKeywordId?: Types.ObjectId;
  @Prop({ required: true, trim: true }) title!: string;
  @Prop({ required: true, trim: true }) content!: string;
  @Prop({ required: true, trim: true }) status!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
export type ArticleMongoDocument = HydratedDocument<ArticleDocument>;
export const ArticleSchema = SchemaFactory.createForClass(ArticleDocument);
ArticleSchema.index({ status: 1, createdAt: -1 });
