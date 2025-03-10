"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Compass,
  LayoutDashboard,
  LogOut,
  MapPin,
  Settings,
  Tag,
  Users,
  Menu,
  Bell,
  Briefcase,
  UserCheck,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Main navigation items
const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Vendors",
    href: "/dashboard/vendors",
    icon: Briefcase,
  },
  {
    title: "Clients",
    href: "/dashboard/clients",
    icon: Users,
  },
  {
    title: "Categories",
    href: "/dashboard/categories",
    icon: Tag,
  },
  {
    title: "Locations",
    href: "/dashboard/locations",
    icon: MapPin,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

// Demo data for notifications
const pendingVendorRequests = [
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

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4 md:px-8">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="mr-2 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <div className="flex h-full flex-col">
                <div className="flex items-center border-b px-6 py-4">
                  <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                    <Compass className="h-6 w-6" />
                    <span>TheTrekTribe</span>
                  </Link>
                </div>
                <nav className="grid gap-2 px-4 py-4">
                  {navItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                        pathname === item.href ? "bg-muted font-medium text-primary" : "text-muted-foreground",
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
              <Compass className="h-6 w-6 text-primary hidden md:block" />
              <span className="hidden md:inline-block">TheTrekTribe</span>
              <span className="md:hidden">TT</span>
              <span className="text-xs text-muted-foreground">Admin</span>
            </Link>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <div className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Notifications</span>
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                      {pendingVendorRequests.length}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="flex items-center justify-between p-2 px-3 font-semibold">
                    <span>Notifications</span>
                    <Badge>{pendingVendorRequests.length} New</Badge>
                  </div>
                  <ScrollArea className="h-80">
                    {pendingVendorRequests.map((vendor) => (
                      <div key={vendor.id} className="flex items-start gap-3 p-3 border-t">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <UserCheck className="h-4 w-4 text-primary" />
                        </div>
                        <div className="grid gap-1">
                          <p className="text-sm font-medium leading-none">New Vendor Registration</p>
                          <p className="text-sm text-muted-foreground">
                            {vendor.fullName} ({vendor.businessName})
                          </p>
                          <p className="text-xs text-muted-foreground">{new Date(vendor.createdAt).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" alt="Admin" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="grid flex-1 md:grid-cols-[240px_1fr]">
        <aside className="hidden border-r bg-muted/40 md:block">
          <nav className="grid gap-2 p-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                  pathname === item.href ? "bg-muted font-medium text-primary" : "text-muted-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex flex-col gap-6 p-4 md:gap-8 md:p-8">{children}</main>
      </div>
    </div>
  )
}

