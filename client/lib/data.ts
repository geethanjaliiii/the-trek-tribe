import { vendorBusinessSchema, vendorDocumentSchema, vendorLocationSchema, vendorPersonalSchema } from "@/schemas/vendor/vendorSchema"
import * as Yup from "yup";

// Demo data for the admin panel
export const pendingVendorRequests = [
    {
      id: "v1",
      fullName: "John Doe",
      email: "john@trekagency.com",
      phoneNumber: "+1 234 567 8901",
      businessName: "Adventure Trek Solutions",
      businessType: "Tour Operator",
      createdAt: "2023-10-05T09:30:00Z",
      status: "pending",
    },
    {
      id: "v2",
      fullName: "Maria Garcia",
      email: "maria@hikexperts.com",
      phoneNumber: "+1 345 678 9012",
      businessName: "HikExperts",
      businessType: "Adventure Guide",
      createdAt: "2023-10-04T11:45:00Z",
      status: "pending",
    },
    {
      id: "v3",
      fullName: "Rahul Sharma",
      email: "rahul@himalayantreks.com",
      phoneNumber: "+91 98765 43210",
      businessName: "Himalayan Treks",
      businessType: "Tour Operator",
      createdAt: "2023-10-03T14:20:00Z",
      status: "pending",
    },
  ]
  
  export const vendors = [
    {
      id: "v4",
      fullName: "Jane Smith",
      email: "jane@worldtours.com",
      phoneNumber: "+1 456 789 0123",
      businessName: "World Tours Inc.",
      businessType: "Tour Operator",
      status: "active",
      verifiedAt: "2023-09-15T10:30:00Z",
    },
    {
      id: "v5",
      fullName: "David Wilson",
      email: "david@explorers.com",
      phoneNumber: "+1 567 890 1234",
      businessName: "Explorers United",
      businessType: "Adventure Guide",
      status: "active",
      verifiedAt: "2023-09-10T09:15:00Z",
    },
    {
      id: "v6",
      fullName: "Priya Patel",
      email: "priya@indiaadventures.com",
      phoneNumber: "+91 87654 32109",
      businessName: "India Adventures",
      businessType: "Tour Operator",
      status: "blocked",
      verifiedAt: "2023-08-20T11:45:00Z",
      blockedAt: "2023-10-01T16:30:00Z",
    },
  ]
  
  export const clients = [
    {
      id: "c1",
      name: "Michael Brown",
      email: "michael@example.com",
      phoneNumber: "+1 678 901 2345",
      joinedAt: "2023-09-01T10:00:00Z",
      bookings: 3,
      status: "active",
    },
    {
      id: "c2",
      name: "Emily Johnson",
      email: "emily@example.com",
      phoneNumber: "+1 789 012 3456",
      joinedAt: "2023-08-15T14:30:00Z",
      bookings: 5,
      status: "active",
    },
    {
      id: "c3",
      name: "Carlos Rodriguez",
      email: "carlos@example.com",
      phoneNumber: "+1 890 123 4567",
      joinedAt: "2023-07-10T09:15:00Z",
      bookings: 2,
      status: "blocked",
      blockedAt: "2023-10-02T13:45:00Z",
    },
  ]
  
  export const categories = [
    { id: "cat1", name: "Hiking", description: "Hiking and trekking adventures", totalVendors: 12 },
    { id: "cat2", name: "Mountain Climbing", description: "Mountain and rock climbing experiences", totalVendors: 8 },
    { id: "cat3", name: "Wildlife Safari", description: "Wildlife viewing and safari tours", totalVendors: 15 },
    { id: "cat4", name: "Beach Retreats", description: "Coastal and island getaways", totalVendors: 10 },
    { id: "cat5", name: "Cultural Tours", description: "Historical and cultural experiences", totalVendors: 14 },
  ]
  
  export const locations = [
    { id: "loc1", name: "Himalayan Range", country: "Nepal/India", totalVendors: 18, totalTours: 45 },
    { id: "loc2", name: "Swiss Alps", country: "Switzerland", totalVendors: 12, totalTours: 30 },
    { id: "loc3", name: "Serengeti", country: "Tanzania", totalVendors: 9, totalTours: 22 },
    { id: "loc4", name: "Bali", country: "Indonesia", totalVendors: 15, totalTours: 38 },
    { id: "loc5", name: "Machu Picchu", country: "Peru", totalVendors: 7, totalTours: 18 },
  ]
  
  // Example vendor full details (for the dialog)
  export const exampleVendorDetails = {
    fullName: "John Doe",
    email: "john@trekagency.com",
    phoneNumber: "+1 234 567 8901",
    additionalContactNumber: "+1 234 567 8902",
    password: "********", // Don't actually store/display passwords in production
    businessName: "Adventure Trek Solutions",
    businessDescription:
      "We provide premium adventure treks around the world with expert guides and personalized experiences.",
    registrationNumber: "BUS12345678",
    businessType: "Tour Operator",
    businessDocuments: ["business_license.pdf", "tax_registration.pdf"],
    ownerIdProof: "passport.jpg",
    businessLogo: "/placeholder.svg?height=100&width=100",
    address: "123 Adventure Street",
    city: "Denver",
    state: "Colorado",
    country: "United States",
    pincode: "80202",
    website: "www.adventuretrek.com",
    socialMediaLinks: ["facebook.com/adventuretrek", "instagram.com/adventuretrek"],
  }
  
    export const steps = [
      {
        id: "personal",
        name: "Personal Information",
        fields: ["fullName", "email", "phoneNumber", "additionalContactNumber"],
        validationSchema: vendorPersonalSchema,
      },
      {
        id: "business",
        name: "Business Information",
        fields: [
          "businessName",
          "businessDescription",
          "registrationNumber",
          "businessType",
        ],
        validationSchema: vendorBusinessSchema,
      },
      {
        id: "location",
        name: "Location & Contact",
        fields: ["address", "city", "state", "country", "pincode", "website"],
        validationSchema: vendorLocationSchema,
      },
      {
        id: "documents",
        name: "Document Verification",
        fields: ["businessDocuments", "ownerIdProof", "businessLogo"],
        validationSchema: vendorDocumentSchema,
      },
      {
        id: "review",
        name: "Review & Submit",
        fields: [],
        validationSchema: Yup.object({}),
      },
    ];

      export const businessTypes = [
        "Tour Operator",
        "Travel Agency",
        "Hotel/Resort",
        "Transportation Provider",
        "Activity Provider",
        "Other",
      ];
    
      export const countries = [
        "India",
        "United States",
        "United Kingdom",
        "Australia",
        "Canada",
        "Singapore",
        "Other",
      ];