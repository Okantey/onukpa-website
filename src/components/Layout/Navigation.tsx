import { useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import onukpa from "../../assets/onukpa-logo.png";
import handleWhatsAppClick from "../../utils/openWhatsapp";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Features", href: "#features" },
    { name: "Properties", href: "#properties" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "For Agents", href: "#agents" },
  ];

  console.log(window.location.host);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-lg z-40 border-b border-slate-200/80 shadow-sm py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div
              className="flex items-center space-x-3"
              onClick={() => (window.location.href = "https://onukpa.com")}
            >
              <div className="flex items-center space-x-2">
                <img
                  src={onukpa}
                  alt="Onukpa"
                  className="w-36 md:w-full h-16 rounded-lg object-contain"
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <>
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className="text-slate-600 transition-colors duration-200 font-medium hover:text-primary"
                  >
                    {item.name}
                  </a>
                </>
              ))}
            </div>

            {/* Desktop CTA Button */}
            <div className="hidden md:flex items-center">
              <button
                onClick={() => handleWhatsAppClick()}
                className="bg-primary text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Get Started</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-4 md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out bg-white border-t border-slate-200 ${
            isMenuOpen
              ? "max-h-96 opacity-100 visible"
              : "max-h-0 opacity-0 invisible"
          } overflow-hidden`}
        >
          <div className="px-4 py-4 space-y-1">
            {/* WhatsApp Badge - Mobile */}
            <div className="flex items-center justify-center px-3 py-2 bg-green-50 border border-green-200 rounded-full mb-4">
              <MessageCircle className="w-4 h-4 text-green-600 mr-2" />
              <span className="text-sm font-medium text-green-700">
                Powered by WhatsApp
              </span>
            </div>

            {/* Navigation Links */}
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="block px-4 py-3 rounded-lg font-medium text-slate-700 hover:text-primary hover:bg-slate-50 transition-all duration-200 border-b border-slate-100 last:border-b-0"
              >
                {item.name}
              </a>
            ))}

            {/* Additional Mobile CTA */}
            <div className="pt-4 border-t border-slate-200">
              <button
                onClick={() => {
                  handleWhatsAppClick();
                  setIsMenuOpen(false);
                }}
                className="w-full bg-primary text-white px-4 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Start Chat on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-20 md:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Add padding to prevent content from being hidden under fixed nav */}
      <div className="h-20 md:h-24"></div>
    </>
  );
};

export default Navigation;
