import { Link } from "react-router-dom";
import { Home, Compass } from "lucide-react";
import Navigation from "../Layout/Navigation";
import Footer from "../Layout/Footer";
import WhatsAppFloatingButton from "../UI/WhatsappFloatingButton";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50/80">
      <WhatsAppFloatingButton />
      <Navigation />
      <main className="flex flex-col items-center justify-center px-4 sm:px-6 pt-10 pb-24 md:pt-16 md:pb-28">
        <div className="max-w-lg w-full text-center">
          <p
            className="text-[clamp(5rem,18vw,9rem)] font-bold leading-none tracking-tight text-primary/15 select-none"
            aria-hidden
          >
            404
          </p>
          <div className="-mt-8 md:-mt-12 relative">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs md:text-sm font-medium mb-4">
              Page not found
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              This link doesn’t lead anywhere
            </h1>
            <p className="text-base text-slate-600 leading-relaxed mb-8">
              The page may have moved, the address might be wrong, or the listing could be
              offline. Head back to Onukpa and start fresh.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-white text-sm font-semibold shadow-md hover:bg-primary/90 transition-all"
              >
                <Home className="w-5 h-5" aria-hidden />
                Back to home
              </Link>
              <Link
                to="/#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-300 bg-white text-slate-800 text-sm font-semibold hover:border-primary/50 hover:text-primary transition-all"
              >
                <Compass className="w-5 h-5" aria-hidden />
                How Onukpa works
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
