import { ObjectId } from "mongoose";
import { TRole } from "../../shared/constants";

export interface IUser {
    _id?: ObjectId;
    fullName?: string;
    email: string;
    password: string;
    role:TRole;
    profileImage?: string;
    phoneNumber?: string;
    isBlocked?: string;
    createdAt: Date;
    updatedAt: Date;
}