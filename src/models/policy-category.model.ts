import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseModel } from './base.model';

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class PolicyCategory extends BaseModel {
  @Prop({ required: true })
  name: string;
}
export const PolicyCategorySchema =
  SchemaFactory.createForClass(PolicyCategory);
