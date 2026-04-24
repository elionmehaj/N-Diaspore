import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Heart, Star, MapPin, Info } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useLanguage } from "@/context/LanguageContext";

type Clinic = {
  name: string;
  city: string;
  services: string[];
  servicesDE: string[];
  rating: number;
  price: string;
  descDE: string;
};

export default function Shendeti() {
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const [city, setCity] = useState("Prishtinë");
  const [clinicType, setClinicType] = useState("E Përgjithshme");

  const clinics: Clinic[] = [
    {
      name: "Klinika Amerikan-Kosovare",
      city: "Prishtinë",
      services: ["Kontrolla të përgjithshme", "Laborator", "Imazheri"],
      servicesDE: ["Allgemeinuntersuchungen", "Labor", "Bildgebung"],
      rating: 4.8,
      price: "€20–€80 / vizitë",
      descDE: "Allgemeinmedizinische Klinik mit modernem Labor und bildgebenden Verfahren (Ultraschall, Röntgen).",
    },
    {
      name: "Dental Pro Prishtinë",
      city: "Prishtinë",
      services: ["Stomatologji", "Ortodonci", "Implantologji"],
      servicesDE: ["Zahnmedizin (Zahnheilkunde)", "Kieferorthopädie", "Implantologie (Zahnimplantate)"],
      rating: 4.7,
      price: "€30–€150 / vizitë",
      descDE: "Spezialisierte Zahnklinik: von Routineuntersuchungen bis zu Zahnimplantaten und Kieferorthopädie.",
    },
    {
      name: "Klinika Kardio Plus",
      city: "Prizren",
      services: ["Kardiologji", "EKG", "Ekokardiografi"],
      servicesDE: ["Kardiologie (Herzmedizin)", "EKG (Elektrokardiogramm)", "Echokardiographie (Herzultraschall)"],
      rating: 4.9,
      price: "€40–€100 / vizitë",
      descDE: "Herzspezialisten mit EKG, Herzultraschall und vollständiger kardiologischer Diagnostik.",
    },
    {
      name: "Qendra Shëndetësore Familja",
      city: "Gjakovë",
      services: ["Pediatri", "Gjinekologji", "Mjekësi familjare"],
      servicesDE: ["Pädiatrie (Kinderheilkunde)", "Gynäkologie (Frauenheilkunde)", "Familienmedizin"],
      rating: 4.6,
      price: "€15–€50 / vizitë",
      descDE: "Familienzentrum für Kinder- und Frauenheilkunde sowie allgemeine Familienmedizin.",
    },
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t.shendetiBookedTitle,
      description: t.shendetiBookedDesc,
    });
  };

  const cityOptions = ["Prishtinë", "Prizren", "Gjakovë", "Pejë", "Ferizaj"];
  const typeOptions =
    language === "AL"
      ? ["E Përgjithshme", "Dentare", "Kardiologji", "Pediatri"]
      : ["Allgemeinmedizin", "Zahnmedizin", "Kardiologie", "Pädiatrie"];

  return (
    <MainLayout>
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6">
            <Heart className="w-4 h-4" /> {language === "AL" ? "Shëndeti" : "Gesundheit"}
          </div>
          <h1 className="text-4xl font-display font-bold text-white mb-4">{t.shendetiTitle}</h1>
          <p className="text-lg text-white/60 max-w-2xl">{t.shendetiSubtitle}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Filters */}
          <div className="w-full lg:w-1/4 space-y-6">
            <div className="bg-card border border-white/5 rounded-2xl p-6">
              <h3 className="font-bold text-white mb-4">{t.shendetiFilter}</h3>

              <div className="space-y-4">
                <div>
                  <Label className="text-white/80 mb-2 block">{t.shendetiCity}</Label>
                  <Select value={city} onValueChange={setCity}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white w-full rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-white/10 text-white">
                      {cityOptions.map(c => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-white/80 mb-2 block">{t.shendetiClinicType}</Label>
                  <Select value={clinicType} onValueChange={setClinicType}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white w-full rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-white/10 text-white">
                      {typeOptions.map(tp => (
                        <SelectItem key={tp} value={tp}>{tp}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* German tooltip info box */}
            {language === "DE" && (
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-white mb-1">Hinweis für deutsche Nutzer</p>
                    <p className="text-xs text-white/60 leading-relaxed">
                      Alle medizinischen Fachbegriffe sind auf Albanisch und Deutsch verfügbar. Bewegen Sie die Maus über einen Dienst, um die deutsche Erklärung zu sehen.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Clinic Cards */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            {clinics.map((clinic, idx) => (
              <div key={idx} className="bg-card border border-white/5 rounded-2xl p-6 hover:border-primary/30 transition-all flex flex-col shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{clinic.name}</h3>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 text-white/70 text-xs font-medium border border-white/10">
                      <MapPin className="w-3.5 h-3.5" /> {clinic.city}
                    </div>
                  </div>
                  <div className="flex items-center text-yellow-400 font-bold bg-yellow-400/10 px-2 py-1 rounded-lg text-sm">
                    <Star className="w-4 h-4 mr-1 fill-current" /> {clinic.rating}
                  </div>
                </div>

                {/* German bilingual description */}
                {language === "DE" && (
                  <p className="text-white/50 text-xs mb-3 italic leading-relaxed border-l-2 border-primary/40 pl-3">
                    {clinic.descDE}
                  </p>
                )}

                <ul className="space-y-2 mb-6">
                  {(language === "AL" ? clinic.services : clinic.servicesDE).map((s, i) => (
                    <li key={i} className="text-white/60 text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
                      {language === "DE" ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="cursor-help border-b border-dashed border-white/20">{s}</span>
                          </TooltipTrigger>
                          <TooltipContent className="bg-card border-white/10 text-white text-xs max-w-xs">
                            AL: {clinic.services[i]}
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <span>{s}</span>
                      )}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between mt-auto">
                  <div className="text-sm font-medium text-white/80">{clinic.price}</div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/20">
                        {t.shendetiBookBtn}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-card border-white/10 text-white sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>{t.shendetiBookTitle} — {clinic.name}</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleBooking} className="space-y-4 pt-4">
                        <div>
                          <Label>{t.shendetiRelativeName}</Label>
                          <Input required className="mt-1.5 bg-white/5 border-white/10" placeholder="Shkruani emrin..." />
                        </div>
                        <div>
                          <Label>{t.shendetiPhone}</Label>
                          <Input required className="mt-1.5 bg-white/5 border-white/10" placeholder="+383 4X XXX XXX" />
                        </div>
                        <div>
                          <Label>{t.shendetiDate}</Label>
                          <Input required type="date" className="mt-1.5 bg-white/5 border-white/10 [color-scheme:dark]" />
                        </div>
                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 mt-4 h-12">
                          {t.shendetiConfirmBtn}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
