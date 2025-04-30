import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TemplateDocument = Template & Document;

@Schema({ timestamps: true })
export class Template {
  @Prop({ required: true })
  name: string;

  @Prop()
  score?: number;

  @Prop()
  lastEdited?: string;

  @Prop()
  description?: string;

  @Prop()
  createdAt?: string;

  @Prop()
  countOfEdits?: number;

  @Prop()
  createdBy?: string;

  @Prop()
  sections?: string;

  @Prop()
  lastEditedBy?: string;

  @Prop({ type: [String], default: [] })
  sectionIds: string[];
}

export const TemplateSchema = SchemaFactory.createForClass(Template);
