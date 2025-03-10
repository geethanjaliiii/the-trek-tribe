import { ObjectId } from "mongoose";

export interface IVerificationRequest {
    _id?:ObjectId;
    vendorId:ObjectId;
    applyCount:number;
    status:string;
    rejectReason:string;
    submittedAt:Date;
    updatedAt:Date;
}