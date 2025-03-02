import Link from "next/link"
import Image from "next/image"
import { Search, MapPin, Calendar, Users, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ParallaxHero from "@/components/landingPage/parallax-hero"
import PopularDestinations from "@/components/landingPage/popular-destination"
import WorldMap from "@/components/landingPage/world-map"
import BlogSection from "@/components/landingPage/blog-section"
import TopPackages from "@/components/landingPage/top-packages"
import Testimonials from "@/components/landingPage/testimonials"

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Hero Section with Parallax */}
      <ParallaxHero />

      {/* Search Section */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 -mt-24 sm:-mt-32">
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
      </section>

      {/* Popular Destinations */}
      <PopularDestinations />

      {/* World Map Section */}
      <WorldMap />

      {/* About Trail Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0f172a] -z-10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-72 bg-gradient-to-t from-[#0f172a] to-transparent -z-10"></div>
        <div className="absolute bottom-0 w-full h-40 bg-[url('/mountains-silhouette.svg')] bg-repeat-x bg-bottom -z-10"></div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-2">ABOUT US</h2>
            <h3 className="text-4xl font-bold text-white mb-6">We are Trail</h3>
            <p className="text-gray-300 mb-4">
              Founded in 2010 in Rishikesh, Trail has grown from a small startup to one of the most trusted names in
              adventure tourism in India. We specialize in bringing you the most authentic experiences across the
              diverse landscapes of India.
            </p>
            <p className="text-gray-300 mb-6">
              Our team is led by experienced local guides who know every trail, peak, river, and forest like the back of
              their hand. We're committed to sustainable tourism practices that respect local communities and preserve
              the natural beauty of our destinations.
            </p>
            <Button>
              Learn More <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="relative h-[400px]">
            <div className="absolute bottom-0 right-0 w-80 h-80">
              <Image
                src="/placeholder.svg?height=400&width=320"
                alt="Hiker illustration"
                width={320}
                height={400}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Top Packages */}
      <TopPackages />

      {/* Blog Section */}
      <BlogSection />

      {/* Testimonials */}
      <Testimonials />

      {/* Newsletter */}
      <section className="py-16 px-4 bg-muted">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Subscribe to our newsletter</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Get the latest updates on new destinations, special offers, and travel tips directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input placeholder="Your email address" type="email" className="flex-1" />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f172a] text-gray-300 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-white text-xl mb-4">About Us</h3>
            <p className="mb-4">
              Your trusted adventure travel company in India, offering unforgettable experiences since 2010.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-primary">
                <span className="sr-only">Facebook</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
              <Link href="#" className="hover:text-primary">
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
              <Link href="#" className="hover:text-primary">
                <span className="sr-only">Instagram</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-white text-xl mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-primary">
                  Luxury Tour Packages
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Family Tour Packages
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Adventure Tours
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Honeymoon Packages
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Group Tours
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white text-xl mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-primary">
                  Latest News & Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Travel Guides
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white text-xl mb-4">Contact Us</h3>
            <address className="not-italic">
              <p className="flex items-start mb-2">
                <MapPin className="mr-2 h-5 w-5 shrink-0 text-primary" />
                <span>
                  123, Green View Park
                  <br />
                  New Delhi, India - 110001
                </span>
              </p>
              <p className="flex items-center mb-2">
                <svg
                  xmlns=""
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-5 w-5 text-primary"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>+91 98765 43210</span>
              </p>
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-5 w-5 text-primary"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>info@trailadventures.com</span>
              </p>
            </address>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p>&copy; {new Date().getFullYear()} Trail Adventures. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}

