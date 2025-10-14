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
    { name: "Features", href: "#features" },
    { name: "For Agents", href: "#agents" },
    { name: "Testimonials", href: "#testimonials" },
    // { name: "How It Works", href: "#how-it-works" },
  ];

  const supportLinks = [
    { name: "Help Center", href: "#help" },
    { name: "Contact Support", href: "#contact" },
    { name: "Agent Registration", href: "#agents" },
    // { name: "FAQ", href: "#faq" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/terms" },
    { name: "Terms of Service", href: "/terms" },
  ];

  const socialLinks = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: "https://wa.me/+233245095569",
      color: "hover:text-green-400",
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: "#",
      color: "hover:text-blue-400",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "#",
      color: "hover:text-pink-400",
    },
    { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-blue-300" },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "#",
      color: "hover:text-blue-500",
    },
  ];

  const contactInfo = [
    { icon: Phone, text: "+233 24 509 5569", href: "tel:+233245095569" },
    {
      icon: Mail,
      text: "support@onukpa.com",
      href: "mailto:support@onukpa.com",
    },
    { icon: MapPin, text: "Accra, Ghana", href: "#" },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            {/* Brand Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <img
                  src={onukpa}
                  alt="Onukpa"
                  className="w-40 h-16 rounded-lg object-contain"
                />
              </div>

              <p className="text-base text-slate-300 max-w-md leading-relaxed">
                Ghana's fastest-growing rental platform powered by WhatsApp.
                Connecting renters with verified agents instantly.
              </p>

              {/* Contact Information */}
              <div className="space-y-3">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center space-x-3 text-slate-300 hover:text-white transition-colors group"
                  >
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium">{item.text}</span>
                  </a>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex space-x-4 pt-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center transition-all duration-300 ${social.color} hover:bg-slate-700/80 hover:scale-110 hover:shadow-lg`}
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Grid */}
            <div className="grid sm:grid-cols-3 gap-8">
              {/* Quick Links */}
              <div>
                <h3 className="font-bold text-lg mb-6 text-white relative inline-block">
                  Quick Links
                  <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-primary rounded-full"></div>
                </h3>
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="flex items-center space-x-2 text-slate-300 hover:text-white transition-all duration-200 group"
                      >
                        <ArrowRight className="w-4 h-4  transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                        <span>{link.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="font-bold text-lg mb-6 text-white relative inline-block">
                  Support
                  <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-primary rounded-full"></div>
                </h3>
                <ul className="space-y-3">
                  {supportLinks.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="flex items-center space-x-2 text-slate-300 hover:text-white transition-all duration-200 "
                      >
                        <ArrowRight className="w-4 h-4  transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                        <span>{link.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="font-bold text-lg mb-6 text-white relative inline-block">
                  Legal
                  <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-primary rounded-full"></div>
                </h3>
                <ul className="space-y-3">
                  {legalLinks.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="flex items-center space-x-2 text-slate-300 hover:text-white transition-all duration-200 "
                      >
                        <ArrowRight className="w-4 h-4  transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                        <span>{link.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-700/50 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 flex-wrap">
              <div className="text-slate-400 text-center md:text-left">
                <p>&copy; {currentYear} Onukpa. All rights reserved. | </p>
              </div>
              <span className="text-slate-400">Made with ❤️ for Ghana</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
