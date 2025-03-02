"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ParallaxPackagesProps {
  scrollYProgress: MotionValue<number>
}

const packages = [
  {
    id: 1,
    title: "Himalayan Adventure",
    location: "Himachal Pradesh",
    duration: "7 Days",
    price: 24999,
    rating: 4.8,
    reviews: 124,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    title: "Kerala Backwaters",
    location: "Kerala",
    duration: "5 Days",
    price: 19999,
    rating: 4.9,
    reviews: 89,
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    title: "Golden Triangle Tour",
    location: "Delhi-Agra-Jaipur",
    duration: "6 Days",
    price: 22999,
    rating: 4.7,
    reviews: 156,
    image: "/placeholder.svg?height=400&width=600",
  },
]

export default function ParallaxPackages({ scrollYProgress }: ParallaxPackagesProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(sectionProgress, [0, 1], [100, -100])
  const opacity = useTransform(sectionProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(sectionProgress, [0, 0.5, 1], [0.9, 1, 0.9])

  // Staggered card animations
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  }

  return (
    <section id="packages" ref={sectionRef} className="py-20 px-4 relative overflow-hidden">
      {/* Parallax Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y, opacity }}>
        <div className="absolute inset-0 bg-gradient-to-b from-background to-[#0f172a]/30" />
        <Image
          src="/bg-images/sec.jpg?height=1080&width=1920"
          alt="Mountains background"
          fill
          className="object-cover opacity-20"
        />
      </motion.div>

      <motion.div className="max-w-7xl mx-auto relative z-10" style={{ scale }}>
        <div className="text-center mb-16">
          <motion.h2
            className="text-2xl font-bold text-primary mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            TOP PACKAGES
          </motion.h2>
          <motion.h3
            className="text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Curated Travel Experiences
          </motion.h3>
          <motion.p
            className="max-w-2xl mx-auto text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Handcrafted itineraries designed to give you the perfect balance of exploration, adventure, and relaxation.
            Each package is carefully curated by our travel experts to ensure unforgettable experiences.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={cardVariants}
              className="bg-background/80 backdrop-blur-md rounded-xl overflow-hidden shadow-lg"
            >
              <div className="relative h-48">
                <Image src={pkg.image || "/placeholder.svg"} alt={pkg.title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-bold">{pkg.title}</h4>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 text-sm">{pkg.rating}</span>
                    <span className="ml-1 text-xs text-muted-foreground">({pkg.reviews})</span>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  {pkg.location} • {pkg.duration}
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-lg font-bold">₹{pkg.price.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground"> / person</span>
                  </div>
                  <Link
                    href={`/packages/${pkg.id}`}
                    className="text-primary font-medium hover:underline inline-flex items-center"
                  >
                    View Details <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Button>
            View All Packages <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}

