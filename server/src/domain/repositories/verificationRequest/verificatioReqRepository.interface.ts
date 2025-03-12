import { ObjectId } from "mongoose";
import { VendorRegistrationDto } from "../../../shared/dtos/vendor.dto";
import { IVerificationRequest } from "../../entities/verificationRequest.entity";

export interface IVerificationRequestRepository{
    create(data:Partial<IVerificationRequest>):Promise<IVerificationRequest>;

    findById(requestId:ObjectId):Promise<IVerificationRequest | null>

    findByVendorId(vendorId:ObjectId):Promise<IVerificationRequest | null>;

    update(requestId: ObjectId, updates: Partial<IVerificationRequest>):Promise<void>
   
    find(options?: { status?: string, limit?: number, offset?: number }):Promise<Partial<IVerificationRequest>[]>
}