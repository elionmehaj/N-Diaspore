import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { MapPin, Gift, FileText, ArrowRight, ShieldCheck, Globe, Clock, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const CITIES = [
  "prishtina",
  "peja",
  "prizren",
  "gjilan",
  "ferizaj",
  "gjakova",
  "mitrovica"
];

export default function Home() {
  const { t } = useLanguage();
  const [currentCityIndex, setCurrentCityIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCityIndex((prev) => (prev + 1) % CITIES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black">
          {CITIES.map((city, index) => (
            <img
              key={city}
              src={`/images/${city}.png`}
              alt={`${city} Landscape`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentCityIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          {/* Phase 3: Dark overlay for perfect text contrast */}
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {t.heroTagline}
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-bold leading-[1.1] mb-6">
              {t.heroTitle1} <br />
              <span className="text-gradient-primary">{t.heroTitle2}</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/70 mb-10 max-w-2xl leading-relaxed">
              {t.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/services">
                <Button size="lg" className="w-full sm:w-auto text-base h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 group">
                  {t.heroBtn1}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base h-14 px-8 rounded-full border-white/20 text-white hover:bg-white/5 bg-white/5 backdrop-blur-sm">
                  {t.heroBtn2}
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-16 pt-8 border-t border-white/10">
              <div>
                <p className="text-3xl font-display font-bold text-white mb-1">2,847</p>
                <p className="text-sm text-white/50">{t.statFamilies}</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-white mb-1">12</p>
                <p className="text-sm text-white/50">{t.statKomuens}</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-white mb-1">98%</p>
                <p className="text-sm text-white/50">{t.statSatisfaction}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-card relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial" whileInView="animate" viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">{t.featuresTitle}</h2>
            <p className="text-white/60 max-w-2xl mx-auto">{t.featuresSubtitle}</p>
          </motion.div>

          <motion.div
            initial="initial" whileInView="animate" viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeIn} className="bg-background rounded-2xl p-8 border border-white/5 hover:border-primary/30 transition-all duration-300 group hover:-translate-y-1 shadow-lg">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t.feature1Title}</h3>
              <p className="text-white/60 mb-6 leading-relaxed">{t.feature1Desc}</p>
              <Link href="/land-leasing" className="text-primary font-medium flex items-center group/link">
                {t.seeMore} <ChevronRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-background rounded-2xl p-8 border border-white/5 hover:border-primary/30 transition-all duration-300 group hover:-translate-y-1 shadow-lg">
              <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Gift className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t.feature2Title}</h3>
              <p className="text-white/60 mb-6 leading-relaxed">{t.feature2Desc}</p>
              <Link href="/services/gift-gateway" className="text-purple-400 font-medium flex items-center group/link">
                {t.seeMore} <ChevronRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-background rounded-2xl p-8 border border-white/5 hover:border-primary/30 transition-all duration-300 group hover:-translate-y-1 shadow-lg">
              <div className="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t.feature3Title}</h3>
              <p className="text-white/60 mb-6 leading-relaxed">{t.feature3Desc}</p>
              <Link href="/services/form-builder" className="text-emerald-400 font-medium flex items-center group/link">
                {t.seeMore} <ChevronRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="glass-panel rounded-3xl p-8 md:p-16 text-center max-w-4xl mx-auto">
            <ShieldCheck className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">{t.trustTitle}</h2>
            <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">{t.trustSubtitle}</p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2 text-white/80 bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                <Globe className="w-5 h-5 text-primary" /> {t.trustCurrency}
              </div>
              <div className="flex items-center gap-2 text-white/80 bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                <Clock className="w-5 h-5 text-primary" /> {t.trustInstant}
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
