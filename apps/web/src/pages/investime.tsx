import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { TrendingUp, Building2, Leaf, Cpu, Info } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";

type Project = {
  name: string;
  category: string;
  categoryDE: string;
  icon: React.ElementType;
  progress: number;
  funded: string;
  fundedDE: string;
  roi: string;
  min: string;
  tooltipDE: string;
};

export default function Investime() {
  const { toast } = useToast();
  const { t, language } = useLanguage();

  const projects: Project[] = [
    {
      name: "Rezidenca Dardania",
      category: "Pasuri e Paluajtshme",
      categoryDE: "Immobilien",
      icon: Building2,
      progress: 75,
      funded: "€75k nga €100k",
      fundedDE: "€75k von €100k",
      roi: "10% / vit",
      min: "€1,000",
      tooltipDE: "Immobilienprojekt: Wohnkomplex in Prishtina. Erwartete Rendite 10% pro Jahr (jährlicher Gewinn bezogen auf das eingesetzte Kapital).",
    },
    {
      name: "AgriTech Kosovo",
      category: "Bujqësi",
      categoryDE: "Landwirtschaft",
      icon: Leaf,
      progress: 40,
      funded: "€20k nga €50k",
      fundedDE: "€20k von €50k",
      roi: "18% / vit",
      min: "€500",
      tooltipDE: "Agrar-Technologie: Modernisierung landwirtschaftlicher Betriebe. ROI (Kapitalrendite) von 18% pro Jahr erwartet.",
    },
    {
      name: "Solar Kosova",
      category: "Teknologji",
      categoryDE: "Technologie",
      icon: Cpu,
      progress: 60,
      funded: "€120k nga €200k",
      fundedDE: "€120k von €200k",
      roi: "15% / vit",
      min: "€750",
      tooltipDE: "Solarenergie-Projekt: Installation von Photovoltaikanlagen. Nachhaltige Rendite von 15% pro Jahr.",
    },
    {
      name: "Hotel Rugova",
      category: "Turizëm",
      categoryDE: "Tourismus",
      icon: Building2,
      progress: 25,
      funded: "€50k nga €200k",
      fundedDE: "€50k von €200k",
      roi: "20% / vit",
      min: "€2,000",
      tooltipDE: "Tourismusprojekt: Boutique-Hotel in den Rugova-Bergen. Höchste erwartete Rendite (ROI) von 20% pro Jahr.",
    },
  ];

  const handleInvest = (name: string) => {
    toast({
      title: t.investimeRegistered,
      description: `${t.investimeRegisteredDesc} — ${name}`,
    });
  };

  return (
    <MainLayout>
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6">
            <TrendingUp className="w-4 h-4" /> {language === "AL" ? "Investime" : "Investitionen"}
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">{t.investimeTitle}</h1>
          <p className="text-lg text-white/60">{t.investimeSubtitle}</p>
        </div>

        {/* German Info Banner */}
        {language === "DE" && (
          <div className="mb-10 bg-primary/5 border border-primary/20 rounded-2xl p-5 flex items-start gap-3">
            <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-white mb-1">Hinweise für deutsche Investoren</p>
              <p className="text-sm text-white/60 leading-relaxed">
                Alle Fachbegriffe sind auf Deutsch verfügbar. Bewegen Sie die Maus über den Projektnamen für eine vollständige Erklärung auf Deutsch. ROI = Kapitalrendite (Return on Investment).
              </p>
            </div>
          </div>
        )}

        <h2 className="text-2xl font-bold text-white mb-8">{t.investimeActiveTitle}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
          {projects.map((p, i) => (
            <div key={i} className="bg-card border border-white/5 rounded-2xl p-6 hover:border-primary/30 transition-all flex flex-col shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                  <p.icon className="w-5 h-5 text-white/70" />
                </div>
                <div>
                  {language === "DE" ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <h3 className="font-bold text-white text-base leading-tight cursor-help border-b border-dashed border-white/20 inline-block">
                          {p.name}
                        </h3>
                      </TooltipTrigger>
                      <TooltipContent className="bg-card border-white/10 text-white text-xs max-w-xs leading-relaxed">
                        {p.tooltipDE}
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <h3 className="font-bold text-white text-base leading-tight">{p.name}</h3>
                  )}
                  <span className="text-xs text-primary font-medium">
                    {language === "AL" ? p.category : p.categoryDE}
                  </span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/60">{t.investimeCollected}</span>
                    <span className="text-white font-medium">
                      {language === "AL" ? p.funded : p.fundedDE}
                    </span>
                  </div>
                  <Progress value={p.progress} className="h-2 bg-white/10" />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                    <p className="text-white/40 text-xs mb-1">{t.investimeRoi}</p>
                    <p className="text-emerald-400 font-bold">{p.roi}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                    <p className="text-white/40 text-xs mb-1">{t.investimeMin}</p>
                    <p className="text-white font-bold">{p.min}</p>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => handleInvest(p.name)}
                className="w-full mt-auto bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/20"
              >
                {t.investimeNowBtn}
              </Button>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-card border border-white/5 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/5">
            <h2 className="text-xl font-bold text-white">{t.investimeAllTitle}</h2>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-white/5 border-b border-white/10">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-white/60">{t.investimeProjectCol}</TableHead>
                  <TableHead className="text-white/60">{t.investimeCatCol}</TableHead>
                  <TableHead className="text-white/60">{t.investimeRoiCol}</TableHead>
                  <TableHead className="text-white/60">{t.investimeMinCol}</TableHead>
                  <TableHead className="text-white/60">{t.investimeStatusCol}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((p, i) => (
                  <TableRow key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <TableCell className="font-medium text-white">{p.name}</TableCell>
                    <TableCell className="text-white/70">
                      {language === "AL" ? p.category : p.categoryDE}
                    </TableCell>
                    <TableCell className="text-emerald-400 font-medium">{p.roi}</TableCell>
                    <TableCell className="text-white/70">{p.min}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {t.investimeActive}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
