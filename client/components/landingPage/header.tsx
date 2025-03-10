"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Background transitions from transparent to white with slight opacity
  const backgroundColor = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.95)"]);

  // Reduced padding for a shorter header
  const padding = useTransform(scrollY, [0, 100], ["1rem", "0.75rem"]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm shadow-sm"
      style={{ backgroundColor, padding }}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-[#0f172a] font-bold text-xl">
          THE TREK TRIBE
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex items-center space-x-6">
            <Link href="#destinations" className="text-[#0f172a] hover:text-gray-600 transition-colors">
              Destinations
            </Link>
            <Link href="#about" className="text-[#0f172a] hover:text-gray-600 transition-colors">
              About
            </Link>
            <Link href="#packages" className="text-[#0f172a] hover:text-gray-600 transition-colors">
              Packages
            </Link>
            <Link href="#blog" className="text-[#0f172a] hover:text-gray-600 transition-colors">
              Blog
            </Link>
            <Link href="#contact" className="text-[#0f172a] hover:text-gray-600 transition-colors">
              Contact
            </Link>
            <Link href="/business" className="text-[#0f172a] hover:text-gray-600 transition-colors">
              Grow Your Business
            </Link>
          </nav>

          <Link
            href="/login"
            className="px-4 py-1.5 rounded-full border border-[#0f172a] text-[#0f172a] hover:bg-[#0f172a] hover:text-white transition-colors"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-[#0f172a]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md py-2">
          <nav className="container mx-auto flex flex-col space-y-2">
            <Link
              href="#destinations"
              className="text-[#0f172a] hover:text-gray-600 px-4 py-1"
              onClick={() => setIsOpen(false)}
            >
              Destinations
            </Link>
            <Link
              href="#about"
              className="text-[#0f172a] hover:text-gray-600 px-4 py-1"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="#packages"
              className="text-[#0f172a] hover:text-gray-600 px-4 py-1"
              onClick={() => setIsOpen(false)}
            >
              Packages
            </Link>
            <Link
              href="#blog"
              className="text-[#0f172a] hover:text-gray-600 px-4 py-1"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="#contact"
              className="text-[#0f172a] hover:text-gray-600 px-4 py-1"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/login"
              className="text-[#0f172a] hover:text-gray-600 px-4 py-1"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          </nav>
        </div>
      )}
    </motion.header>
  );
}
// "use client"

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { Menu, X } from "lucide-react"
// import { motion, useScroll, useTransform } from "framer-motion"

// export default function Header() {
//   const [isOpen, setIsOpen] = useState(false)
//   const [isScrolled, setIsScrolled] = useState(false)
//   const { scrollY } = useScroll()

//   const backgroundColor = useTransform(scrollY, [0, 100], ["rgba(15, 23, 42, 0)", "rgba(15, 23, 42, 0.9)"])

//   const padding = useTransform(scrollY, [0, 100], ["1.5rem", "1rem"])

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50)
//     }

//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   return (
//     <motion.header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm" style={{ backgroundColor, padding }}>
//       <div className="container mx-auto flex items-center justify-between">
//         <Link href="/" className="text-white font-bold text-2xl">
//           THE TREK TRIBE
//         </Link>

//         <div className="hidden md:flex items-center space-x-8">
//           <nav className="flex items-center space-x-8">
//             <Link href="#destinations" className="text-white hover:text-primary transition-colors">
//               Destinations
//             </Link>
//             <Link href="#about" className="text-white hover:text-primary transition-colors">
//               About
//             </Link>
//             <Link href="#packages" className="text-white hover:text-primary transition-colors">
//               Packages
//             </Link>
//             <Link href="#blog" className="text-white hover:text-primary transition-colors">
//               Blog
//             </Link>
//             <Link href="#contact" className="text-white hover:text-primary transition-colors">
//               Contact
//             </Link>
//           </nav>

//           <Link
//             href="/login"
//             className="px-6 py-2 rounded-full border border-white text-white hover:bg-white hover:text-[#0f172a] transition-colors"
//           >
//             Login
//           </Link>
//         </div>

//         <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
//           {isOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {isOpen && (
//         <div className="md:hidden absolute top-full left-0 right-0 bg-[#0f172a] py-4">
//           <nav className="container mx-auto flex flex-col space-y-4">
//             <Link
//               href="#destinations"
//               className="text-white hover:text-primary px-4 py-2"
//               onClick={() => setIsOpen(false)}
//             >
//               Destinations
//             </Link>
//             <Link href="#about" className="text-white hover:text-primary px-4 py-2" onClick={() => setIsOpen(false)}>
//               About
//             </Link>
//             <Link href="#packages" className="text-white hover:text-primary px-4 py-2" onClick={() => setIsOpen(false)}>
//               Packages
//             </Link>
//             <Link href="#blog" className="text-white hover:text-primary px-4 py-2" onClick={() => setIsOpen(false)}>
//               Blog
//             </Link>
//             <Link href="#contact" className="text-white hover:text-primary px-4 py-2" onClick={() => setIsOpen(false)}>
//               Contact
//             </Link>
//             <Link href="/login" className="text-white hover:text-primary px-4 py-2" onClick={() => setIsOpen(false)}>
//               Login
//             </Link>
//           </nav>
//         </div>
//       )}
//     </motion.header>
//   )
// }



