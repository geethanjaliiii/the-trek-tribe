"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface ParallaxDestinationsProps {
  scrollYProgress: MotionValue<number>
}

const destinations = [
  {
    id: 1,
    name: "Himachal Pradesh",
    image: "/placeholder.svg?height=600&width=400",
    description: "Explore the majestic mountains and valleys",
  },
  {
    id: 2,
    name: "Kerala",
    image: "/placeholder.svg?height=600&width=400",
    description: "Discover the serene backwaters and lush greenery",
  },
  {
    id: 3,
    name: "Rajasthan",
    image: "/placeholder.svg?height=600&width=400",
    description: "Experience the royal heritage and desert landscapes",
  },
  {
    id: 4,
    name: "Goa",
    image: "/placeholder.svg?height=600&width=400",
    description: "Relax on pristine beaches and enjoy vibrant nightlife",
  },
]

export default function ParallaxDestinations({ scrollYProgress }: ParallaxDestinationsProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(sectionProgress, [0, 1], [100, -100])
  const opacity = useTransform(sectionProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(sectionProgress, [0, 0.5, 1], [0.8, 1, 0.8])

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
    <section id="destinations" ref={sectionRef} className="py-20 px-4 relative overflow-hidden">
      {/* Parallax Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y, opacity }}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] to-background opacity-50" />
        <Image src="/placeholder.svg?height=1080&width=1920" alt="Mountains background" fill className="object-cover" />
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
            POPULAR DESTINATIONS
          </motion.h2>
          <motion.h3
            className="text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Explore India's Treasures
          </motion.h3>
          <motion.p
            className="max-w-2xl mx-auto text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            From the snow-capped peaks of the Himalayas to the sun-kissed beaches of Goa, discover the diverse
            landscapes and rich cultural heritage of India.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={cardVariants}
              className="group relative overflow-hidden rounded-xl h-80"
            >
              <Image
                src={destination.image || "/placeholder.svg"}
                alt={destination.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h4 className="text-xl font-bold text-white mb-2">{destination.name}</h4>
                <p className="text-white/80 mb-4">{destination.description}</p>
                <Link
                  href={`/destinations/${destination.id}`}
                  className="inline-flex items-center text-primary hover:underline"
                >
                  Explore <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
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
          <Link href="/destinations" className="inline-flex items-center text-primary hover:underline text-lg">
            View all destinations <ChevronRight className="ml-1 h-5 w-5" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}

