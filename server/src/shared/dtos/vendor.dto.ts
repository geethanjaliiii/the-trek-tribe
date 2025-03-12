export interface VendorRegistrationDto {
    fullName:string;
    email:string;
    phoneNumber: string
    password?:string |null
     //  role: UserRoles.VENDOR;
     additionalContactNumber?: string|null;
     businessName: string;
     businessDescription: string;
     registrationNumber: string;
     businessType: string;
 
      // 🔹 Document Verification
     businessDocuments: string[];
     ownerIdProof: string;
     businessLogo:string;
 
      // 🔹 Location & Contact Details
     address: string;
     city: string;
     state: string;
     country: string;
     pincode: string;
     website?: string|null;
     socialMediaLinks?: string[]|[];
 
      
}