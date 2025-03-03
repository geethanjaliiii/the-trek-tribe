import { ObjectId } from "mongoose";
import { TRole } from "../../shared/utils/constants";


export interface IRefreshToken {
  _id?: ObjectId;
  token: string;
  user: ObjectId;
  userType: TRole;
  expiresAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}