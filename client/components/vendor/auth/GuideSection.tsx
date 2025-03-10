import { ArrowRight, Compass, Clock, Users, MapPin } from "lucide-react";
import Link from "next/link";

const guides = [
  {
    id: 1,
    title: "Getting Started Guide",
    description: "Learn how to set up your profile and list your first tour",
    icon: <Compass className="h-5 w-5" />,
    readTime: "5 min read",
    category: "Beginners"
  },
  {
    id: 2,
    title: "Optimizing Your Listings",
    description: "Tips for creating compelling tour descriptions that convert",
    icon: <MapPin className="h-5 w-5" />,
    readTime: "8 min read",
    category: "Marketing"
  },
  {
    id: 3,
    title: "Managing Group Bookings",
    description: "Streamline the process of handling multiple bookings at once",
    icon: <Users className="h-5 w-5" />,
    readTime: "6 min read",
    category: "Operations"
  }
];

const GuideSection = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block py-1 px-3 rounded-full bg-olive/10 text-olive text-sm font-medium mb-3">
            Resources
          </span>
          <h2 className="text-3xl font-medium text-charcoal-dark mb-3">Helpful guides</h2>
          <p className="text-earth-dark max-w-2xl mx-auto">
            Explore our collection of resources to help you succeed on our platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {guides.map((guide) => (
            <div 
              key={guide.id} 
              className="group border border-earth-light rounded-xl overflow-hidden hover-lift"
            >
              <div className="h-48 bg-olive-light/30 flex items-center justify-center">
                <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center text-olive">
                  {guide.icon}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-olive bg-olive/10 px-2 py-1 rounded-full">
                    {guide.category}
                  </span>
                  <span className="flex items-center text-xs text-earth-dark">
                    <Clock className="h-3 w-3 mr-1" />
                    {guide.readTime}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-charcoal-dark mb-2">{guide.title}</h3>
                <p className="text-earth-dark mb-4">{guide.description}</p>
                <Link
                  href="#" 
                  className="flex items-center text-olive font-medium group-hover:underline"
                >
                  Read guide
                  <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="#" 
            className="inline-flex items-center bg-olive hover:bg-olive-dark text-white font-medium px-6 py-3 rounded-lg transition-all duration-300"
          >
            View all resources
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GuideSection;
