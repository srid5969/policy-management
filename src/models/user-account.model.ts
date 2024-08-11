import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseModel } from './base.model';
import { ObjectId } from 'bson';
import { User } from './user.model';

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class UserAccount extends BaseModel {
  @Prop({ required: true, unique: true, lowercase: true })
  name: string;

  @Prop({ required: true, ref: User.name, type: ObjectId })
  user_id: ObjectId;
}
export const UserAccountSchema = SchemaFactory.createForClass(UserAccount);
