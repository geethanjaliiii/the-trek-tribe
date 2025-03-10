import { inject, injectable } from "tsyringe";
import { IRequestVerificationUsecase } from "../interface/vendor/IVerify-vendor-Usecase.interface";
import { IVendorRepository } from "../../domain/repositories/vendor/vendorRepository.interface";
import { IVerificationRequestRepository } from "../../domain/repositories/verificationRequest/verificatioReqRepository.interface";
import { VendorRegistrationDto } from "../../shared/dtos/vendor.dto";
import { ObjectId } from "mongoose";
import {
  ERROR_MESSAGES,
  HTTP_STATUS,
  MAX_VERIFICATION_APPLY_COUNT,
} from "../../shared/utils/constants";
import { CustomError } from "../../shared/utils/CustomError";

@injectable()
export class RequestVerificationUseCase implements IRequestVerificationUsecase {
  constructor(
    @inject("IVendorRepository") private vendorRepo: IVendorRepository,
    @inject("IVerificationRequestRepository")
    private verificatonReqRepo: IVerificationRequestRepository
  ) {}

  async execute(
    vendorId: ObjectId,
    vendor: VendorRegistrationDto
  ): Promise<void> {
    await this.vendorRepo.updateVendorProfileById(vendorId, vendor);
    const existingRequest = await this.verificatonReqRepo.findByVendorId(
      vendorId
    );
    if (existingRequest) {
      if (existingRequest.applyCount > MAX_VERIFICATION_APPLY_COUNT) {
        throw new CustomError(
          "Further account verification is not allowed",
          HTTP_STATUS.BAD_REQUEST
        );
      }
      await this.verificatonReqRepo.update(existingRequest._id as ObjectId, {
        status: "pending",
        applyCount: existingRequest.applyCount + 1,
        updatedAt: new Date(),
        rejectReason: "", //clearing prev reason
      });
    } else {
      await this.verificatonReqRepo.create({
        vendorId: vendorId,
        applyCount: 1,
        status: "pending",
        rejectReason: "",
        submittedAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }
}
