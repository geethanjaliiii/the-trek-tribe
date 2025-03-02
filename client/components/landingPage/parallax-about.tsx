"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

interface ParallaxAboutProps {
  scrollYProgress: MotionValue<number>
}

export default function ParallaxAbout({ scrollYProgress }: ParallaxAboutProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(sectionProgress, [0, 1], [100, -100])
  const opacity = useTransform(sectionProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  // Parallax for content and image
  const contentY = useTransform(sectionProgress, [0, 1], [50, -50])
  const imageY = useTransform(sectionProgress, [0, 1], [100, -100])

  return (
    <section id="about" ref={sectionRef} className="py-20 px-4 relative overflow-hidden">
      {/* Parallax Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y, opacity }}>
        <div className="absolute inset-0 bg-[#0f172a] opacity-90" />
        <div className="absolute bottom-0 left-0 right-0 h-72 bg-gradient-to-t from-[#0f172a] to-transparent" />
        <div className="absolute bottom-0 w-full h-40 bg-[url('/placeholder.svg')] bg-repeat-x bg-bottom" />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <motion.div style={{ y: contentY }}>
          <motion.h2
            className="text-2xl font-bold text-primary mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            ABOUT US
          </motion.h2>
          <motion.h3
            className="text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            We are Trail
          </motion.h3>
          <motion.p
            className="text-gray-300 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Founded in 2010 in Rishikesh, Trail has grown from a small startup to one of the most trusted names in
            adventure tourism in India. We specialize in bringing you the most authentic experiences across the diverse
            landscapes of India.
          </motion.p>
          <motion.p
            className="text-gray-300 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Our team is led by experienced local guides who know every trail, peak, river, and forest like the back of
            their hand. We're committed to sustainable tourism practices that respect local communities and preserve the
            natural beauty of our destinations.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button>
              Learn More <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>

        <motion.div className="relative h-[400px]" style={{ y: imageY }}>
          <motion.div
            className="absolute bottom-0 right-0 w-80 h-80"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <Image
              src="/bg-images/third.jpg?height=400&width=320"
              alt="Hiker illustration"
              width={320}
              height={400}
              className="object-contain"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

