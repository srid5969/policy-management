import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseModel } from './base.model';

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class PolicyCarrier extends BaseModel {
  @Prop({ required: true, unique: true })
  company: string;
}
export const PolicyCarrierSchema = SchemaFactory.createForClass(PolicyCarrier);
