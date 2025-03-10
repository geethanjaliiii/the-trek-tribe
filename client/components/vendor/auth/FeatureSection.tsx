import { CheckCircle2, Globe, Shield, Clock } from "lucide-react";

const features = [
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Worldwide Recognition",
    description: "Reach adventure seekers from across the globe looking for unique experiences."
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Secure Bookings",
    description: "Our platform ensures secure transactions and reliable booking management."
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "24/7 Support",
    description: "Access our dedicated support team anytime you need assistance."
  },
  {
    icon: <CheckCircle2 className="h-6 w-6" />,
    title: "Verified Reviews",
    description: "Build trust with potential customers through our verified review system."
  }
];

const FeatureSection = () => {
  return (
    <section className="py-16 px-4 bg-earth-light/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block py-1 px-3 rounded-full bg-olive/10 text-olive text-sm font-medium mb-3">
            Why Choose Us
          </span>
          <h2 className="text-3xl font-medium text-charcoal-dark mb-3">Features designed for adventure providers</h2>
          <p className="text-earth-dark max-w-2xl mx-auto">
            Our platform offers everything you need to showcase and manage your adventure tours
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-sm border border-earth-light hover-lift"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-12 w-12 bg-olive/10 rounded-full flex items-center justify-center text-olive mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium text-charcoal-dark mb-2">{feature.title}</h3>
              <p className="text-earth-dark">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
