"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface ParallaxNewsletterProps {
  scrollYProgress: MotionValue<number>
}

export default function ParallaxNewsletter({ scrollYProgress }: ParallaxNewsletterProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(sectionProgress, [0, 1], [100, -100])
  const opacity = useTransform(sectionProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(sectionProgress, [0, 0.5, 1], [0.9, 1, 0.9])

  return (
    <section ref={sectionRef} className="py-16 px-4 relative overflow-hidden">
      {/* Parallax Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y, opacity }}>
        <div className="absolute inset-0 bg-gradient-to-b from-muted to-background opacity-70" />
        <Image
          src="/bg-images/news.jpg?height=1080&width=1920"
          alt="Mountains background"
          fill
          className="object-cover opacity-20"
        />
      </motion.div>

      <motion.div className="max-w-7xl mx-auto text-center relative z-10" style={{ scale }}>
        <motion.h2
          className="text-3xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Subscribe to our newsletter
        </motion.h2>
        <motion.p
          className="text-muted-foreground max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Get the latest updates on new destinations, special offers, and travel tips directly to your inbox.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Input placeholder="Your email address" type="email" className="flex-1" />
          <Button>Subscribe</Button>
        </motion.div>
      </motion.div>
    </section>
  )
}

