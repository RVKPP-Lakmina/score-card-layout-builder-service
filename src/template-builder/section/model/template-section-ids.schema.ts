import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TemplateSectionIdsDocument = TemplateSectionIds & Document;

@Schema({ timestamps: true, _id: true })
export class TemplateSectionIds {
  @Prop({ required: false })
  _id: string;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  parentSectionId: string;

  @Prop({ required: true })
  parentTemplateId: string;

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
