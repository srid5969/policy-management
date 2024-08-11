import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseModel } from './base.model';

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Agent extends BaseModel {
  @Prop({ required: true })
  name: string;
}
export const AgentSchema = SchemaFactory.createForClass(Agent);
