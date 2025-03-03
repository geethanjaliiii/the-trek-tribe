import { UserRoles } from "../../shared/utils/constants";
import { IBaseUser } from "./baseUser.entity";

export interface IVendor extends IBaseUser{
    
    vendorId: string;
  //  role: UserRoles.VENDOR;
    additionalContactNumber: string;
    businessName: string;
    businessDescription: string;
    registrationNumber?: string;
    businessType?: string;

     // 🔹 Document Verification
    businessDocuments?: string[];
    ownerIdProof?: string;
    businnessLogo?:string;

     // 🔹 Location & Contact Details
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    pincode?: string;
    website?: string;
    socialMediaLinks: string[];

     // 🔹 Account & Role Management
    isVerified: boolean;
    accountStatus:"pending" |"approved" | "rejected"
}