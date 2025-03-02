"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Adventure Enthusiast",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "The team at Trail made our Ladakh trip unforgettable. The guides were knowledgeable and the itinerary was perfectly balanced. I'll definitely be booking with them again!",
  },
  {
    id: 2,
    name: "Rahul Mehta",
    role: "Photography Blogger",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "As a photographer, I was looking for unique perspectives and Trail delivered beyond expectations. The Kerala backwaters tour was a visual feast and our guide knew all the best spots.",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    role: "Family Traveler",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "We were worried about traveling with kids, but Trail made it so easy. The family-friendly itinerary in Goa had something for everyone, and the accommodations were perfect.",
  },
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 px-4 bg-muted">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-primary mb-2">REVIEWS</h2>
        <h3 className="text-4xl font-bold mb-12">What our clients say</h3>

        <div className="relative max-w-3xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="min-w-full px-4">
                  <Card className="bg-background">
                    <CardContent className="pt-6 px-6 pb-8">
                      <div className="flex flex-col items-center">
                        <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <blockquote className="text-lg italic mb-6">"{testimonial.quote}"</blockquote>
                        <div>
                          <h4 className="font-bold">{testimonial.name}</h4>
                          <p className="text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-background shadow-lg z-10"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full bg-background shadow-lg z-10"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}

