import onukpa from "../../assets/onukpa-white.png";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <img
              src={onukpa}
              alt="Onukpa"
              className="w-36 h-16 rounded-lg object-contain mb-3"
            />
            <p className="text-slate-400">
              Your Trusted WhatsApp Rental Assistant for Accra.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2 text-slate-400">
              <a href="#" className="block hover:text-white transition-colors">
                About
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                FAQ
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                Documentation
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              {["WhatsApp", "LinkedIn", "Instagram"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <div className="space-y-2 text-slate-400">
              <a href="#" className="block hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; {new Date().getFullYear()} Onukpa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
