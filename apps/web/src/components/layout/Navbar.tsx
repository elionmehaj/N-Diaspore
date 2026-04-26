import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Menu, Globe, User, LogOut, LayoutDashboard, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: t.home, path: "/" },
    { name: t.services, path: "/services" },
    { name: t.kufiri, path: "/kufiri" },
    { name: t.gjuha, path: "/gjuha-jone" },
    { name: t.land, path: "/land-leasing" },
    { name: t.gjurmet, path: "/gjurmet" },
    { name: t.bizneset, path: "/bizneset" },
    { name: t.news, path: "/news" },
    { name: t.about, path: "/about" },
  ];

  const aiLink = { name: "AI Agjenti", path: "/agjenti" };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#0b0d17]/90 backdrop-blur-md border-b border-white/10 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <img src="/logo.png" alt="KahKosova Logo" className="h-[4.5rem] w-auto py-1 object-contain transition-transform group-hover:scale-105" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              href={link.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location === link.path ? "text-white" : "text-white/70"
              }`}
            >
              {link.name}
            </Link>
          ))}
          {/* AI Agjenti — highlighted link */}
          <Link
            href={aiLink.path}
            className={`flex items-center gap-1.5 text-sm font-semibold transition-all px-3 py-1.5 rounded-full border ${
              location === aiLink.path
                ? "bg-primary text-white border-primary shadow-lg shadow-primary/30"
                : "border-primary/40 text-primary hover:bg-primary/10"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {aiLink.name}
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={() => setLanguage(language === "AL" ? "DE" : "AL")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold text-white/80 hover:text-white hover:bg-white/5 transition-all border border-white/10"
          >
            <Globe className="w-4 h-4" />
            {language}
          </button>
          
          <div className="w-px h-6 bg-white/10"></div>

          {user ? (
            <div className="flex items-center gap-3">
              <Link href="/dashboard" className="text-sm font-medium text-white/90 hover:text-white transition-colors flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" />
                {t.dashboard}
              </Link>
              <Button onClick={logout} variant="ghost" size="icon" className="text-white/70 hover:text-red-400 hover:bg-red-400/10">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/sign-in" className="text-sm font-medium text-white/90 hover:text-white transition-colors">
                {t.login}
              </Link>
              <Link href="/sign-up">
                <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 rounded-full px-6">
                  {t.register}
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="w-6 h-6" />
        </Button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 w-full bg-background border-b border-white/10 shadow-2xl py-4 px-4 flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                href={link.path}
                className={`block py-2 text-base font-medium ${
                  location === link.path ? "text-primary" : "text-white/80"
                }`}
              >
                {link.name}
              </Link>
            ))}
            {/* AI Agjenti mobile link */}
            <Link
              href={aiLink.path}
              className={`flex items-center gap-2 py-2 text-base font-semibold ${
                location === aiLink.path ? "text-primary" : "text-primary/80"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              {aiLink.name}
            </Link>
            <div className="h-px bg-white/10 my-2" />
            {user ? (
              <>
                <Link href="/dashboard" className="block py-2 text-base font-medium text-white/80">{t.dashboard}</Link>
                <button onClick={logout} className="text-left py-2 text-base font-medium text-red-400">{t.logout}</button>
              </>
            ) : (
              <div className="flex flex-col gap-3 mt-2">
                <Link href="/sign-in">
                  <Button variant="outline" className="w-full justify-center border-white/10 text-white hover:bg-white/5">{t.login}</Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="w-full justify-center bg-primary hover:bg-primary/90 text-white">{t.register}</Button>
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
