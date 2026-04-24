import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, Volume2, Quote, CheckCircle2, XCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const PROVERBS = [
  { al: "Guri peshon rëndë në vend të vet.", de: "Ein Stein wiegt schwer an seinem eigenen Platz. (Zuhause ist man am stärksten)" },
  { al: "Ku ka zemër, ka edhe rrugë.", de: "Wo ein Wille ist, ist auch ein Weg." },
  { al: "Besa e shqiptarit nuk shitet me para.", de: "Das Ehrenwort (Besa) eines Albaners ist nicht mit Geld zu kaufen." },
  { al: "Pyet 100 vetë e bëj si di vetë.", de: "Frage 100 Leute und mach, was du für richtig hältst." },
  { al: "Më mirë një ditë si luan, se njëqind ditë si dele.", de: "Lieber ein Tag als Löwe, als hundert Tage als Schaf." },
];

const QUIZ_WORDS = [
  { al: "Zemër", de: "Herz" },
  { al: "Vatër", de: "Heimat/Herd" },
  { al: "Fjalë", de: "Wort" },
  { al: "Besa", de: "Ehrenwort" },
];

export default function GjuhaJone() {
  const [selectedAl, setSelectedAl] = useState<string | null>(null);
  const [selectedDe, setSelectedDe] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  
  const handleAlClick = (word: string) => {
    if (matches[word]) return;
    setSelectedAl(word);
    checkMatch(word, selectedDe);
  };

  const handleDeClick = (word: string) => {
    if (Object.values(matches).includes(word)) return;
    setSelectedDe(word);
    checkMatch(selectedAl, word);
  };

  const checkMatch = (al: string | null, de: string | null) => {
    if (al && de) {
      const correctDe = QUIZ_WORDS.find(w => w.al === al)?.de;
      if (correctDe === de) {
        setMatches(prev => ({ ...prev, [al]: de }));
      }
      setTimeout(() => {
        setSelectedAl(null);
        setSelectedDe(null);
      }, 500);
    }
  };

  return (
    <MainLayout>
      <div className="pt-28 pb-20 min-h-screen bg-background relative">
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              Gjuha Jonë
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Kultura dhe identiteti ynë fillon tek gjuha. Mëso fjalë të reja, zbulo urtësinë popullore dhe luaj për t'i mbajtur gjallë rrënjët.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Word of the day */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-opacity-10 transition-opacity">
                <Volume2 className="w-32 h-32 text-primary/5 rotate-12" />
              </div>
              <p className="text-sm font-bold tracking-widest text-primary uppercase mb-6">Fjala e Ditës</p>
              <h2 className="text-6xl md:text-7xl font-display font-bold text-white mb-4">Mall</h2>
              <p className="text-2xl text-white/50 mb-10">Sehnsucht / Vermissen</p>
              
              <p className="text-white/80 leading-relaxed max-w-md mb-8">
                The deep feeling of longing for your homeland, family, or loved ones. A cornerstone emotion of the diaspora experience.
              </p>

              <Button className="bg-white/10 hover:bg-white/20 text-white rounded-full gap-2 border border-white/10">
                <Play className="w-4 h-4" /> Dëgjo theksimin
              </Button>
            </motion.div>

            {/* Quiz */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-panel p-8 md:p-12 rounded-3xl flex flex-col"
            >
              <h3 className="text-2xl font-display font-bold text-white mb-2">Mini-Lojë: Lidh Fjalët</h3>
              <p className="text-white/60 mb-8">Match the Albanian word to its German translation.</p>
              
              <div className="grid grid-cols-2 gap-8 flex-1">
                <div className="flex flex-col gap-3">
                  {QUIZ_WORDS.map(w => w.al).map(word => {
                    const isMatched = !!matches[word];
                    const isSelected = selectedAl === word;
                    return (
                      <button
                        key={word}
                        onClick={() => handleAlClick(word)}
                        disabled={isMatched}
                        className={`p-4 rounded-xl border text-left font-medium transition-all ${
                          isMatched ? "bg-green-500/10 border-green-500/30 text-green-400 opacity-60" :
                          isSelected ? "bg-primary/20 border-primary text-white" :
                          "bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {word}
                      </button>
                    )
                  })}
                </div>
                <div className="flex flex-col gap-3">
                  {QUIZ_WORDS.map(w => w.de).sort().map(word => {
                    const isMatched = Object.values(matches).includes(word);
                    const isSelected = selectedDe === word;
                    return (
                      <button
                        key={word}
                        onClick={() => handleDeClick(word)}
                        disabled={isMatched}
                        className={`p-4 rounded-xl border text-left font-medium transition-all ${
                          isMatched ? "bg-green-500/10 border-green-500/30 text-green-400 opacity-60" :
                          isSelected ? "bg-primary/20 border-primary text-white" :
                          "bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {word}
                      </button>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-panel p-8 md:p-12 rounded-3xl"
          >
            <div className="flex items-center gap-4 mb-8">
              <Quote className="w-8 h-8 text-primary" />
              <h3 className="text-3xl font-display font-bold text-white">Shprehje Popullore</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TooltipProvider>
                {PROVERBS.map((proverb, i) => (
                  <Tooltip key={i} delayDuration={100}>
                    <TooltipTrigger asChild>
                      <div className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-colors cursor-help group">
                        <p className="text-white/90 font-medium group-hover:text-primary transition-colors">
                          "{proverb.al}"
                        </p>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="bg-card border-white/10 p-3 max-w-sm rounded-xl">
                      <p className="text-white text-sm">{proverb.de}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>
          </motion.div>

        </div>
      </div>
    </MainLayout>
  );
}
