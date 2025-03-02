"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const destinations = [
  {
    id: 1,
    name: "Everest Base Camp, Nepal",
    image: "/placeholder.svg?height=400&width=600",
    location: "Khumbu, Nepal",
    rating: 4.9,
  },
  {
    id: 2,
    name: "Markha Valley Trek, Ladakh",
    image: "/placeholder.svg?height=400&width=600",
    location: "Ladakh, India",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Valley of Flowers, Uttarakhand",
    image: "/placeholder.svg?height=400&width=600",
    location: "Uttarakhand, India",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Hampta Pass, Himachal Pradesh",
    image: "/placeholder.svg?height=400&width=600",
    location: "Himachal Pradesh, India",
    rating: 4.6,
  },
  {
    id: 5,
    name: "Goechala Trek, Sikkim",
    image: "/placeholder.svg?height=400&width=600",
    location: "Sikkim, India",
    rating: 4.8,
  },
]

export default function PopularDestinations() {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % Math.max(destinations.length - 2, 1))
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + destinations.length - 2) % Math.max(destinations.length - 2, 1))
  }

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-2">HIGHLIGHTS</h2>
            <h3 className="text-4xl font-bold">Most Popular Trekking Destinations</h3>
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
            {destinations.map((destination) => (
              <div key={destination.id} className="min-w-[100%] md:min-w-[50%] lg:min-w-[33.33%] p-4">
                <Card className="overflow-hidden h-full">
                  <div className="relative h-64">
                    <Image
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                      <h4 className="text-xl font-bold">{destination.name}</h4>
                      <p className="flex items-center">
                        <span className="mr-1">
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
                            className="inline-block"
                          >
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                        </span>
                        {destination.location}
                      </p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="font-medium">{destination.rating}</span>
                        <span className="text-muted-foreground ml-1">(120+ reviews)</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-primary">
                        View Details
                      </Button>
                    </div>
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

