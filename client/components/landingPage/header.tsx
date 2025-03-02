"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  const backgroundColor = useTransform(scrollY, [0, 100], ["rgba(15, 23, 42, 0)", "rgba(15, 23, 42, 0.9)"])

  const padding = useTransform(scrollY, [0, 100], ["1.5rem", "1rem"])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm" style={{ backgroundColor, padding }}>
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-white font-bold text-2xl">
          TRAIL
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex items-center space-x-8">
            <Link href="#destinations" className="text-white hover:text-primary transition-colors">
              Destinations
            </Link>
            <Link href="#about" className="text-white hover:text-primary transition-colors">
              About
            </Link>
            <Link href="#packages" className="text-white hover:text-primary transition-colors">
              Packages
            </Link>
            <Link href="#blog" className="text-white hover:text-primary transition-colors">
              Blog
            </Link>
            <Link href="#contact" className="text-white hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          <Link
            href="/login"
            className="px-6 py-2 rounded-full border border-white text-white hover:bg-white hover:text-[#0f172a] transition-colors"
          >
            Login
          </Link>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0f172a] py-4">
          <nav className="container mx-auto flex flex-col space-y-4">
            <Link
              href="#destinations"
              className="text-white hover:text-primary px-4 py-2"
              onClick={() => setIsOpen(false)}
            >
              Destinations
            </Link>
            <Link href="#about" className="text-white hover:text-primary px-4 py-2" onClick={() => setIsOpen(false)}>
              About
            </Link>
            <Link href="#packages" className="text-white hover:text-primary px-4 py-2" onClick={() => setIsOpen(false)}>
              Packages
            </Link>
            <Link href="#blog" className="text-white hover:text-primary px-4 py-2" onClick={() => setIsOpen(false)}>
              Blog
            </Link>
            <Link href="#contact" className="text-white hover:text-primary px-4 py-2" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
            <Link href="/login" className="text-white hover:text-primary px-4 py-2" onClick={() => setIsOpen(false)}>
              Login
            </Link>
          </nav>
        </div>
      )}
    </motion.header>
  )
}



