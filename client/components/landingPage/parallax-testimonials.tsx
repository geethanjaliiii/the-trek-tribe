"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"
import Image from "next/image"
import { Quote } from "lucide-react"

interface ParallaxTestimonialsProps {
  scrollYProgress: MotionValue<number>
}

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Delhi",
    quote:
      "The Himalayan trek organized by Trail was the highlight of my year. The guides were knowledgeable and the views were breathtaking!",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Rahul Mehta",
    location: "Mumbai",
    quote:
      "I've traveled with many companies, but Trail's attention to detail and personalized service is unmatched. Will definitely book with them again.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Ananya Patel",
    location: "Bangalore",
    quote:
      "Our family trip to Kerala was perfectly planned. The kids loved the houseboat stay and we adults appreciated the cultural experiences.",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function ParallaxTestimonials({ scrollYProgress }: ParallaxTestimonialsProps) {
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
    <section ref={sectionRef} className="py-20 px-4 relative overflow-hidden bg-muted">
      {/* Parallax Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y, opacity }}>
        <div className="absolute inset-0 bg-gradient-to-b from-background to-muted opacity-50" />
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Mountains background"
          fill
          className="object-cover opacity-10"
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
            TESTIMONIALS
          </motion.h2>
          <motion.h3
            className="text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            What Our Travelers Say
          </motion.h3>
          <motion.p
            className="max-w-2xl mx-auto text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Don't just take our word for it. Hear from travelers who have experienced the magic of India with Trail
            Adventures.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={cardVariants}
              className="bg-background rounded-xl p-6 shadow-lg relative"
            >
              <div className="absolute -top-5 -left-5">
                <Quote className="h-10 w-10 text-primary/20" />
              </div>
              <p className="mb-6 pt-4 italic text-muted-foreground">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

