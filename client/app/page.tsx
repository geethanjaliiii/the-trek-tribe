"use client"

import { motion } from "framer-motion"
import { Parallax } from "react-parallax"
import { useInView } from "react-intersection-observer"
import { Users, Heart, PersonStanding, MapPin, Calendar, Star, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function LandingPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Parallax
        blur={0}
        bgImage="/placeholder.svg?height=1080&width=1920"
        bgImageAlt="Mountain landscape"
        strength={200}
        className="h-screen"
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="container relative flex h-screen items-center justify-center text-center">
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl"
            >
              The Trek Tribe
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mx-auto max-w-2xl text-lg text-white/90"
            >
              Embark on unforgettable adventures with our curated trekking experiences
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.8 }}>
              <Button size="lg" className="rounded-full bg-primary text-white">
                Explore Trails
              </Button>
            </motion.div>
          </div>
        </div>
      </Parallax>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container">
          <motion.h2
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeIn}
            className="mb-12 text-center text-3xl font-bold"
          >
            Choose Your Adventure Style
          </motion.h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: Users, title: "Family Adventures", desc: "Bond over breathtaking views" },
              { icon: Heart, title: "Couple Retreats", desc: "Romantic mountain getaways" },
              { icon: PersonStanding, title: "Solo Expeditions", desc: "Find yourself in nature" },
            ].map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="group relative overflow-hidden p-6 text-center transition-transform hover:-translate-y-2">
                  <category.icon className="mx-auto mb-4 h-12 w-12 text-primary" />
                  <h3 className="mb-2 text-xl font-semibold">{category.title}</h3>
                  <p className="text-muted-foreground">{category.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Treks */}
      <section className="bg-muted py-20">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold">Popular Treks</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Himalayan Heights",
                location: "Nepal",
                duration: "7 days",
                difficulty: "Moderate",
                price: "$1,299",
              },
              {
                title: "Alpine Adventure",
                location: "Switzerland",
                duration: "5 days",
                difficulty: "Easy",
                price: "$999",
              },
              {
                title: "Andes Expedition",
                location: "Peru",
                duration: "10 days",
                difficulty: "Challenging",
                price: "$1,799",
              },
            ].map((trek, index) => (
              <motion.div
                key={trek.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt={trek.title}
                    width={400}
                    height={300}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-semibold">{trek.title}</h3>
                    <div className="mb-4 space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-2 h-4 w-4" />
                        {trek.location}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-2 h-4 w-4" />
                        {trek.duration}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">{trek.price}</span>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Stories */}
      <section className="py-20">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold">Travel Stories</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((story) => (
              <motion.div key={story} whileHover={{ scale: 1.02 }} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Travel story"
                    width={600}
                    height={400}
                    className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 p-6 text-white">
                    <h3 className="mb-2 text-xl font-semibold">Mountain Tales</h3>
                    <p className="mb-2 text-sm text-white/90">A solo trekker's journey through the Himalayas</p>
                    <div className="flex items-center text-sm">
                      <Star className="mr-1 h-4 w-4" />
                      <span>4.9</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <Parallax
        blur={0}
        bgImage="/placeholder.svg?height=600&width=1920"
        bgImageAlt="Mountain sunset"
        strength={200}
        className="py-20"
      >
        <div className="container relative py-20">
          <div className="mx-auto max-w-2xl text-center text-white">
            <h2 className="mb-6 text-3xl font-bold sm:text-4xl">Ready for Your Next Adventure?</h2>
            <p className="mb-8 text-lg text-white/90">
              Join The Trek Tribe community and discover incredible hiking trails around the world
            </p>
            <Button size="lg" className="rounded-full bg-white text-primary hover:bg-white/90">
              Start Planning
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Parallax>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold">What Trekkers Say</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Alex Thompson",
                type: "Solo Trekker",
                text: "The Trek Tribe made my solo hiking dreams come true. Incredible experience!",
              },
              {
                name: "Sarah & Mike",
                type: "Couple Adventurers",
                text: "Perfect blend of adventure and romance. We couldn't have asked for more.",
              },
              {
                name: "The Williams Family",
                type: "Family Group",
                text: "Our kids loved every moment. Safe, fun, and educational!",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="p-6">
                  <div className="mb-4 flex items-center">
                    <div className="mr-4 h-12 w-12 overflow-hidden rounded-full bg-primary/10">
                      <Image
                        src="/placeholder.svg?height=48&width=48"
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.type}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{testimonial.text}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

