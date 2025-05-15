import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    @Prop()
    createdAt: string;

    @Prop({ type: Map, of: Object })
    apis?: Record<string, any>;

    @Prop()
    lastEdited: string;

    @Prop()
    lastEditedBy: string;

    @Prop()
    createdBy: string;

    @Prop()
    countOfEdits: number;

    @Prop({ type: [Map], default: [] })
    templateIds: Record<string, any>[];

    @Prop()
    status: string; // No enum here
}

export const ProductSchema = SchemaFactory.createForClass(Product);
