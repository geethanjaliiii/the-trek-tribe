"use client"

import { useState } from "react"
import { AlertCircle, Briefcase, MapPin, Tag, Users, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { VendorDetailsDialog } from "@/components/admin/dashboard/vendor-details-dialog"
import { pendingVendorRequests, vendors, clients, categories, locations, exampleVendorDetails } from "@/lib/data"

export default function DashboardPage() {
  const [selectedVendor, setSelectedVendor] = useState<any>(null)
  const [showVendorDetails, setShowVendorDetails] = useState(false)

  // View vendor details
  const openVendorDetails = (vendor: any) => {
    setSelectedVendor(vendor)
    setShowVendorDetails(true)
  }

  return (
    <>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage vendors, clients, categories, and locations for TheTrekTribe</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button className="h-9">Export Data</Button>
        </div>
      </div>

      {pendingVendorRequests.length > 0 && (
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader className="py-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              <CardTitle className="text-base text-amber-700">Pending Vendor Requests</CardTitle>
              <Badge className="ml-2 bg-amber-500">{pendingVendorRequests.length} New</Badge>
            </div>
            <CardDescription className="text-amber-600">
              You have {pendingVendorRequests.length} new vendor registration requests that need verification.
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vendors.length}</div>
            <p className="text-xs text-muted-foreground">
              {vendors.filter((v) => v.status === "active").length} active vendors
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.length}</div>
            <p className="text-xs text-muted-foreground">
              {clients.filter((c) => c.status === "active").length} active clients
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
            <p className="text-xs text-muted-foreground">
              {categories.reduce((acc, cat) => acc + cat.totalVendors, 0)} associated vendors
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Locations</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{locations.length}</div>
            <p className="text-xs text-muted-foreground">
              {locations.reduce((acc, loc) => acc + loc.totalTours, 0)} total tours
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vendor Verification Requests</CardTitle>
          <CardDescription>Review and verify new vendor registration requests</CardDescription>
        </CardHeader>
        <CardContent>
          {pendingVendorRequests.length === 0 ? (
            <div className="flex h-24 items-center justify-center text-muted-foreground">
              No pending vendor requests
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Business Name</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingVendorRequests.map((vendor) => (
                  <TableRow key={vendor.id}>
                    <TableCell className="font-medium">{vendor.businessName}</TableCell>
                    <TableCell>{vendor.fullName}</TableCell>
                    <TableCell>{vendor.email}</TableCell>
                    <TableCell>{vendor.businessType}</TableCell>
                    <TableCell>{new Date(vendor.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openVendorDetails({ ...exampleVendorDetails, ...vendor })}
                        >
                          View
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Check className="h-4 w-4 text-green-500" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <X className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <VendorDetailsDialog
        isOpen={showVendorDetails}
        onClose={() => setShowVendorDetails(false)}
        vendor={selectedVendor}
      />
    </>
  )
}

