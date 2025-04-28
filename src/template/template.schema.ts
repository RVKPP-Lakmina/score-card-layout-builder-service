import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TemplateDocument = Template & Document;

@Schema()
export class Template {
    @Prop({ required: true })
    name: string;

    @Prop()
    content: string;
}

export const TemplateSchema = SchemaFactory.createForClass(Template);
