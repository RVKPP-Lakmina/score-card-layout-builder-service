import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SectionDocument = Section & Document;

@Schema({ timestamps: true, _id: true })
export class Section {
  @Prop({ required: false })
  _id: string;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  templateId: string;

  @Prop()
  lastEditedBy: string;

  @Prop()
  order: number;
}

export const SectionSchema = SchemaFactory.createForClass(Section);
