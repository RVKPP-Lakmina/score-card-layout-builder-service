import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type TemplateSectionIdsDocument = TemplateSectionIds & Document;

@Schema({ timestamps: true, _id: true })
export class TemplateSectionIds {
  @Prop({ required: false })
  _id: string;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section',
  })
  parentSectionId: mongoose.Schema.Types.ObjectId;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Template',
  })
  parentTemplateId: mongoose.Schema.Types.ObjectId;

  @Prop()
  description?: string;

  @Prop({ required: true })
  overallWeight: number;

  @Prop({ required: true })
  sectionWeight: number;

  @Prop()
  lastEditedBy: string;

  @Prop({ required: true })
  rules: string[];
}

export const TemplateSectionIdsSchema =
  SchemaFactory.createForClass(TemplateSectionIds);
