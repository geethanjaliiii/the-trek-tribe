"use client"

import { Search, MapPin, Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function SearchSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <motion.section ref={ref} className="relative z-10 mx-auto max-w-7xl px-4 -mt-24 sm:-mt-32" style={{ y, opacity }}>
      <div className="bg-background/80 backdrop-blur-md rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium mb-1 block">Destination</label>
            <div className="relative">
              <Input placeholder="Where do you want to go?" className="pl-10" />
              <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium mb-1 block">Check-in</label>
            <div className="relative">
              <Input type="date" className="pl-10" />
              <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium mb-1 block">Travelers</label>
            <div className="relative">
              <Input placeholder="2 Adults" className="pl-10" />
              <Users className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
          <div className="flex items-end">
            <Button size="lg" className="w-full md:w-auto">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button variant="outline" size="sm" className="rounded-full">
            Trekking
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Wildlife
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Heritage
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Beach
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Pilgrimage
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            Adventure
          </Button>
        </div>
      </div>
    </motion.section>
  )
}

