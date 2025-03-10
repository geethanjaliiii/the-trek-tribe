"use client"

import * as React from "react"

type SidebarContext = {
  open: boolean
  setOpen: (open: boolean) => void
  mobileOpen: boolean
  setMobileOpen: (open: boolean) => void
}

const SidebarContext = React.createContext<SidebarContext | undefined>(undefined)

export function SidebarProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = React.useState(true)
  const [mobileOpen, setMobileOpen] = React.useState(false)

  return (
    <SidebarContext.Provider value={{ open, setOpen, mobileOpen, setMobileOpen }}>{children}</SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

