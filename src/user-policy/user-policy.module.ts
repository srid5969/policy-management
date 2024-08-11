import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Agent,
  AgentSchema,
  PolicyCarrier,
  PolicyCarrierSchema,
  PolicyCategory,
  PolicyCategorySchema,
  PolicyInfo,
  PolicyInfoSchema,
  User,
  UserAccount,
  UserAccountSchema,
  UserSchema,
} from 'src/models';
import { UsersPolicyManagementController } from './controllers/users-policy-mngt.controller';
import { UsersPoliciesManagementService } from './services/users-policies.service.';

@Module({
  controllers: [UsersPolicyManagementController],
  providers: [UsersPoliciesManagementService],
  imports: [
    MongooseModule.forFeature([
      { schema: UserSchema, name: User.name },
      { schema: UserAccountSchema, name: UserAccount.name },
      { schema: PolicyCarrierSchema, name: PolicyCarrier.name },
      { schema: PolicyCategorySchema, name: PolicyCategory.name },
      { schema: AgentSchema, name: Agent.name },
      { schema: PolicyInfoSchema, name: PolicyInfo.name },
    ]),
  ],
})
export class UserPolicyModule {}
