'use client'

import { useState } from "react";

const BusinessPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-white px-4">
      {/* Hero Section */}
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center animate-fade-in">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {isLogin ? "Welcome Back!" : "Join Us Today"}
        </h2>
        <p className="text-gray-600 mb-6">
          {isLogin ? "Log in to continue" : "Create an account to get started"}
        </p>
        
        {/* Form */}
        <form className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        
        {/* Toggle Form */}
        <p className="text-sm text-gray-600 mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline"
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default BusinessPage;

// 'use client'
// import { useEffect } from "react";
// import { Mountain } from "lucide-react";
// import VendorLoginForm from "@/components/vendor/VendorLoginForm";
// import FeatureSection from "@/components/vendor/FeatureSection";
// import ReviewSlider from "@/components/vendor/ReviewSlider";
// import GuideSection from "@/components/vendor/GuideSection";
// import NavigationBar from "@/components/vendor/NavigationBar";

// const BusinessPage = () => {
//   // Add a scroll listener to add fade-in animations
//   useEffect(() => {
//     const handleScroll = () => {
//       const sections = document.querySelectorAll('section');
//       sections.forEach(section => {
//         const sectionTop = section.getBoundingClientRect().top;
//         const windowHeight = window.innerHeight;
        
//         if (sectionTop < windowHeight * 0.8) {
//           section.classList.add('animate-fade-in');
//         }
//       });
//     };
    
//     window.addEventListener('scroll', handleScroll);
//     // Trigger once on load
//     handleScroll();
    
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);
  
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-earth-light/50 to-white absolute inset-0 -z-10">
//       {/* Hero section with Login Form */}
//       <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
//         <div className="absolute inset-0 -z-10">
//           <div className="absolute inset-0 bg-gradient-to-b from-charcoal-dark to-transparent opacity-80" />
//           <img 
//             src="/placeholder.svg?height=1080&width=1920" 
//             alt="Mountain landscape" 
//             className="w-full h-full object-cover"
//           />
//         </div>
        
//         <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//           <div className="text-white animate-slide-right">
//             <div className="flex items-center gap-3 mb-8">
//               <Mountain className="h-8 w-8 text-olive" />
//               <h1 className="text-2xl font-bold">
//                 Adventure Connect
//               </h1>
//             </div>
//             <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mb-6">
//               Grow your adventure <span className="text-olive">tourism business</span> with us
//             </h2>
//             <p className="text-xl md:text-2xl text-earth-light mb-8">
//               The platform built for tour operators, by tour operators
//             </p>
            
//             <div className="flex flex-wrap gap-6 mb-8">
//               <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
//                 <h3 className="text-3xl font-medium text-olive mb-1">25K+</h3>
//                 <p className="text-earth-light">Monthly visitors</p>
//               </div>
//               <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
//                 <h3 className="text-3xl font-medium text-olive mb-1">5K+</h3>
//                 <p className="text-earth-light">Adventure providers</p>
//               </div>
//               <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
//                 <h3 className="text-3xl font-medium text-olive mb-1">50+</h3>
//                 <p className="text-earth-light">Countries worldwide</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="animate-slide-left ">
//             <VendorLoginForm />
//           </div>
//         </div>
        
//         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
//           <a href="#features" className="flex flex-col items-center text-white opacity-80 hover:opacity-100">
//             <span className="text-sm mb-2">Explore More</span>
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
//             </svg>
//           </a>
//         </div>
//       </section>
      
//       {/* Features Section */}
//       <section id="features">
//         <FeatureSection />
//       </section>
      
//       {/* Testimonials Section */}
//       <section id="testimonials">
//         <ReviewSlider />
//       </section>
      
//       {/* Guides Section */}
//       <section id="guides">
//         <GuideSection />
//       </section>
      
//       {/* Contact Section */}
//       <section id="contact" className="py-16 px-4 bg-charcoal-dark text-white">
//         <div className="max-w-7xl mx-auto text-center">
//           <h2 className="text-3xl font-medium mb-6">Ready to get started?</h2>
//           <p className="text-earth-light max-w-2xl mx-auto mb-8">
//             Join thousands of adventure providers who have grown their business with us
//           </p>
//           <button className="bg-olive hover:bg-olive-dark text-white font-medium px-8 py-3 rounded-lg transition-all duration-300">
//             Create your free account
//           </button>
//         </div>
//       </section>
      
//       {/* Navigation Bar */}
//       <NavigationBar />
//     </div>
//   );
// };

// export default BusinessPage;
