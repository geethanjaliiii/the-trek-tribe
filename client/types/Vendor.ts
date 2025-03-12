export interface VendorVerificationValues {
    fullName: string
    email: string
    phoneNumber: string
    additionalContactNumber: string
    businessName: string
    businessDescription: string
    registrationNumber: string
    businessType: string
    businessDocuments: (string| File)[]
    ownerIdProof: string|File
    businessLogo: string | File
    address: string
    city: string
    state: string
    country: string
    pincode: string
    website?: string
    socialMediaLinks?: string[]
  }