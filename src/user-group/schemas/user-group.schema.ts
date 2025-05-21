import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserGroupDocument = UserGroup & Document;

@Schema({ timestamps: true })
export class UserGroup {
    @Prop({ required: true, unique: true })
    name: string;

    @Prop()
    description: string;

    @Prop({ default: true })
    isActive: boolean;

    @Prop()
    createdBy: string;

    @Prop()
    updatedBy: string;

    @Prop({ type: [String], default: [] })
    privileges: string[];
}

export const UserGroupSchema = SchemaFactory.createForClass(UserGroup);