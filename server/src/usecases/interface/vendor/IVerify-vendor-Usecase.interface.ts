import { ObjectId } from "mongoose";
import { VendorRegistrationDto } from "../../../shared/dtos/vendor.dto";

export interface IRequestVerificationUsecase {
    execute(vendorId:any,vendor: VendorRegistrationDto):Promise<void>
}