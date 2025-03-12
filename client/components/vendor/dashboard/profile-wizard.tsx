// "use client"

// import { useState } from "react"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { FileUploader } from "./file-uploader"
// import { Check, ChevronRight, Loader2 } from "lucide-react"
// import { cn } from "@/lib/utils"

// interface Vendor {
//   fullName: string
//   email: string
//   phoneNumber: string
//   password: string
//   additionalContactNumber: string
//   businessName: string
//   businessDescription: string
//   registrationNumber: string
//   businessType: string
//   businessDocuments: string[]
//   ownerIdProof: string
//   businessLogo: string
//   address: string
//   city: string
//   state: string
//   country: string
//   pincode: string
//   website: string
//   socialMediaLinks: string[]
//   isVerified: boolean
// }

// interface ProfileWizardProps {
//   vendor: Vendor
// }

// export function ProfileWizard({ vendor }: ProfileWizardProps) {
//   const [currentStep, setCurrentStep] = useState(0)
//   const [formData, setFormData] = useState(vendor)
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const steps = [
//     {
//       id: "personal",
//       name: "Personal Information",
//       fields: ["fullName", "email", "phoneNumber", "additionalContactNumber"],
//     },
//     {
//       id: "business",
//       name: "Business Information",
//       fields: ["businessName", "businessDescription", "registrationNumber", "businessType"],
//     },
//     {
//       id: "location",
//       name: "Location & Contact",
//       fields: ["address", "city", "state", "country", "pincode", "website"],
//     },
//     {
//       id: "documents",
//       name: "Document Verification",
//       fields: ["businessDocuments", "ownerIdProof", "businessLogo"],
//     },
//     {
//       id: "review",
//       name: "Review & Submit",
//       fields: [],
//     },
//   ]

//   const handleChange = (field: string, value: string | string[]) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }))
//   }

//   const handleNext = () => {
//     if (currentStep < steps.length - 1) {
//       setCurrentStep((prev) => prev + 1)
//       window.scrollTo(0, 0)
//     }
//   }

//   const handlePrevious = () => {
//     if (currentStep > 0) {
//       setCurrentStep((prev) => prev - 1)
//       window.scrollTo(0, 0)
//     }
//   }

//   const handleSubmit = async () => {
//     setIsSubmitting(true)
//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 2000))
//     // In a real app, you would submit the form data to your API here
//     setIsSubmitting(false)
//     // Show success message or redirect
//   }

//   const businessTypes = [
//     "Tour Operator",
//     "Travel Agency",
//     "Hotel/Resort",
//     "Transportation Provider",
//     "Activity Provider",
//     "Other",
//   ]

//   const countries = ["India", "United States", "United Kingdom", "Australia", "Canada", "Singapore", "Other"]

//   const renderStepContent = () => {
//     switch (currentStep) {
//       case 0:
//         return (
//           <div className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="fullName">Full Name</Label>
//               <Input
//                 id="fullName"
//                 value={formData.fullName}
//                 onChange={(e) => handleChange("fullName", e.target.value)}
//                 placeholder="Enter your full name"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={(e) => handleChange("email", e.target.value)}
//                 placeholder="Enter your email"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="phoneNumber">Phone Number</Label>
//               <Input
//                 id="phoneNumber"
//                 value={formData.phoneNumber}
//                 onChange={(e) => handleChange("phoneNumber", e.target.value)}
//                 placeholder="Enter your phone number"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="additionalContactNumber">Additional Contact Number (Optional)</Label>
//               <Input
//                 id="additionalContactNumber"
//                 value={formData.additionalContactNumber}
//                 onChange={(e) => handleChange("additionalContactNumber", e.target.value)}
//                 placeholder="Enter additional contact number"
//               />
//             </div>
//           </div>
//         )
//       case 1:
//         return (
//           <div className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="businessName">Business Name</Label>
//               <Input
//                 id="businessName"
//                 value={formData.businessName}
//                 onChange={(e) => handleChange("businessName", e.target.value)}
//                 placeholder="Enter your business name"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="businessDescription">Business Description</Label>
//               <Textarea
//                 id="businessDescription"
//                 value={formData.businessDescription}
//                 onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange("businessDescription", e.target.value)}
//                 placeholder="Describe your business"
//                 className="min-h-[100px]"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="registrationNumber">Business Registration Number</Label>
//               <Input
//                 id="registrationNumber"
//                 value={formData.registrationNumber}
//                 onChange={(e) => handleChange("registrationNumber", e.target.value)}
//                 placeholder="Enter registration number"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="businessType">Business Type</Label>
//               <Select value={formData.businessType} onValueChange={(value: string) => handleChange("businessType", value)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select business type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {businessTypes.map((type) => (
//                     <SelectItem key={type} value={type}>
//                       {type}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         )
//       case 2:
//         return (
//           <div className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="address">Address</Label>
//               <Textarea
//                 id="address"
//                 value={formData.address}
//                 onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange("address", e.target.value)}
//                 placeholder="Enter your address"
//               />
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="city">City</Label>
//                 <Input
//                   id="city"
//                   value={formData.city}
//                   onChange={(e) => handleChange("city", e.target.value)}
//                   placeholder="Enter city"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="state">State</Label>
//                 <Input
//                   id="state"
//                   value={formData.state}
//                   onChange={(e) => handleChange("state", e.target.value)}
//                   placeholder="Enter state"
//                 />
//               </div>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="country">Country</Label>
//                 <Select value={formData.country} onValueChange={(value:string) => handleChange("country", value)}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select country" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {countries.map((country) => (
//                       <SelectItem key={country} value={country}>
//                         {country}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="pincode">Pincode</Label>
//                 <Input
//                   id="pincode"
//                   value={formData.pincode}
//                   onChange={(e) => handleChange("pincode", e.target.value)}
//                   placeholder="Enter pincode"
//                 />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="website">Website (Optional)</Label>
//               <Input
//                 id="website"
//                 value={formData.website}
//                 onChange={(e) => handleChange("website", e.target.value)}
//                 placeholder="Enter website URL"
//               />
//             </div>
//           </div>
//         )
//       case 3:
//         return (
//           <div className="space-y-6">
//             <div className="space-y-2">
//               <Label>Business Logo</Label>
//               <FileUploader
//                 value={formData.businessLogo}
//                 onChange={(value) => handleChange("businessLogo", value)}
//                 accept="image/*"
//                 maxSize={2}
//                 helperText="Upload your business logo (Max: 2MB)"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label>Business License</Label>
//               <FileUploader
//                 value={formData.businessDocuments[0] || ""}
//                 onChange={(value) => {
//                   const newDocs = [...formData.businessDocuments]
//                   newDocs[0] = value
//                   handleChange("businessDocuments", newDocs)
//                 }}
//                 accept=".pdf,.jpg,.jpeg,.png"
//                 maxSize={5}
//                 helperText="Upload your business license (Max: 5MB)"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label>Aadhaar Card</Label>
//               <FileUploader
//                 value={formData.ownerIdProof}
//                 onChange={(value) => handleChange("ownerIdProof", value)}
//                 accept=".pdf,.jpg,.jpeg,.png"
//                 maxSize={5}
//                 helperText="Upload your Aadhaar card (Max: 5MB)"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label>GST Certificate (if applicable)</Label>
//               <FileUploader
//                 value={formData.businessDocuments[1] || ""}
//                 onChange={(value) => {
//                   const newDocs = [...formData.businessDocuments]
//                   newDocs[1] = value
//                   handleChange("businessDocuments", newDocs)
//                 }}
//                 accept=".pdf,.jpg,.jpeg,.png"
//                 maxSize={5}
//                 helperText="Upload your GST certificate (Max: 5MB)"
//               />
//             </div>

//             <div className="space-y-2">
//               <Label>PAN Card</Label>
//               <FileUploader
//                 value={formData.businessDocuments[2] || ""}
//                 onChange={(value) => {
//                   const newDocs = [...formData.businessDocuments]
//                   newDocs[2] = value
//                   handleChange("businessDocuments", newDocs)
//                 }}
//                 accept=".pdf,.jpg,.jpeg,.png"
//                 maxSize={5}
//                 helperText="Upload your PAN card (Max: 5MB)"
//               />
//             </div>
//           </div>
//         )
//       case 4:
//         return (
//           <div className="space-y-6">
//             <div>
//               <h3 className="text-lg font-medium">Personal Information</h3>
//               <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
//                 <div>
//                   <span className="font-medium">Full Name:</span>
//                   <p>{formData.fullName}</p>
//                 </div>
//                 <div>
//                   <span className="font-medium">Email:</span>
//                   <p>{formData.email}</p>
//                 </div>
//                 <div>
//                   <span className="font-medium">Phone Number:</span>
//                   <p>{formData.phoneNumber}</p>
//                 </div>
//                 <div>
//                   <span className="font-medium">Additional Contact:</span>
//                   <p>{formData.additionalContactNumber || "Not provided"}</p>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <h3 className="text-lg font-medium">Business Information</h3>
//               <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
//                 <div>
//                   <span className="font-medium">Business Name:</span>
//                   <p>{formData.businessName}</p>
//                 </div>
//                 <div>
//                   <span className="font-medium">Business Type:</span>
//                   <p>{formData.businessType}</p>
//                 </div>
//                 <div className="col-span-2">
//                   <span className="font-medium">Business Description:</span>
//                   <p>{formData.businessDescription}</p>
//                 </div>
//                 <div>
//                   <span className="font-medium">Registration Number:</span>
//                   <p>{formData.registrationNumber}</p>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <h3 className="text-lg font-medium">Location & Contact</h3>
//               <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
//                 <div className="col-span-2">
//                   <span className="font-medium">Address:</span>
//                   <p>{formData.address}</p>
//                 </div>
//                 <div>
//                   <span className="font-medium">City:</span>
//                   <p>{formData.city}</p>
//                 </div>
//                 <div>
//                   <span className="font-medium">State:</span>
//                   <p>{formData.state}</p>
//                 </div>
//                 <div>
//                   <span className="font-medium">Country:</span>
//                   <p>{formData.country}</p>
//                 </div>
//                 <div>
//                   <span className="font-medium">Pincode:</span>
//                   <p>{formData.pincode}</p>
//                 </div>
//                 <div>
//                   <span className="font-medium">Website:</span>
//                   <p>{formData.website || "Not provided"}</p>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <h3 className="text-lg font-medium">Documents</h3>
//               <div className="mt-2 space-y-2 text-sm">
//                 <p>
//                   <span className="font-medium">Business Logo:</span>{" "}
//                   {formData.businessLogo ? "Uploaded" : "Not uploaded"}
//                 </p>
//                 <p>
//                   <span className="font-medium">Business License:</span>{" "}
//                   {formData.businessDocuments[0] ? "Uploaded" : "Not uploaded"}
//                 </p>
//                 <p>
//                   <span className="font-medium">Aadhaar Card:</span>{" "}
//                   {formData.ownerIdProof ? "Uploaded" : "Not uploaded"}
//                 </p>
//                 <p>
//                   <span className="font-medium">GST Certificate:</span>{" "}
//                   {formData.businessDocuments[1] ? "Uploaded" : "Not uploaded"}
//                 </p>
//                 <p>
//                   <span className="font-medium">PAN Card:</span>{" "}
//                   {formData.businessDocuments[2] ? "Uploaded" : "Not uploaded"}
//                 </p>
//               </div>
//             </div>

//             <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:bg-amber-950 dark:border-amber-800">
//               <p className="text-amber-800 dark:text-amber-300">
//                 By submitting this form, you confirm that all information provided is accurate and complete. Your
//                 profile will be reviewed by our admin team for verification.
//               </p>
//             </div>
//           </div>
//         )
//       default:
//         return null
//     }
//   }

//   return (
//     <div className="space-y-8">
//       <div className="flex items-center justify-between">
//         <nav className="flex space-x-2">
//           {steps.map((step, index) => (
//             <button
//               key={step.id}
//               onClick={() => index < currentStep && setCurrentStep(index)}
//               disabled={index > currentStep}
//               className={cn(
//                 "flex h-9 items-center gap-1 rounded-lg px-3 text-sm font-medium",
//                 index === currentStep
//                   ? "bg-primary text-primary-foreground"
//                   : index < currentStep
//                     ? "text-primary hover:bg-muted"
//                     : "text-muted-foreground",
//               )}
//             >
//               <div className="flex h-5 w-5 items-center justify-center rounded-full border">
//                 {index < currentStep ? <Check className="h-3 w-3" /> : <span>{index + 1}</span>}
//               </div>
//               <span className="hidden md:inline">{step.name}</span>
//             </button>
//           ))}
//         </nav>
//       </div>

//       <Card>
//         <CardContent className="pt-6">{renderStepContent()}</CardContent>
//       </Card>

//       <div className="flex justify-between">
//         <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
//           Previous
//         </Button>

//         {currentStep === steps.length - 1 ? (
//           <Button onClick={handleSubmit} disabled={isSubmitting} className="gap-2">
//             {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
//             Submit for Verification
//           </Button>
//         ) : (
//           <Button onClick={handleNext} className="gap-1">
//             Next
//             <ChevronRight className="h-4 w-4" />
//           </Button>
//         )}
//       </div>
//     </div>
//   )
// }

