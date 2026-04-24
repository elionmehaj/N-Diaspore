import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { Search, BookOpen, Clock, TreePine, Globe, Archive } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const milestoneIcons = [Clock, Globe, BookOpen, TreePine, Archive];

export default function Gjurmet() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [surname, setSurname] = useState("");
  const [village, setVillage] = useState("");
  const [region, setRegion] = useState("");
  const [period, setPeriod] = useState("");

  const milestones = [
    { year: "1400–1800", title: t.gjurmetMilestone1Title, desc: t.gjurmetMilestone1Desc },
    { year: "1878–1912", title: t.gjurmetMilestone2Title, desc: t.gjurmetMilestone2Desc },
    { year: "1939–1945", title: t.gjurmetMilestone3Title, desc: t.gjurmetMilestone3Desc },
    { year: "1990–1999", title: t.gjurmetMilestone4Title, desc: t.gjurmetMilestone4Desc },
    { year: "2008",      title: t.gjurmetMilestone5Title, desc: t.gjurmetMilestone5Desc },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t.gjurmetSearchBtn,
      description: `${surname} — ${village}`,
    });
  };

  const handleArchiveSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t.gjurmetArchiveTitle,
      description: `${region} · ${period}`,
    });
  };

  return (
    <MainLayout>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6">
              <TreePine className="w-4 h-4" /> {t.gjurmet}
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
              {t.gjurmetTitle}
            </h1>
            <p className="text-lg text-white/60 max-w-2xl leading-relaxed">
              {t.gjurmetSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Left: Search Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Archive Search */}
            <div className="bg-card border border-white/5 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Search className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-white">{t.gjurmetSearchTitle}</h2>
              </div>

              <form onSubmit={handleSearch} className="space-y-4">
                <div>
                  <Label className="text-white/80 mb-1.5 block">{t.gjurmetSurnameLabel}</Label>
                  <Input
                    value={surname}
                    onChange={e => setSurname(e.target.value)}
                    placeholder="Berisha, Krasniqi, Thaçi..."
                    className="bg-white/5 border-white/10 text-white rounded-xl focus:border-primary"
                  />
                </div>
                <div>
                  <Label className="text-white/80 mb-1.5 block">{t.gjurmetVillageLabel}</Label>
                  <Input
                    value={village}
                    onChange={e => setVillage(e.target.value)}
                    placeholder="Drenica, Rugova, Dukagjin..."
                    className="bg-white/5 border-white/10 text-white rounded-xl focus:border-primary"
                  />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-11 shadow-lg shadow-primary/20">
                  <Search className="w-4 h-4 mr-2" /> {t.gjurmetSearchBtn}
                </Button>
              </form>
            </div>

            {/* Digital Archive */}
            <div className="bg-card border border-white/5 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-2">
                <Archive className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-white">{t.gjurmetArchiveTitle}</h3>
              </div>
              <p className="text-white/50 text-sm mb-5">{t.gjurmetArchiveSubtitle}</p>

              <form onSubmit={handleArchiveSearch} className="space-y-4">
                <div>
                  <Label className="text-white/70 mb-1.5 block text-sm">{t.gjurmetRegionLabel}</Label>
                  <Select onValueChange={setRegion}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white rounded-xl">
                      <SelectValue placeholder="Prishtinë, Prizren..." />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-white/10 text-white">
                      {["Prishtinë", "Prizren", "Pejë", "Gjakovë", "Gjilan", "Mitrovicë"].map(r => (
                        <SelectItem key={r} value={r}>{r}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-white/70 mb-1.5 block text-sm">{t.gjurmetPeriodLabel}</Label>
                  <Select onValueChange={setPeriod}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white rounded-xl">
                      <SelectValue placeholder="1800–1900..." />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-white/10 text-white">
                      {["1400–1800", "1800–1878", "1878–1912", "1912–1945", "1945–1990", "1990–2008", "2008–sot"].map(p => (
                        <SelectItem key={p} value={p}>{p}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" variant="outline" className="w-full border-white/10 text-white hover:bg-white/5 rounded-xl">
                  {t.gjurmetSearchArchiveBtn}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Right: Timeline */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold text-white mb-8">{t.gjurmetTimelineTitle}</h2>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-primary/20 to-transparent" />

              <div className="space-y-8">
                {milestones.map((m, i) => {
                  const Icon = milestoneIcons[i];
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="relative pl-16"
                    >
                      {/* Dot */}
                      <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center z-10">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>

                      <div className="bg-card border border-white/5 rounded-2xl p-5 hover:border-primary/20 transition-all shadow-lg">
                        <div className="inline-flex items-center px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-xs font-bold mb-3 border border-primary/20">
                          {m.year}
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{m.title}</h3>
                        <p className="text-white/60 leading-relaxed text-sm">{m.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
