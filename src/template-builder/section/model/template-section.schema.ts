import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TemplateSectionDocument = TemplateSection & Document;

@Schema({ timestamps: true })
export class TemplateSection {
  @Prop({ required: false, unique: true })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    type: String,
  })
  parentSectionId: string;

  @Prop({
    required: true,
    type: String,
    ref: 'Template',
  })
  parentTemplateId: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ required: true, type: Number })
  overallWeight: number;

  @Prop({ required: true, type: Number })
  sectionWeight: number;

  @Prop()
  lastEditedBy: string;

  @Prop({ type: [String], default: [] })
  rules: string[];
}

export const TemplateSectionSchema =
  SchemaFactory.createForClass(TemplateSection);
