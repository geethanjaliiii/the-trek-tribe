import { inject, injectable } from "tsyringe";
import { IVendor } from "../../domain/entities/vendor.entity";
import { IGetVendorDetailsUsecase } from "../interface/vendor/IGetVendorDetails";
import { IVendorRepository } from "../../domain/repositories/vendor/vendorRepository.interface";
import { CustomError } from "../../shared/utils/CustomError";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/utils/constants";

@injectable()
export class GetVendorDetailsUsecase implements IGetVendorDetailsUsecase {
  constructor(
    @inject("IVendorRepository") private vendorRepo: IVendorRepository
  ) {}
  async execute(vendorId:any): Promise<Partial<IVendor> | void> {
   const vendor= await this.vendorRepo.findById(vendorId)
  if(!vendor) {
    throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND,HTTP_STATUS.NOT_FOUND)
  }
  return vendor;
  }
}
