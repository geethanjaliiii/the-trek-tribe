"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"

const packages = [
  {
    id: 1,
    title: "Ladakh Bike Trip",
    image: "/placeholder.svg?height=300&width=500",
    days: 9,
    price: 35000,
    location: "Leh, Ladakh",
    rating: 4.9,
  },
  {
    id: 2,
    title: "Kerala Backwaters",
    image: "/placeholder.svg?height=300&width=500",
    days: 7,
    price: 28000,
    location: "Alleppey, Kerala",
    rating: 4.8,
  },
  {
    id: 3,
    title: "Golden Triangle Tour",
    image: "/placeholder.svg?height=300&width=500",
    days: 6,
    price: 25000,
    location: "Delhi-Agra-Jaipur",
    rating: 4.7,
  },
  {
    id: 4,
    title: "Spiti Valley Adventure",
    image: "/placeholder.svg?height=300&width=500",
    days: 10,
    price: 40000,
    location: "Himachal Pradesh",
    rating: 4.9,
  },
  {
    id: 5,
    title: "Goa Beach Retreat",
    image: "/placeholder.svg?height=300&width=500",
    days: 5,
    price: 22000,
    location: "North & South Goa",
    rating: 4.6,
  },
]

export default function TopPackages() {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % Math.max(packages.length - 2, 1))
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + packages.length - 2) % Math.max(packages.length - 2, 1))
  }

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-2">PACKAGES</h2>
            <h3 className="text-4xl font-bold">Top packages that fit you</h3>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={prevSlide} className="rounded-full">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextSlide} className="rounded-full">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 33.33}%)` }}
          >
            {packages.map((pkg) => (
              <div key={pkg.id} className="min-w-[100%] md:min-w-[50%] lg:min-w-[33.33%] p-4">
                <Card className="overflow-hidden h-full flex flex-col">
                  <div className="relative h-48">
                    <Image src={pkg.image || "/placeholder.svg"} alt={pkg.title} fill className="object-cover" />
                    <div className="absolute top-4 left-4 bg-primary text-white text-sm font-bold px-3 py-1 rounded-full">
                      ₹{pkg.price.toLocaleString()}
                    </div>
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-xl font-bold">{pkg.title}</h4>
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span>{pkg.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-muted-foreground mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-1"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      {pkg.location}
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-1"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span>{pkg.days} Days</span>
                      </div>
                    </div>
                    <Button className="mt-auto w-full">View Details</Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

