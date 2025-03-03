import { ObjectId } from "mongoose";
import { TRole } from "../../shared/utils/constants";

export interface IBaseUser {
    _id?: ObjectId;
    fullName?: string;
    email: string;
    password: string;
    profileImage?: string;
    role:TRole;
    phoneNumber?: string;
    isActive?: boolean;
    createdAt: Date;
    updatedAt: Date;
}