"use client"
import Link from "next/link"
import { FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface VendorDetailsDialogProps {
  isOpen: boolean
  onClose: () => void
  vendor: any
}

export function VendorDetailsDialog({ isOpen, onClose, vendor }: VendorDetailsDialogProps) {
  if (!vendor) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Vendor Details</DialogTitle>
          <DialogDescription>Review vendor information and verification documents</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Business Information</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 text-sm">
                <div className="grid grid-cols-3 items-center gap-4">
                  <span className="font-medium text-muted-foreground">Business Name:</span>
                  <span className="col-span-2">{vendor.businessName}</span>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <span className="font-medium text-muted-foreground">Business Type:</span>
                  <span className="col-span-2">{vendor.businessType}</span>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <span className="font-medium text-muted-foreground">Registration No:</span>
                  <span className="col-span-2">{vendor.registrationNumber}</span>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <span className="font-medium text-muted-foreground">Description:</span>
                  <span className="col-span-2">{vendor.businessDescription}</span>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <span className="font-medium text-muted-foreground">Website:</span>
                  <Link href={vendor.website} className="col-span-2 text-blue-600">
                    {vendor.website}
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 text-sm">
                <div className="grid grid-cols-3 items-center gap-4">
                  <span className="font-medium text-muted-foreground">Owner Name:</span>
                  <span className="col-span-2">{vendor.fullName}</span>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <span className="font-medium text-muted-foreground">Email:</span>
                  <span className="col-span-2">{vendor.email}</span>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <span className="font-medium text-muted-foreground">Phone:</span>
                  <span className="col-span-2">{vendor.phoneNumber}</span>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <span className="font-medium text-muted-foreground">Alt. Phone:</span>
                  <span className="col-span-2">{vendor.additionalContactNumber}</span>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <span className="font-medium text-muted-foreground">Social Media:</span>
                  <div className="col-span-2">
                    {vendor.socialMediaLinks?.map((link: string, index: number) => (
                      <div key={index} className="text-blue-600">
                        {link}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Address</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 text-sm">
                <div className="grid grid-cols-3 items-center gap-4">
                  <span className="font-medium text-muted-foreground">Address:</span>
                  <span className="col-span-2">{vendor.address}</span>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <span className="font-medium text-muted-foreground">City:</span>
                  <span className="col-span-2">{vendor.city}</span>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <span className="font-medium text-muted-foreground">State:</span>
                  <span className="col-span-2">{vendor.state}</span>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <span className="font-medium text-muted-foreground">Country:</span>
                  <span className="col-span-2">{vendor.country}</span>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <span className="font-medium text-muted-foreground">Postal Code:</span>
                  <span className="col-span-2">{vendor.pincode}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Documents</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 text-sm">
                <div className="grid grid-cols-3 items-start gap-4">
                  <span className="font-medium text-muted-foreground">Business Logo:</span>
                  <div className="col-span-2">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={vendor.businessLogo} />
                      <AvatarFallback>BL</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <span className="font-medium text-muted-foreground">ID Proof:</span>
                  <div className="col-span-2 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>{vendor.ownerIdProof}</span>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-3 items-start gap-4">
                  <span className="font-medium text-muted-foreground">Business Docs:</span>
                  <div className="col-span-2 grid gap-2">
                    {vendor.businessDocuments?.map((doc: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span>{doc}</span>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive">Reject</Button>
          <Button>Approve Vendor</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

