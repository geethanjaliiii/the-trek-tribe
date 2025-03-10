import { injectable } from "tsyringe";
import { IVerificationRequestRepository } from "../../../../domain/repositories/verificationRequest/verificatioReqRepository.interface";
import { ObjectId } from "mongoose";
import { IVerificationRequest } from "../../../../domain/entities/verificationRequest.entity";
import { VerificationRequestModel } from "../../models/verificationRequest.model";

@injectable()
export default class VerificationRequestRepository implements IVerificationRequestRepository {
   async  create(data: IVerificationRequest): Promise<IVerificationRequest> {
      return await VerificationRequestModel.create(data)
    }
    async  findById(requestId: ObjectId): Promise<IVerificationRequest| null> {
       return await VerificationRequestModel.findById(requestId)
    }
    async  findByVendorId(vendorId: ObjectId): Promise<IVerificationRequest| null> {
      return await VerificationRequestModel.findOne({vendorId})
    }
    async  update(requestId: ObjectId, updates: Partial<IVerificationRequest>): Promise<void> {
       await VerificationRequestModel.findByIdAndUpdate(requestId,{$set:updates})
    }

}