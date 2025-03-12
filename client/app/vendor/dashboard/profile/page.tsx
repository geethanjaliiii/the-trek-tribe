"use client"

import { ProfileWizard } from "@/components/vendor/dashboard/profile-setup"
import { useGetVendorDetailsQuery } from "@/features/api/vendor/vendorApiSlice";
import { VendorVerificationValues } from "@/types/Vendor";
import { useEffect, useState } from "react"

export default function ProfilePage() {
  // This would come from your auth context or API in a real app
  // const [vendor, setVendor] = useState({
  //   fullName: "John Doe",
  //   email: "john@example.com",
  //   phoneNumber: "1234567890",
  //   password: "",
  //   additionalContactNumber: "",
  //   businessName: "",
  //   businessDescription: "",
  //   registrationNumber: "",
  //   businessType: "",
  //   businessDocuments: [],
  //   ownerIdProof: "",
  //   businessLogo: "",
  //   address: "",
  //   city: "",
  //   state: "",
  //   country: "",
  //   pincode: "",
  //   website: "",
  //   socialMediaLinks: [],
  //   isVerified: false,
  // })
  const defaultVendor:VendorVerificationValues = {
    fullName: "",
    email: "",
    phoneNumber: "",
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
    socialMediaLinks: [] ,
  };
  const [vendor, setVendor] = useState(defaultVendor)
  const { data, error, isLoading: loading } = useGetVendorDetailsQuery();

  useEffect(() => {
    if (data?.vendor) {
      setVendor((prevVendor) => ({
        ...prevVendor,
        ...data.vendor, // Merge new vendor data with previous state
      }));
    }
  }, [data]);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log("error fetching vendor", error)

    return <div>Error loading data...</div>;
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Complete Your Profile</h1>
      </div>

      <ProfileWizard vendor={vendor} loading={loading} />
    </div>
  )
}

