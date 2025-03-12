import { ObjectId } from "mongoose";
import { VendorRegistrationDto } from "../../../shared/dtos/vendor.dto";
import { IVendor } from "../../../domain/entities/vendor.entity";

export interface IRequestVerificationUsecase {
    execute(vendorId:any,vendor: Partial<IVendor>):Promise<void>
}