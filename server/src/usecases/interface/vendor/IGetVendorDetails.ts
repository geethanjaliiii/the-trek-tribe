import { IVendor } from "../../../domain/entities/vendor.entity";

export interface IGetVendorDetailsUsecase {
    execute(vendorId:any):Promise<Partial<IVendor>|void>
}