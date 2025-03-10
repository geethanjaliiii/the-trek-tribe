"use client"

import type React from "react"

import { SidebarProvider } from "@/components/vendor/dashboard/sidebar-provider"
import { DashboardSidebar } from "@/components/vendor/dashboard/dashboard-sidebar"
import { ProfileCompletionAlert } from "@/components/vendor/dashboard/profile-completion-alert"
import { useState } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // This would come from your auth context or API in a real app
  const [vendor, setVendor] = useState({
    isVerified: false,
    profileCompletion: 25, // Percentage of profile completed
    fullName: "John Doe",
    email: "john@example.com",
    phoneNumber: "1234567890",
    // Other vendor fields would be here
  })

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <DashboardSidebar isVerified={vendor.isVerified} />
        <div className="flex-1">
          {!vendor.isVerified && <ProfileCompletionAlert completion={vendor.profileCompletion} />}
          <main className="p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

