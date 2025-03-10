import { ObjectId } from "mongoose";
import { VendorRegistrationDto } from "../../../shared/dtos/vendor.dto";

export interface IRequestVerificationUsecase {
    execute(vendorId:ObjectId,vendor: VendorRegistrationDto):Promise<void>
}