import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    company: "Alpine Explorers",
    text: "Joining this platform has brought us a steady stream of clients interested in our mountain trekking experiences. The booking system is seamless and the support team is always responsive.",
    rating: 5,
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Michael Chen",
    company: "Pacific Coast Adventures",
    text: "The exposure we've gained through this platform has been incredible. Our kayaking tours are now booked weeks in advance, and the dashboard makes management effortless.",
    rating: 5,
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    company: "Desert Trail Guides",
    text: "As a small tour operator, this platform has been a game-changer. The commission structure is fair, and the quality of clients is excellent. Highly recommend to fellow adventure providers.",
    rating: 4,
    image: "/placeholder.svg"
  }
];

const ReviewSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % reviews.length);
  };

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  // Auto-advance the slider
  useEffect(() => {
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, [currentSlide, isAnimating]);

  return (
    <section className="py-16 px-4 bg-charcoal-dark text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block py-1 px-3 rounded-full bg-earth-light/20 text-earth-light text-sm font-medium mb-3">
            Testimonials
          </span>
          <h2 className="text-3xl font-medium mb-3">What our partners say</h2>
          <p className="text-earth-light max-w-2xl mx-auto">
            Join thousands of adventure providers who have grown their business with us
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {reviews.map((review) => (
                <div key={review.id} className="w-full flex-shrink-0 p-6 md:p-10 bg-charcoal-light rounded-xl">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-olive-dark">
                      <img 
                        src={review.image} 
                        alt={review.name}
                        className="w-full h-full object-cover"
                        width={64}
                        height={64}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            className={i < review.rating ? "fill-olive text-olive" : "text-earth-light"}
                          />
                        ))}
                      </div>
                      <p className="text-earth-light italic mb-4">"{review.text}"</p>
                      <div>
                        <h4 className="font-medium">{review.name}</h4>
                        <p className="text-sm text-earth-light">{review.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={goToPrev} 
            className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 bg-charcoal-dark/80 hover:bg-charcoal-dark border border-earth-light/20 h-10 w-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300"
            disabled={isAnimating}
          >
            <ArrowLeft size={18} />
          </button>
          <button 
            onClick={goToNext} 
            className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 bg-charcoal-dark/80 hover:bg-charcoal-dark border border-earth-light/20 h-10 w-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300"
            disabled={isAnimating}
          >
            <ArrowRight size={18} />
          </button>

          <div className="flex justify-center mt-6 gap-2">
            {reviews.map((_, i) => (
              <button 
                key={i}
                onClick={() => {
                  if (isAnimating) return;
                  setIsAnimating(true);
                  setCurrentSlide(i);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentSlide ? "w-8 bg-olive" : "w-2 bg-earth-light/30"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSlider;
