import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { Star, ShieldCheck, ExternalLink, Briefcase, Cpu, Utensils, Hammer } from "lucide-react";
import { useState } from "react";

type Category = "all" | "gastronomy" | "tech" | "craft";

type Business = {
  name: string;
  nameDE: string;
  category: Category;
  city: string;
  rating: number;
  reviews: number;
  desc: string;
  descDE: string;
  url: string;
  verified: boolean;
};

const businesses: Business[] = [
  {
    name: "Rrënja Restaurant",
    nameDE: "Restaurant Rrënja",
    category: "gastronomy",
    city: "Prishtinë",
    rating: 4.9,
    reviews: 312,
    desc: "Autentike kuzhinë shqiptare. Produktet direkte nga fermat lokale.",
    descDE: "Authentische albanische Küche. Produkte direkt von lokalen Bauernhöfen.",
    url: "#",
    verified: true,
  },
  {
    name: "TechKosova Studio",
    nameDE: "TechKosova Studio",
    category: "tech",
    city: "Prishtinë",
    rating: 4.8,
    reviews: 189,
    desc: "Agjensi digjitale për zhvillim web dhe aplikacione mobile.",
    descDE: "Digitalagentur für Webentwicklung und mobile Anwendungen.",
    url: "#",
    verified: true,
  },
  {
    name: "Dugajli Craft Beer",
    nameDE: "Dugajli Craft Beer",
    category: "gastronomy",
    city: "Prizren",
    rating: 4.7,
    reviews: 245,
    desc: "Birrë artizanale e prodhuar me receta tradicionale të Kosovës.",
    descDE: "Craft-Bier nach traditionellen kosovarischen Rezepten gebraut.",
    url: "#",
    verified: true,
  },
  {
    name: "KosovaArt Handmade",
    nameDE: "KosovaArt Handgemacht",
    category: "craft",
    city: "Gjakovë",
    rating: 4.9,
    reviews: 421,
    desc: "Produkte artizanale kosovare — filigran, qëndisma dhe qeramikë tradicionale.",
    descDE: "Handgemachte kosovarische Produkte — Filigran, Stickerei und traditionelle Keramik.",
    url: "#",
    verified: true,
  },
  {
    name: "Diaspora Digital Hub",
    nameDE: "Diaspora Digital Hub",
    category: "tech",
    city: "Ferizaj",
    rating: 4.6,
    reviews: 134,
    desc: "IT consulting dhe shërbime cloud për bizneset e diasporës.",
    descDE: "IT-Beratung und Cloud-Dienste für Diaspora-Unternehmen.",
    url: "#",
    verified: false,
  },
  {
    name: "Gjilani Bakery",
    nameDE: "Bäckerei Gjilani",
    category: "gastronomy",
    city: "Gjilan",
    rating: 4.8,
    reviews: 567,
    desc: "Bukë, byrekë dhe ëmbëlsira tradicionale. Dorëzim çdo ditë.",
    descDE: "Brot, Burek und traditionelle Süßigkeiten. Täglich zugestellt.",
    url: "#",
    verified: true,
  },
  {
    name: "Marka Rugova",
    nameDE: "Marka Rugova",
    category: "craft",
    city: "Pejë",
    rating: 4.7,
    reviews: 298,
    desc: "Produkte lëkure artizanale dhe aksesorë të frymëzuar nga Alpet e Rugovës.",
    descDE: "Handgefertigte Lederprodukte und Accessoires, inspiriert von den Rugova-Alpen.",
    url: "#",
    verified: true,
  },
  {
    name: "SolarTech Kosovo",
    nameDE: "SolarTech Kosovo",
    category: "tech",
    city: "Mitrovicë",
    rating: 4.5,
    reviews: 88,
    desc: "Instalime solare dhe konsulencë energjitike për bizneset dhe shtëpitë.",
    descDE: "Solarinstallationen und Energieberatung für Unternehmen und Häuser.",
    url: "#",
    verified: false,
  },
];

const categoryIcons: Record<Category, React.ElementType> = {
  all: Briefcase,
  gastronomy: Utensils,
  tech: Cpu,
  craft: Hammer,
};

export default function Bizneset() {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const categories: { key: Category; label: string }[] = [
    { key: "all", label: t.biznesetAll },
    { key: "gastronomy", label: t.biznesetGastronomy },
    { key: "tech", label: t.biznesetTech },
    { key: "craft", label: t.biznesetCraft },
  ];

  const filtered = activeCategory === "all"
    ? businesses
    : businesses.filter(b => b.category === activeCategory);

  return (
    <MainLayout>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6">
              <Briefcase className="w-4 h-4" /> {t.bizneset}
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              {t.biznesetTitle}
            </h1>
            <p className="text-lg text-white/60 max-w-2xl">{t.biznesetSubtitle}</p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map(cat => {
            const Icon = categoryIcons[cat.key];
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                  isActive
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                    : "bg-card text-white/70 border-white/10 hover:border-white/20 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Business Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {filtered.map((biz, i) => (
            <motion.div
              key={biz.name}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-card border border-white/5 rounded-2xl p-6 hover:border-primary/30 transition-all shadow-lg flex flex-col group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-lg font-bold text-white truncate">
                      {language === "AL" ? biz.name : biz.nameDE}
                    </h3>
                    {biz.verified && (
                      <Badge className="bg-primary/15 text-primary border border-primary/30 text-xs shrink-0 flex items-center gap-1 px-2 py-0.5">
                        <ShieldCheck className="w-3 h-3" /> {t.biznesetVerified}
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-white/50">{biz.city}</span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 bg-yellow-400/10 px-2.5 py-1.5 rounded-xl ml-3 shrink-0">
                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  <span className="text-yellow-400 font-bold text-sm">{biz.rating}</span>
                </div>
              </div>

              {/* Category Badge */}
              <div className="mb-3">
                {(() => {
                  const Icon = categoryIcons[biz.category];
                  const catLabel = categories.find(c => c.key === biz.category)?.label ?? "";
                  return (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 text-white/60 text-xs border border-white/10">
                      <Icon className="w-3 h-3" /> {catLabel}
                    </span>
                  );
                })()}
              </div>

              {/* Description */}
              <p className="text-white/60 text-sm leading-relaxed mb-4 flex-1">
                {language === "AL" ? biz.desc : biz.descDE}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                <span className="text-xs text-white/40">
                  {biz.reviews} {t.biznesetReviews}
                </span>
                <Button
                  asChild
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-white rounded-xl shadow-md shadow-primary/20 text-xs"
                >
                  <a href={biz.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
                    {t.biznesetVisitBtn} <ExternalLink className="w-3 h-3" />
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </MainLayout>
  );
}
