"use client"

import { useState } from "react"
import { ProfileWizard } from "@/components/vendor/dashboard/profile-wizard"

export default function ProfilePage() {
  // This would come from your auth context or API in a real app
  const [vendor, setVendor] = useState({
    fullName: "John Doe",
    email: "john@example.com",
    phoneNumber: "1234567890",
    password: "",
    additionalContactNumber: "",
    businessName: "",
    businessDescription: "",
    registrationNumber: "",
    businessType: "",
    businessDocuments: [],
    ownerIdProof: "",
    businessLogo: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    website: "",
    socialMediaLinks: [],
    isVerified: false,
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Complete Your Profile</h1>
      </div>

      <ProfileWizard vendor={vendor} />
    </div>
  )
}

