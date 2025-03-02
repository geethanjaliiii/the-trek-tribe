import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";

const blogPosts = [
  {
    id: 1,
    title: "10 Must-Visit Destinations in Himachal Pradesh",
    excerpt:
      "Discover the hidden gems of Himachal Pradesh, from snow-capped mountains to lush valleys.",
    image: "/placeholder.svg?height=300&width=500",
    date: "May 15, 2023",
    category: "Travel Guide",
  },
  {
    id: 2,
    title: "The Ultimate Backpacking Checklist for Trekking in India",
    excerpt:
      "Everything you need to pack for a successful trekking adventure in the Indian Himalayas.",
    image: "/placeholder.svg?height=300&width=500",
    date: "June 3, 2023",
    category: "Tips & Tricks",
  },
  {
    id: 3,
    title: "Exploring Kerala's Backwaters: A Photographic Journey",
    excerpt:
      "A visual tour through the serene backwaters of Kerala, India's tropical paradise.",
    image: "/placeholder.svg?height=300&width=500",
    date: "July 22, 2023",
    category: "Photography",
  },
];
export default function BlogSection() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-2">OUR BLOG</h2>
            <h3 className="text-4xl font-bold">Latest Travel Stories</h3>
          </div>
          <Link
            href="/blog"
            className="mt-4 md:mt-0 inline-flex items-center text-primary hover:underline"
          >
            View all posts <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden h-full flex flex-col"
            >
              <div className="relative h-48">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.category}</span>
                </div>
                <h4 className="text-xl font-bold mb-3">{post.title}</h4>
                <p className="text-muted-foreground mb-4 flex-1">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.id}`}
                  className="text-primary font-medium hover:underline inline-flex items-center"
                >
                  Read more <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
