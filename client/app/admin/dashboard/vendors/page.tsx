"use client"

import { useState } from "react"
import { Search, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { VendorDetailsDialog } from "@/components/admin/dashboard/vendor-details-dialog"
import { cn } from "@/lib/utils"
import { vendors, exampleVendorDetails, pendingVendorRequests } from "@/lib/data"

export default function VendorsPage() {
  const [selectedVendor, setSelectedVendor] = useState<any>(null)
  const [showVendorDetails, setShowVendorDetails] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  // View vendor details
  const openVendorDetails = (vendor: any) => {
    setSelectedVendor(vendor)
    setShowVendorDetails(true)
  }

  // Filter vendors based on active tab
  const filteredVendors =
    activeTab === "all"
      ? [...vendors, ...pendingVendorRequests]
      : activeTab === "pending"
        ? pendingVendorRequests
        : vendors.filter((vendor) => vendor.status === activeTab)

  return (
    <>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Vendors Management</h1>
          <p className="text-muted-foreground">Manage all vendor accounts and their verification status</p>
        </div>
        <div className="ml-auto flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search vendors..." className="pl-8 w-[200px] lg:w-[300px]" />
          </div>
          <Button>Add Vendor</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vendors</CardTitle>
          <CardDescription>Manage all vendor accounts and their verification status</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="mb-4" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All Vendors</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="blocked">Blocked</TabsTrigger>
            </TabsList>
          </Tabs>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Business Name</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell className="font-medium">{vendor.businessName}</TableCell>
                  <TableCell>{vendor.fullName}</TableCell>
                  <TableCell>{vendor.email}</TableCell>
                  <TableCell>{vendor.phoneNumber}</TableCell>
                  <TableCell>{vendor.businessType}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        vendor.status === "active" && "bg-green-500",
                        vendor.status === "blocked" && "bg-destructive",
                        vendor.status === "pending" && "bg-amber-500",
                      )}
                    >
                      {vendor.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {vendor.status === "pending" ? (
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
                    ) : (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            Actions
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openVendorDetails({ ...exampleVendorDetails, ...vendor })}>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          {vendor.status === "active" ? (
                            <DropdownMenuItem className="text-destructive">Block Vendor</DropdownMenuItem>
                          ) : vendor.status === "blocked" ? (
                            <DropdownMenuItem>Unblock Vendor</DropdownMenuItem>
                          ) : null}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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

