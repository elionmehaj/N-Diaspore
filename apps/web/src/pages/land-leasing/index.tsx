import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { MapPin, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { TokaMap } from "@/components/map/TokaMap";

// Shared properties data (same as in TokaMap for consistency)
const properties = [
  { id: 1, title: "Tokë Bujqësore në Prishtinë", titleDE: "Ackerland in Pristina", location: "Prishtinë", hectares: 2.5, price: "€150/muaj", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80" },
  { id: 2, title: "Parcelë Komerciale në Prizren", titleDE: "Gewerbepark in Prizren", location: "Prizren", hectares: 1.2, price: "€450/muaj", image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80" },
  { id: 3, title: "Tokë me Pemëtore në Pejë", titleDE: "Obstgarten in Peja", location: "Pejë", hectares: 4.0, price: "€200/muaj", image: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?w=800&q=80" },
  { id: 4, title: "Parcelë Industriale në Gjilan", titleDE: "Industriefläche in Gjilan", location: "Gjilan", hectares: 3.0, price: "€350/muaj", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80" },
  { id: 5, title: "Vilë dhe Tokë në Gjakovë", titleDE: "Villa und Land in Gjakova", location: "Gjakovë", hectares: 0.8, price: "€600/muaj", image: "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800&q=80" },
];

export default function LandLeasing() {
  const { t, language } = useLanguage();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const filtered = properties.filter(p => 
    p.location.toLowerCase().includes(search.toLowerCase()) ||
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="flex flex-col lg:flex-row h-screen pt-[72px]">
        {/* Left: Property List */}
        <div className="w-full lg:w-[45%] xl:w-[40%] flex flex-col border-r border-white/5 bg-background overflow-hidden">
          <div className="p-6 border-b border-white/5 shrink-0">
            <h1 className="text-2xl font-display font-bold text-white mb-1">{t.mapTitle}</h1>
            <p className="text-white/50 text-sm">{filtered.length} {t.propertyFound}</p>
          </div>

          <div className="p-4 border-b border-white/5 shrink-0 flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <Input
                placeholder={t.searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-white/5 border-white/10 text-white h-10 rounded-xl focus:border-primary"
              />
            </div>
            <Button variant="outline" className="h-10 px-3 border-white/10 text-white hover:bg-white/5 rounded-xl shrink-0">
              <Filter className="w-4 h-4 mr-1.5" /> {t.filters}
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {filtered.map(p => (
              <div
                key={p.id}
                onClick={() => setSelectedId(p.id === selectedId ? null : p.id)}
                className={`bg-card border rounded-2xl p-3 flex gap-4 cursor-pointer transition-all duration-200 group ${
                  selectedId === p.id 
                    ? "border-primary/50 shadow-lg shadow-primary/10" 
                    : "border-white/5 hover:border-white/20"
                }`}
              >
                <div className="w-24 h-20 rounded-xl overflow-hidden shrink-0">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <h3 className="font-bold text-white text-sm leading-tight mb-1 truncate">
                    {language === "AL" ? p.title : p.titleDE}
                  </h3>
                  <div className="flex items-center text-white/50 text-xs mb-auto">
                    <MapPin className="w-3 h-3 mr-1 shrink-0" /> {p.location}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="bg-white/5 px-2 py-0.5 rounded text-xs text-white/70 border border-white/10">
                      {p.hectares} {t.hectares}
                    </span>
                    <span className="font-bold text-primary text-sm">{p.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Interactive Map */}
        <div className="flex-1 h-[500px] lg:h-auto relative">
          <TokaMap />
        </div>
      </div>
    </MainLayout>
  );
}
