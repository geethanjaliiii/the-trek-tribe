
import { useState } from "react";
import { Menu, X, ChevronUp } from "lucide-react";

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("features");

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-50">
      {/* Mobile bottom drawer */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />
      
      <div 
        className={`bg-white border-t border-earth-light rounded-t-2xl transition-transform duration-300 transform ${
          isOpen ? "translate-y-0" : "translate-y-[calc(100%-4rem)]"
        }`}
      >
        <div 
          className="h-16 flex items-center justify-center cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-12 h-1 bg-earth-light rounded-full mb-1" />
          <ChevronUp 
            className={`absolute right-4 text-earth-dark transition-transform ${
              isOpen ? "rotate-180" : ""
            }`} 
          />
        </div>
        
        <nav className="px-6 pb-8">
          <ul className="space-y-6">
            <li>
              <button
                onClick={() => scrollToSection("features")}
                className={`w-full text-left py-2 flex items-center ${
                  activeSection === "features" ? "text-olive font-medium" : "text-charcoal-light"
                }`}
              >
                <span className="text-lg">Features</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("testimonials")}
                className={`w-full text-left py-2 flex items-center ${
                  activeSection === "testimonials" ? "text-olive font-medium" : "text-charcoal-light"
                }`}
              >
                <span className="text-lg">Testimonials</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("guides")}
                className={`w-full text-left py-2 flex items-center ${
                  activeSection === "guides" ? "text-olive font-medium" : "text-charcoal-light"
                }`}
              >
                <span className="text-lg">Guides</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("contact")}
                className={`w-full text-left py-2 flex items-center ${
                  activeSection === "contact" ? "text-olive font-medium" : "text-charcoal-light"
                }`}
              >
                <span className="text-lg">Contact</span>
              </button>
            </li>
            <li>
              <button
                className="w-full bg-olive text-white font-medium rounded-lg py-3 mt-4"
              >
                Get Started
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavigationBar;
