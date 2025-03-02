"use client"

import { Button } from "@/components/ui/button"

import { useEffect, useRef } from "react"
import Image from "next/image"

export default function WorldMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const container = canvas.parentElement
      if (!container) return

      canvas.width = container.clientWidth
      canvas.height = 300
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Draw the dotted line path
    const drawPath = () => {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Define the path points (simplified world map connections)
      const points = [
        { x: canvas.width * 0.1, y: canvas.height * 0.5 }, // Starting point
        { x: canvas.width * 0.25, y: canvas.height * 0.3 }, // Europe
        { x: canvas.width * 0.4, y: canvas.height * 0.4 }, // Middle East
        { x: canvas.width * 0.55, y: canvas.height * 0.5 }, // India
        { x: canvas.width * 0.7, y: canvas.height * 0.6 }, // Southeast Asia
        { x: canvas.width * 0.85, y: canvas.height * 0.7 }, // Australia
      ]

      // Draw dotted lines
      ctx.beginPath()
      ctx.setLineDash([5, 5])
      ctx.strokeStyle = "white"
      ctx.lineWidth = 2

      ctx.moveTo(points[0].x, points[0].y)
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y)
      }

      ctx.stroke()

      // Simple airplane drawing instead of loading an image
      const drawPlane = (x: number, y: number) => {
        ctx.save()
        ctx.fillStyle = "white"
        ctx.beginPath()
        // Draw a simple airplane shape
        ctx.moveTo(x, y - 5)
        ctx.lineTo(x + 10, y)
        ctx.lineTo(x, y + 5)
        ctx.lineTo(x - 5, y)
        ctx.closePath()
        ctx.fill()
        ctx.restore()
      }

      // Draw planes at specific points
      ;[1, 3, 5].forEach((i) => {
        if (i < points.length) {
          drawPlane(points[i].x, points[i].y)
        }
      })
    }

    drawPath()
    window.addEventListener("resize", drawPath)

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("resize", drawPath)
    }
  }, [])

  return (
    <section className="py-20 px-4 bg-[#0f172a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-primary mb-2">DISCOVER</h2>
        <h3 className="text-4xl font-bold text-white mb-12">Discover the world through our eyes</h3>

        <div className="relative h-[300px]">
          <canvas ref={canvasRef} className="absolute inset-0 z-10"></canvas>

          {/* Continent Icons */}
          <div className="absolute top-1/4 left-[10%] z-20">
            <div className="bg-primary/20 p-2 rounded-full">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="North America"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <p className="text-white text-xs mt-1">North America</p>
          </div>

          <div className="absolute top-1/3 left-1/4 z-20">
            <div className="bg-primary/20 p-2 rounded-full">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="Europe"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <p className="text-white text-xs mt-1">Europe</p>
          </div>

          <div className="absolute top-1/2 left-[55%] z-20">
            <div className="bg-primary/20 p-2 rounded-full">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="India"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <p className="text-white text-xs mt-1">India</p>
          </div>

          <div className="absolute bottom-1/4 right-[15%] z-20">
            <div className="bg-primary/20 p-2 rounded-full">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="Australia"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <p className="text-white text-xs mt-1">Australia</p>
          </div>
        </div>

        <div className="mt-12">
          <Button className="bg-primary hover:bg-primary/90">Book Tour</Button>
        </div>
      </div>
    </section>
  )
}

