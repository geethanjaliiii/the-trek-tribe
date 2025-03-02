"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function ParallaxHero() {
  const ref = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const { scrollY } = useScroll()

  // Parallax effect values
  const y1 = useTransform(scrollY, [0, 500], [0, 500]) // Foreground (video) moves fastest
  const y2 = useTransform(scrollY, [0, 500], [0, 250]) // Middle layer
  const y3 = useTransform(scrollY, [0, 500], [0, 350]) // Far layer
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 1.1])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="relative h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <Image src="/bg-images/video.gif?height=1080&width=1920" alt="Mountains" fill priority className="object-cover" />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">FIND YOUR TRAIL</h1>
        </div>
      </div>
    )
  }

  return (
    <div ref={ref} className="relative h-screen bg-[#0f172a] flex items-center justify-center overflow-hidden">
      {/* Background Mountains - Far */}
      <motion.div className="absolute inset-0 w-full h-full" style={{ y: y3, scale }}>
        <Image
          src="/bg-images/video.gif?height=1080&width=1920"
          alt="Far mountains"
          fill
          priority
          className="object-cover opacity-80"
        />
      </motion.div>

      {/* Middle Mountains */}
      {/* <motion.div className="absolute inset-0 w-full h-full" style={{ y: y2 }}>
        <Image
          src="/bg-images/sec.jpg?height=1080&width=1920"
          alt="Middle mountains"
          fill
          priority
          className="object-cover"
        />
      </motion.div> */}

      {/* Foreground Layer - Video */}
      {/* <motion.div className="absolute inset-0 w-full h-full" style={{ y: y1 }}>
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source
            src="/bg-images/animation.mp4" // Replace with your video file path
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </motion.div> */}

      {/* Content */}
      <motion.div className="relative z-10 text-center px-4" style={{ opacity }}>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">FIND YOUR TRAIL</h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
          Discover the most breathtaking destinations across India with our curated travel experiences
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Explore Destinations
          </Button>
          <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
            View Tour Packages
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

