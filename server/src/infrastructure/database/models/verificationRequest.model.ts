import { model, ObjectId } from "mongoose";
import { IVerificationRequest } from "../../../domain/entities/verificationRequest.entity";
import { VerificationRequestSchema } from "../mongoDB/schemas/VerificationRequest.schema";

export interface IVerificationRequestModel extends Omit<IVerificationRequest ,'_id'>,Document {
_id:ObjectId
}

export const VerificationRequestModel =model<IVerificationRequestModel>('VerificationRequest',VerificationRequestSchema)