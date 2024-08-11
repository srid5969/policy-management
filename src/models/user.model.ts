import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseModel } from './base.model';

class Name {
  first: string;
  last: string;
}

class Address {
  @Prop()
  street: string;
  @Prop()
  city: string;
  @Prop()
  state: string;
  @Prop()
  zip: string;
}
//'Admin', 'Customer', 'Agent', 'Other'
export enum UserType {
  Admin = 'Admin',
  Customer = 'Customer',
  Agent = 'Agent',
  Other = 'Other',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}
@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class User extends BaseModel {
  @Prop({ required: true })
  name: Name;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  phone_number: string;

  @Prop({ required: true })
  user_type: UserType;

  @Prop({ required: true })
  gender: Gender;

  @Prop({ required: true })
  dob: Date;

  @Prop()
  address: Address;
}
export const UserSchema = SchemaFactory.createForClass(User);
