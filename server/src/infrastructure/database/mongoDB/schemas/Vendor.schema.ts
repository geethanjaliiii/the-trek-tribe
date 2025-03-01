import { Schema } from "mongoose";
import { UserRoles } from "../../../../shared/utils/constants";
import { IVendorModel } from "../../models/vendor.model";

export const VendorSchema = new Schema<IVendorModel>(
  {
    vendorId: { type: String, required: true },
    fullName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, default: UserRoles.VENDOR, required: true },
    profileImage: { type: String },
    phoneNumber: { type: String },
    isActive: { type: Boolean, default: false },
    additionalContactNumber: { type: String },
    businessName: { type: String, required: true },
    businessDescription: { type: String },
    registrationNumber: { type: String },
    businessType: { type: String },
    businessDocuments: { type: [String] },
    ownerIdProof: { type: String },
    businnessLogo: { type: String },
    // Location & Contact Details
    address: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    pincode: { type: String },
    website: { type: String },
    socialMediaLinks: { type: [String] },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);
