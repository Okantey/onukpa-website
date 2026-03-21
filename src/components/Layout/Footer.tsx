import {
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
} from "lucide-react";
import onukpa from "../../assets/onukpa-white.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Properties", href: "#properties" },
    { name: "How it works", href: "#how-it-works" },
    { name: "Areas", href: "#areas" },
    { name: "For landlords", href: "#landlords" },
    { name: "For agents", href: "#for-agents" },
    { name: "Stories", href: "#testimonials" },
  ];

  const supportLinks = [
    { name: "WhatsApp", href: "https://wa.me/+233245095569" },
    { name: "support@onukpa.com", href: "mailto:support@onukpa.com" },
    {
      name: "Agent onboarding",
      href: `https://wa.me/233245095569?text=${encodeURIComponent(
        "Hi Onukpa! I'm an agent and want to register and list properties.",
      )}`,
    },
    { name: "FAQ", href: "#faq" },
  ];

  const legalLinks = [
    { name: "Privacy & terms", href: "/terms" },
  ];

  const socialLinks = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: "https://wa.me/+233245095569",
    },
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
  ];

  const contactInfo = [
    { icon: Phone, text: "+233 24 509 5569", href: "tel:+233245095569" },
    {
      icon: Mail,
      text: "support@onukpa.com",
      href: "mailto:support@onukpa.com",
    },
    { icon: MapPin, text: "Accra, Ghana", href: "#areas" },
  ];

  return (
    <footer className="bg-stone-950 text-stone-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <img
              src={onukpa}
              alt="Onukpa"
              className="h-14 w-auto object-contain"
            />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-stone-400">
              WhatsApp-first rentals for Accra — verified options, no viewing
              fees, and clear success-based pricing when you close.
            </p>
            <div className="mt-6 space-y-3">
              {contactInfo.map((item) => (
                <a
                  key={item.text}
                  href={item.href}
                  className="flex items-center gap-3 text-sm text-stone-300 transition hover:text-white"
                >
                  <item.icon className="h-4 w-4 shrink-0 text-primary" />
                  {item.text}
                </a>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-stone-400 transition hover:border-white/20 hover:text-white"
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
                Explore
              </h3>
              <ul className="mt-4 space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-sm text-stone-300 transition hover:text-white"
                    >
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                      <span className="-ml-4 group-hover:ml-0 transition-[margin]">
                        {link.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
                Support
              </h3>
              <ul className="mt-4 space-y-2.5">
                {supportLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-sm text-stone-300 transition hover:text-white"
                    >
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                      <span className="-ml-4 group-hover:ml-0 transition-[margin]">
                        {link.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
                Legal
              </h3>
              <ul className="mt-4 space-y-2.5">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-stone-300 transition hover:text-white"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-xs text-stone-500 sm:flex-row">
          <p>© {currentYear} Onukpa. All rights reserved.</p>
          <p>Made for renters, landlords, and agents in Ghana.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
