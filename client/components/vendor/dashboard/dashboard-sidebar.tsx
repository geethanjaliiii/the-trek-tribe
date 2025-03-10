"use client"

import { useSidebar } from "./sidebar-provider"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Home, Package, Users, Calendar, Settings, Menu, X, LogOut, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface DashboardSidebarProps {
  isVerified: boolean
}

export function DashboardSidebar({ isVerified }: DashboardSidebarProps) {
  const pathname = usePathname()
  const { open, setOpen, mobileOpen, setMobileOpen } = useSidebar()

  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/vendor/dashboard",
      active: pathname === "/vendor/dashboard",
      disabled: false,
    },
    {
      label: "Profile",
      icon: User,
      href: "/vendor/dashboard/profile",
      active: pathname === "/vendor/dashboard/profile",
      disabled: false,
    },
    {
      label: "Packages",
      icon: Package,
      href: "/vendor/dashboard/packages",
      active: pathname === "/vendor/dashboard/packages",
      disabled: !isVerified,
    },
    {
      label: "Clients",
      icon: Users,
      href: "/vendor/dashboard/clients",
      active: pathname === "/vendor/dashboard/clients",
      disabled: !isVerified,
    },
    {
      label: "Bookings",
      icon: Calendar,
      href: "/vendor/dashboard/bookings",
      active: pathname === "/vendor/dashboard/bookings",
      disabled: !isVerified,
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/vendor/dashboard/settings",
      active: pathname === "vendor/dashboard/settings",
      disabled: !isVerified,
    },
  ]

  return (
    <>
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="p-0">
          <div className="flex h-full flex-col">
            <div className="flex h-14 items-center border-b px-4">
              <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                <span className="text-xl">TravelVendor</span>
              </Link>
              <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setMobileOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid items-start px-2 text-sm font-medium">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.disabled ? "#" : route.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                      route.active
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      route.disabled && "pointer-events-none opacity-50",
                    )}
                  >
                    <route.icon className="h-4 w-4" />
                    {route.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="mt-auto p-4 border-t">
              <div className="flex items-center gap-3 mb-4">
                <Avatar>
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">john@example.com</p>
                </div>
              </div>
              <Button variant="outline" className="w-full justify-start gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <aside
        className={cn(
          "hidden lg:flex flex-col border-r bg-background h-screen sticky top-0 w-64 transition-all duration-300",
          !open && "w-16",
        )}
      >
        <div className="flex h-14 items-center border-b px-4">
          {open ? (
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
              <span className="text-xl">TravelVendor</span>
            </Link>
          ) : null}
          <Button
            variant="ghost"
            size="icon"
            className={cn("ml-auto", !open && "mx-auto")}
            onClick={() => setOpen(!open)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.disabled ? "#" : route.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                  route.active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  route.disabled && "pointer-events-none opacity-50",
                )}
              >
                <route.icon className="h-4 w-4" />
                {open && route.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4 border-t">
          {open ? (
            <div className="flex items-center gap-3 mb-4">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">john@example.com</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center mb-4">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          )}
          <Button variant="outline" className="w-full justify-start gap-2">
            <LogOut className="h-4 w-4" />
            {open && "Logout"}
          </Button>
        </div>
      </aside>

      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 lg:hidden z-50 rounded-full h-12 w-12 shadow-lg"
        onClick={() => setMobileOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>
    </>
  )
}

