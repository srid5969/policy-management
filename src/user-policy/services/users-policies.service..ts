import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as csvtojson from 'csvtojson';
import { Model } from 'mongoose';
import {
  Agent,
  UserAccount,
  PolicyInfo,
  PolicyCarrier,
  PolicyCategory,
  User,
  UserType,
} from 'src/models';
import { Readable } from 'stream';
import { ImportPolicyDto } from '../dto/import.dto';

@Injectable()
export class UsersPoliciesManagementService {
  constructor(
    @InjectModel(Agent.name) private agentModel: Model<Agent>,
    @InjectModel(UserAccount.name) private userAccModel: Model<UserAccount>,
    @InjectModel(PolicyInfo.name) private policyInfoModel: Model<PolicyInfo>,
    @InjectModel(PolicyCategory.name)
    private policyCategory: Model<PolicyCategory>,
    @InjectModel(PolicyCarrier.name)
    private policyCarrierModel: Model<PolicyCarrier>,
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}
  private async csvToJson(file: Express.Multer.File): Promise<any> {
    const stream = Readable.from(file.buffer.toString());
    const data = csvtojson().fromStream(stream);
    return data;
  }

  async importCsv(file: Express.Multer.File): Promise<any> {
    const userPolicyArr: ImportPolicyDto[] = await this.csvToJson(file);
    const results = userPolicyArr.map(async (policy) => {
      let user = await this.userAccModel.findOne({ name: policy.account_name });
      let userProfile;
      if (!user) {
        userProfile = await this.userModel.create({
          name: {
            first: policy.firstname,
          },
          address: {
            street: policy.address,
            city: policy.city,
            state: policy.state,
            zip: policy.zip,
          },
          phone_number: policy.phone,
          email: policy.email,
          user_type: UserType.Customer,
          dob: policy.dob,
          gender: policy?.gender,
        } as User);
        user = await this.userAccModel.create({
          name: policy.account_name,
          user_id: userProfile._id,
        });
      } else {
        userProfile = await this.userModel.findOne({ _id: user.user_id });
      }

      let agent = await this.agentModel.findOne({ name: policy.agent });
      if (!agent) {
        agent = await this.agentModel.create({ name: policy.agent });
      }
      let policyCarrier = await this.policyCarrierModel.findOne({
        name: policy.company_name,
      });
      if (!policyCarrier) {
        policyCarrier = await this.policyCarrierModel.create({
          company: policy.company_name,
        });
      }
      let policyCategory = await this.policyCategory.findOne({
        name: policy.category_name,
      });
      if (!policyCategory) {
        policyCategory = await this.policyCategory.create({
          name: policy.category_name,
        });
      }
      const result = await this.policyInfoModel.create({
        agent_id: agent._id,
        number: policy.policy_number,
        category_id: policyCategory._id,
        type: policy.policy_type,
        start: policy.policy_start_date,
        end: policy.policy_end_date,
        company_id: policyCarrier._id, // Add the missing property
        user: {
          account_id: user._id,
          account_name: policy.account_name,
          user_id: userProfile._id,
        },
      } as PolicyInfo);
      return result;
    });

    return await Promise.allSettled(results);
  }
}
