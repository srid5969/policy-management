import { ObjectId } from 'bson';

export class CreatedBy {
  id: ObjectId;
  name: string;
}
export class UpdatedBy {
  id: ObjectId;
  name: string;
}
export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}
export class Logs {
  //TODO: define log schema here
}
export class BaseModel {
  readonly _id: ObjectId | string;
  readonly created_at: Date;
  updated_at: Date;
  created_by: CreatedBy;
  status: Status;
  logs: Logs[];
}
