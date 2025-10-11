import { useState } from "react";
import { MessageCircle, X, Clock } from "lucide-react";
import favicon from "../../assets/favicon.png";

const WhatsAppFloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const phoneNumber = "+233245095569";
  const message = "Hi Onukpa! I need help finding a place to rent";

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
    setIsOpen(false);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  return (
    <>
      {/* Main Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Chat Bubble */}
        {isOpen && (
          <div className="absolute bottom-16 right-0 mb-4 w-80 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <img src={favicon} className="w-10" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Onukpa Bot</h3>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-slate-600">Online now</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-slate-600" />
                </button>
              </div>

              {/* Message Preview */}
              <div className="bg-slate-50 rounded-xl p-4 mb-4">
                <p className="text-sm text-slate-700 mb-2">
                  "Hi! I'm here to help you find the perfect place. Just tell me
                  what you need! 🏠"
                </p>
                <div className="flex items-center space-x-1 text-xs text-slate-500">
                  <Clock className="w-3 h-3" />
                  <span>Typically replies instantly</span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm">Start Chat on WhatsApp</span>
              </button>

              {/* Footer */}
              <div className="text-center mt-3">
                <p className="text-xs text-slate-500">
                  No registration required • Free service
                </p>
              </div>
            </div>

            {/* Arrow pointing to main button */}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white transform rotate-45 border-r border-b border-slate-200"></div>
          </div>
        )}

        {/* Main WhatsApp Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`relative transition-all duration-300 transform ${
            isOpen ? "scale-110 rotate-12" : "hover:scale-110"
          }`}
        >
          {/* Pulsing animation */}
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>

          {/* Main button */}
          <div className="relative w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-300">
            {isOpen ? (
              <X className="w-7 h-7 text-white" />
            ) : (
              <img src={favicon} className="w-8" />
            )}
          </div>

          {/* Notification badge */}
          {!isOpen && (
            <div className="absolute -top-1 -right-1">
              <div className="relative">
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">!</span>
                </div>
                <div className="absolute inset-0 bg-red-500 rounded-full animate-ping"></div>
              </div>
            </div>
          )}

          {/* Tooltip on hover */}
          {isHovered && !isOpen && (
            <div className="absolute right-20 top-1/2 transform -translate-y-1/2">
              <div className="bg-slate-900 text-white text-sm font-medium px-3 py-2 rounded-lg whitespace-nowrap">
                Chat with Onukpa Bot
                <div className="absolute top-1/2 right-0 transform translate-x-1 -translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
              </div>
            </div>
          )}
        </button>
      </div>

      {/* Overlay when chat bubble is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/10 z-40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Add these animations to your CSS or Tailwind config */}
      <style>{`
         @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default WhatsAppFloatingButton;
