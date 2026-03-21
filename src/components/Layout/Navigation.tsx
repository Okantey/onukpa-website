import { useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import onukpa from "../../assets/onukpa-logo.png";
import handleWhatsAppClick from "../../utils/openWhatsapp";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "How it works", href: "#how-it-works" },
    { name: "What we list", href: "#properties" },
    { name: "Areas", href: "#areas" },
    { name: "Stories", href: "#testimonials" },
    { name: "For agents", href: "#for-agents" },
  ];

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
      <nav className="fixed top-0 z-40 w-full border-b border-stone-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[4.25rem] items-center justify-between gap-4">
            <div className="flex min-w-0 items-center">
              <button
                type="button"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex items-center rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label="Onukpa home"
              >
                <img
                  src={onukpa}
                  alt="Onukpa"
                  className="h-12 w-auto max-w-[9.5rem] object-contain md:h-14 md:max-w-none"
                />
              </button>
            </div>

            <div className="hidden items-center gap-8 md:flex">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="text-sm font-medium text-stone-600 transition-colors hover:text-stone-900"
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <button
                type="button"
                onClick={() => handleWhatsAppClick()}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3aa33d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                Find on WhatsApp
              </button>
            </div>

            <div className="flex items-center md:hidden">
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="rounded-lg p-2 text-stone-600 transition hover:bg-stone-100 hover:text-stone-900"
                aria-expanded={isMenuOpen}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden border-t border-stone-100 bg-white transition-[max-height,opacity] duration-300 ease-out ${
            isMenuOpen
              ? "max-h-[28rem] opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="space-y-1 px-4 py-4">
            <div className="mb-3 flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50/80 px-3 py-2 text-xs font-medium text-emerald-900">
              <MessageCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
              Save our number — house hunting lives on WhatsApp.
            </div>
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="block rounded-lg px-3 py-3 text-sm font-medium text-stone-800 hover:bg-stone-50"
              >
                {item.name}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                handleWhatsAppClick();
                setIsMenuOpen(false);
              }}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-semibold text-white shadow-sm"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              Chat on WhatsApp
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-stone-900/20 backdrop-blur-[2px] md:hidden"
          aria-label="Close menu"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <div className="h-[4.25rem]" aria-hidden />
    </>
  );
};

export default Navigation;
