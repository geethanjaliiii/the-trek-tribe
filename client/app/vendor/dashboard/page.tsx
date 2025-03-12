'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Package, Users, Calendar } from "lucide-react"
import Link from "next/link"
import { useSelector } from "react-redux"
import { isVendorVerified } from "@/features/auth/authSlice"

export default function VendorDashboardPage() {
  // In a real app, this would be fetched from your API
  const isVerified = useSelector(isVendorVerified);
  

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      {!isVerified ? (
        <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950 dark:border-amber-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              Account Verification Required
            </CardTitle>
            <CardDescription className="text-amber-700 dark:text-amber-400">
              Complete your profile to unlock all features and start receiving bookings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/vendor/dashboard/profile">Complete Your Profile</Link>
            </Button>
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className={isVerified ? "" : "opacity-50 pointer-events-none"}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Packages
            </CardTitle>
            <CardDescription>Manage your travel packages</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">Active packages</p>
            {!isVerified && <p className="text-sm text-amber-600 mt-2">Complete profile verification to access</p>}
          </CardContent>
        </Card>

        <Card className={isVerified ? "" : "opacity-50 pointer-events-none"}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Clients
            </CardTitle>
            <CardDescription>Manage your clients</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">Total clients</p>
            {!isVerified && <p className="text-sm text-amber-600 mt-2">Complete profile verification to access</p>}
          </CardContent>
        </Card>

        <Card className={isVerified ? "" : "opacity-50 pointer-events-none"}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Bookings
            </CardTitle>
            <CardDescription>Manage your bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm text-muted-foreground">Pending bookings</p>
            {!isVerified && <p className="text-sm text-amber-600 mt-2">Complete profile verification to access</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}



