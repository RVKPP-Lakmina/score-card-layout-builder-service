import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'active_history' })
export class History extends Document {
    @Prop({ required: true })
    action: string;

    @Prop({ required: true })
    entityType: string;

    @Prop({ required: true })
    entityName: string;

    @Prop({ required: true })
    timestamp: Date;

    @Prop({ required: true })
    user: string;

    @Prop()
    details: string;
}

export const HistorySchema = SchemaFactory.createForClass(History);