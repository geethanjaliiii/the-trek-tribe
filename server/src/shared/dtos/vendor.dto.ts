export interface VendorRegistrationDto {
    fullName:string;
    email:string;
    phoneNumber: string
     //  role: UserRoles.VENDOR;
     additionalContactNumber: string;
     businessName: string;
     businessDescription: string;
     registrationNumber: string;
     businessType: string;
 
      // 🔹 Document Verification
     businessDocuments: string[];
     ownerIdProof: string;
     businnessLogo:string;
 
      // 🔹 Location & Contact Details
     address: string;
     city: string;
     state: string;
     country: string;
     pincode: string;
     website?: string;
     socialMediaLinks?: string[];
 
      
}