import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true, _id: true })
export class User {
  @Prop({ required: false })
  _id: string;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  password: string;
  _doc: { [x: string]: any; password: any; };
}

export const UserSchema = SchemaFactory.createForClass(User);
