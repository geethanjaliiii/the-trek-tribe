import { Document, model, ObjectId } from "mongoose";
import { IVendor } from "../../../domain/entities/vendor.entity";
import { VendorSchema } from "../mongoDB/schemas/Vendor.schema";

export interface IVendorModel extends Omit<IVendor, '_id'>, Document {
    _id:ObjectId;
}
export const VendorModel= model<IVendorModel>("Vendor",VendorSchema)