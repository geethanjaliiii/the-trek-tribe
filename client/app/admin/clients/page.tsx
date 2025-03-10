"use client"

import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { clients } from "@/lib/data"

export default function ClientsPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Clients Management</h1>
          <p className="text-muted-foreground">Manage all client accounts and their status</p>
        </div>
        <div className="ml-auto flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search clients..." className="pl-8 w-[200px] lg:w-[300px]" />
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Clients</CardTitle>
          <CardDescription>Manage all client accounts and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="mb-4">
            <TabsList>
              <TabsTrigger value="all">All Clients</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="blocked">Blocked</TabsTrigger>
            </TabsList>
          </Tabs>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Bookings</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.phoneNumber}</TableCell>
                  <TableCell>{new Date(client.joinedAt).toLocaleDateString()}</TableCell>
                  <TableCell>{client.bookings}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        client.status === "active" && "bg-green-500",
                        client.status === "blocked" && "bg-destructive",
                      )}
                    >
                      {client.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>View Bookings</DropdownMenuItem>
                        {client.status === "active" ? (
                          <DropdownMenuItem className="text-destructive">Block Client</DropdownMenuItem>
                        ) : client.status === "blocked" ? (
                          <DropdownMenuItem>Unblock Client</DropdownMenuItem>
                        ) : null}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}

