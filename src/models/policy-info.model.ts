import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseModel } from './base.model';
import { ObjectId } from 'bson';
import { PolicyCategory } from './policy-category.model';
import { PolicyCarrier } from './policy-carrier.model';
import { User } from './user.model';
import { UserAccount } from './user-account.model';
import { Agent } from 'http';

class UserRefObjectOfPolicy {
  @Prop({ required: true, ref: User.name, type: ObjectId })
  user_id: ObjectId;

  @Prop({ required: true })
  account_name: string;

  @Prop({ required: true, ref: UserAccount.name, type: ObjectId })
  account_id: ObjectId;
}

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class PolicyInfo extends BaseModel {
  @Prop({ required: true, unique: true })
  number: string;
  @Prop()
  start: Date;

  @Prop()
  end: Date;

  @Prop({ ref: PolicyCategory.name, type: ObjectId })
  category_id: ObjectId;

  @Prop({ ref: PolicyCarrier.name, type: ObjectId })
  company_id: ObjectId;

  @Prop()
  user: UserRefObjectOfPolicy;

  @Prop({ ref: Agent.name, type: ObjectId })
  agent_id: ObjectId;
}
export const PolicyInfoSchema = SchemaFactory.createForClass(PolicyInfo);
