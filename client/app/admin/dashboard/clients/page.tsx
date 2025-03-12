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
import { useChangeStatusMutation, useGetAllUsersQuery } from "@/features/api/admin/adminApiSlice"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTab, setSelectedTab] = useState('all')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const[changeStatus]=useChangeStatusMutation()
  useEffect(()=>{
    const timer =setTimeout(()=>{
      setDebouncedSearchTerm(searchTerm)
    },500)
    return ()=>clearTimeout(timer)
  },[searchTerm])

    
  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearchTerm, selectedTab])

  const {data,error,isLoading,refetch} = useGetAllUsersQuery({
    userType:'client',
    page:currentPage,
    limit:pageSize,
    search:debouncedSearchTerm
  });
  
  // Refetch data when search term or pagination changes
  useEffect(() => {
    refetch()
  }, [debouncedSearchTerm, currentPage, pageSize, refetch])

    // Handle search input change
    const handleSearchChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value)
    }

const handlePrevPage =() =>{
if(currentPage>1){
  setCurrentPage(currentPage-1)
}
}
const handleNextPage =()=>{
  if(data?.totalPages && currentPage<data.totalPages){
    setCurrentPage(c=>c+1)
  }
}

  // Handle page size change
  const handlePageSizeChange = (size:number) => {
    setPageSize(size)
    setCurrentPage(1) // Reset to first page when changing page size
  }

  // pagenation calculation
  const totalItems=data?.totalPages ||0;
  const totalPages=data?.totalPages ||1;
  const startItem =((currentPage-1)*pageSize)+1;
  const endItem = Math.min(currentPage*pageSize,totalItems)

  const handleStatusChange=async(userType:string, userId:any)=>{
try {
  await changeStatus({userType,userId}).unwrap()
  toast.success('client status updated')
} catch (error) {
  console.log('user status updation failed',error)
  toast.error('user status updation failed');
  
}
  }
  if(isLoading) return <p>Loading...</p>;
  if(error) return <p>Error fetching Users</p>
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
            <Input type="search" 
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search clients..." className="pl-8 w-[200px] lg:w-[300px]" />
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Clients</CardTitle>
          <CardDescription>Manage all client accounts and their status</CardDescription>
        </CardHeader>
        <CardContent>
          {/* <Tabs defaultValue="all" className="mb-4">
            <TabsList>
              <TabsTrigger value="all">All Clients</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="blocked">Blocked</TabsTrigger>
            </TabsList>
          </Tabs> */}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Joined</TableHead>
                {/* <TableHead>Bookings</TableHead> */}
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.users.length>0?(
                data.users?.map((client:any) => (
                  <TableRow key={client._id}>
                    <TableCell className="font-medium">{client.fullName}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.phoneNumber||'nil'}</TableCell>
                    <TableCell>{new Date(client.createdAt).toLocaleDateString()}</TableCell>
                    {/* <TableCell>{client.bookings}</TableCell> */}
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
                          {/* <DropdownMenuItem>View Bookings</DropdownMenuItem> */}
                          {client.status === "active" ? (
                            <DropdownMenuItem className="text-destructive"
                            onClick={()=>handleStatusChange('client',client._id)}>Block Client</DropdownMenuItem>
                          ) : client.status === "blocked" ? (
                            <DropdownMenuItem
                            onClick={()=>handleStatusChange('client',client._id)}>Unblock Client</DropdownMenuItem>
                          ) : null}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ):( <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No clients found.
                </TableCell>
              </TableRow>)}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-sm text-muted-foreground">
            
          Showing <span className="font-medium">{totalItems > 0 ? startItem : 0}</span> to{" "}
          <span className="font-medium">{endItem}</span> of{" "}
              <span className="font-medium">{totalItems}</span> results
          </div>
          <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <div className="text-sm font-medium">
                Page {currentPage} of {totalPages}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleNextPage}
                disabled={currentPage >= totalPages}
              >
                Next
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    {pageSize} per page
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {[10, 20, 30, 50, 100].map((size) => (
                    <DropdownMenuItem 
                      key={size} 
                      onClick={() => handlePageSizeChange(size)}
                    >
                      {size} per page
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
          </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

