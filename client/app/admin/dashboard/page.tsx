// "use client"

// import { useState } from "react"
// import { Bar, Line } from "react-chartjs-2"
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js"
// import { Calendar, Globe, Map, TrendingUp, Users } from 'lucide-react'

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { AdminLayout } from "@/components/admin-layout"

// // Register ChartJS components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// )

// export default function Dashboard() {
//   const [bookingsChartData] = useState({
//     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
//     datasets: [
//       {
//         label: "Bookings",
//         data: [65, 59, 80, 81, 56, 55, 70, 90, 110, 95, 85, 105],
//         borderColor: "rgb(99, 102, 241)",
//         backgroundColor: "rgba(99, 102, 241, 0.5)",
//       },
//     ],
//   })

//   const [revenueChartData] = useState({
//     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
//     datasets: [
//       {
//         label: "Revenue",
//         data: [12500, 11000, 15000, 16000, 11500, 10500, 14000, 18000, 22000, 19000, 17000, 21000],
//         backgroundColor: "rgba(34, 197, 94, 0.5)",
//       },
//     ],
//   })

//   const [popularDestinations] = useState([
//     { name: "Himalayan Trek", bookings: 245, growth: 12.5 },
//     { name: "Amazon Rainforest", bookings: 186, growth: 8.3 },
//     { name: "Machu Picchu", bookings: 152, growth: 5.7 },
//     { name: "Serengeti Safari", bookings: 132, growth: 9.2 },
//     { name: "New Zealand Trails", bookings: 121, growth: 7.8 },
//   ])

//   return (
//     <AdminLayout>
//       <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
//         <div className="flex items-center justify-between space-y-2">
//           <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
//           <div className="flex items-center space-x-2">
//             <Button>Download Report</Button>
//           </div>
//         </div>
        
//         <Tabs defaultValue="overview" className="space-y-4">
//           <TabsList>
//             <TabsTrigger value="overview">Overview</TabsTrigger>
//             <TabsTrigger value="analytics">Analytics</TabsTrigger>
//             <TabsTrigger value="reports">Reports</TabsTrigger>
//           </TabsList>
          
//           <TabsContent value="overview" className="space-y-4">
//             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
//                   <Calendar className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">1,248</div>
//                   <p className="text-xs text-muted-foreground">+18.2% from last month</p>
//                 </CardContent>
//               </Card>
              
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">Revenue</CardTitle>
//                   <TrendingUp className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">$45,231.89</div>
//                   <p className="text-xs text-muted-foreground">+20.1% from last month</p>
//                 </CardContent>
//               </Card>
              
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">Active Users</CardTitle>
//                   <Users className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">2,350</div>
//                   <p className="text-xs text-muted-foreground">+10.5% from last month</p>
//                 </CardContent>
//               </Card>
              
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">Active Destinations</CardTitle>
//                   <Globe className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">42</div>
//                   <p className="text-xs text-muted-foreground">+2 new destinations</p>
//                 </CardContent>
//               </Card>
//             </div>
            
//             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
//               <Card className="col-span-4">
//                 <CardHeader>
//                   <CardTitle>Bookings Overview</CardTitle>
//                 </CardHeader>
//                 <CardContent className="pl-2">
//                   <Line 
//                     options={{
//                       responsive: true,
//                       maintainAspectRatio: false,
//                       scales: {
//                         y: {
//                           beginAtZero: true,
//                         },
//                       },
//                     }}
//                     data={bookingsChartData}
//                     height={300}
//                   />
//                 </CardContent>
//               </Card>
              
//               <Card className="col-span-3">
//                 <CardHeader>
//                   <CardTitle>Popular Destinations</CardTitle>
//                   <CardDescription>Top performing trek destinations this month</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     {popularDestinations.map((destination) => (
//                       <div key={destination.name} className="flex items-center">
//                         <div className="w-full flex items-center justify-between">
//                           <div className="space-y-1">
//                             <p className="text-sm font-medium leading-none">{destination.name}</p>
//                             <p className="text-sm text-muted-foreground">
//                               {destination.bookings} bookings
//                             </p>
//                           </div>
//                           <div className="ml-auto font-medium text-green-500">
//                             +{destination.growth}%
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
            
//             <div className="grid gap-4 grid-cols-1">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Revenue</CardTitle>
//                   <CardDescription>Monthly revenue breakdown</CardDescription>
//                 </CardHeader>
//                 <CardContent className="pl-2">
//                   <Bar
//                     options={{
//                       responsive: true,
//                       maintainAspectRatio: false,
//                       scales: {
//                         y: {
//                           beginAtZero: true,
//                         },
//                       },
//                     }}
//                     data={revenueChartData}
//                     height={300}
//                   />
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>
          
//           <TabsContent value="analytics" className="space-y-4">
//             <Card className="p-6">
//               <h3 className="text-xl font-bold mb-4">Analytics Dashboard</h3>
//               <p>Detailed analytics content will appear here.</p>
//             </Card>
//           </TabsContent>
          
//           <TabsContent value="reports" className="space-y-4">
//             <Card className="p-6">
//               <h3 className="text-xl font-bold mb-4">Reports</h3>
//               <p>Report generation tools will appear here.</p>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </AdminLayout>
//   )
// }
