import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TemplateSectionDocument = TemplateSection & Document;

@Schema({ timestamps: true, _id: true })
export class TemplateSection {
  @Prop({ required: false })
  _id: string;

  @Prop({ required: true, unique: true })
  name: string;

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

export const TemplateSectionSchema =
  SchemaFactory.createForClass(TemplateSection);
