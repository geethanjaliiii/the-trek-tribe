"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface ParallaxBlogProps {
  scrollYProgress: MotionValue<number>
}

const blogPosts = [
  {
    id: 1,
    title: "10 Must-Visit Destinations in Himachal Pradesh",
    excerpt: "Discover the hidden gems of Himachal Pradesh, from snow-capped mountains to lush valleys.",
    image: "/placeholder.svg?height=300&width=500",
    date: "May 15, 2023",
    category: "Travel Guide",
  },
  {
    id: 2,
    title: "The Ultimate Backpacking Checklist for Trekking in India",
    excerpt: "Everything you need to pack for a successful trekking adventure in the Indian Himalayas.",
    image: "/placeholder.svg?height=300&width=500",
    date: "June 3, 2023",
    category: "Tips & Tricks",
  },
  {
    id: 3,
    title: "Exploring Kerala's Backwaters: A Photographic Journey",
    excerpt: "A visual tour through the serene backwaters of Kerala, India's tropical paradise.",
    image: "/placeholder.svg?height=300&width=500",
    date: "July 22, 2023",
    category: "Photography",
  },
]

export default function ParallaxBlog({ scrollYProgress }: ParallaxBlogProps) {
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
    <section id="blog" ref={sectionRef} className="py-20 px-4 relative overflow-hidden">
      {/* Parallax Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y, opacity }}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/30 to-background" />
        <Image
          src="/bg-images/6205261.jpg?height=1080&width=1920"
          alt="Mountains background"
          fill
          className="object-cover opacity-10"
        />
      </motion.div>

      <motion.div className="max-w-7xl mx-auto relative z-10" style={{ scale }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <motion.h2
              className="text-2xl font-bold text-primary mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              OUR BLOG
            </motion.h2>
            <motion.h3
              className="text-4xl font-bold mb-6 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Latest Travel Stories
            </motion.h3>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link href="/blog" className="mt-4 md:mt-0 inline-flex items-center text-primary hover:underline">
              View all posts <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={cardVariants}
            >
              <Card className="overflow-hidden h-full flex flex-col">
                <div className="relative h-48">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.category}</span>
                  </div>
                  <h4 className="text-xl font-bold mb-3">{post.title}</h4>
                  <p className="text-muted-foreground mb-4 flex-1">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-primary font-medium hover:underline inline-flex items-center"
                  >
                    Read more <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

