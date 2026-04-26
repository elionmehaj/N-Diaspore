import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Hammer, Star, CheckCircle, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Ndertimi() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);

  const contractors = [
    { name: "Ndërtimi Sh.P.K", specialty: "Ndërtim i Plotë", rating: 4.9, projects: 124 },
    { name: "Dardania Renovo", specialty: "Renovim i Brendshëm", rating: 4.8, projects: 89 },
    { name: "Kulla Çati", specialty: "Çati & Fasadë", rating: 4.7, projects: 210 }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Kërkesa u dërgua",
      description: "Kontraktorët tanë do t'ju dërgojnë ofertat së shpejti.",
    });
    setStep(1);
  };

  return (
    <MainLayout>
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6">
            <Hammer className="w-4 h-4" /> Ndërtimi
          </div>
          <h1 className="text-4xl font-display font-bold text-white mb-4">Kërko Ofertë për Ndërtim</h1>
          <p className="text-lg text-white/60 max-w-2xl">
            Lidheni me kontraktorë të verifikuar për ndërtime dhe renovime në Kosovë.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-[60%]">
            <div className="bg-card border border-white/5 rounded-3xl p-8 shadow-xl">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">Kërko Ofertë</h2>
                <span className="text-sm font-medium text-white/40">Hapi {step} nga 3</span>
              </div>
              
              <div className="w-full h-1 bg-white/5 rounded-full mb-8 overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>

              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="space-y-6 animate-in fade-in">
                    <Label className="text-white/80 text-base">Lloji i Projektit</Label>
                    <RadioGroup defaultValue="ndertim">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {['Çati', 'Hidraulikë', 'Ndërtim i Plotë', 'Renovim i Brendshëm'].map((type) => (
                          <div key={type} className="flex items-center space-x-3 bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 cursor-pointer">
                            <RadioGroupItem value={type.toLowerCase()} id={type} />
                            <Label htmlFor={type} className="text-white font-medium cursor-pointer flex-1">{type}</Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                    <div className="flex justify-end pt-4">
                      <Button type="button" onClick={() => setStep(2)} className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8 h-12">
                        Tjetër
                      </Button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                    <div>
                      <Label className="text-white/80 mb-2 block">Buxheti i parashikuar</Label>
                      <Select defaultValue="15-50">
                        <SelectTrigger className="bg-white/5 border-white/10 text-white h-12 rounded-xl">
                          <SelectValue placeholder="Zgjidh buxhetin" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-white/10 text-white">
                          <SelectItem value="under-5">Nën €5,000</SelectItem>
                          <SelectItem value="5-15">€5,000–€15,000</SelectItem>
                          <SelectItem value="15-50">€15,000–€50,000</SelectItem>
                          <SelectItem value="over-50">Mbi €50,000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-white/80 mb-2 block">Përshkrimi i Projektit</Label>
                      <Textarea className="bg-white/5 border-white/10 text-white rounded-xl min-h-[120px]" placeholder="Shkruani detajet e projektit tuaj..." />
                    </div>
                    <div className="flex justify-between pt-4">
                      <Button type="button" variant="outline" onClick={() => setStep(1)} className="border-white/10 text-white hover:bg-white/5 rounded-xl px-8 h-12">
                        Kthehu
                      </Button>
                      <Button type="button" onClick={() => setStep(3)} className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8 h-12">
                        Tjetër
                      </Button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-white/80 mb-2 block">Emri dhe Mbiemri</Label>
                        <Input required className="bg-white/5 border-white/10 text-white h-12 rounded-xl" placeholder="Emri juaj" />
                      </div>
                      <div>
                        <Label className="text-white/80 mb-2 block">Emaili</Label>
                        <Input required type="email" className="bg-white/5 border-white/10 text-white h-12 rounded-xl" placeholder="Emaili juaj" />
                      </div>
                      <div>
                        <Label className="text-white/80 mb-2 block">Telefoni</Label>
                        <Input required className="bg-white/5 border-white/10 text-white h-12 rounded-xl" placeholder="Numri i telefonit" />
                      </div>
                    </div>
                    <div className="flex justify-between pt-4">
                      <Button type="button" variant="outline" onClick={() => setStep(2)} className="border-white/10 text-white hover:bg-white/5 rounded-xl px-8 h-12">
                        Kthehu
                      </Button>
                      <Button type="submit" className="bg-primary hover:bg-primary/90 text-white rounded-xl px-8 h-12">
                        Dërgo Kërkesën
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>

          <div className="w-full lg:w-[40%] space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Kontraktorët Tanë</h3>
              <div className="space-y-4">
                {contractors.map((contractor, i) => (
                  <div key={i} className="bg-card border border-white/5 p-5 rounded-2xl flex items-center justify-between group hover:border-primary/30 transition-all">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-white">{contractor.name}</h4>
                        <Shield className="w-4 h-4 text-emerald-400" />
                      </div>
                      <p className="text-white/50 text-sm mb-2">{contractor.specialty}</p>
                      <p className="text-white/40 text-xs">{contractor.projects} projekte të përfunduara</p>
                    </div>
                    <div className="text-right">
                      <div className="bg-yellow-400/10 text-yellow-400 text-sm font-bold px-2 py-1 rounded-lg inline-flex items-center">
                        <Star className="w-4 h-4 mr-1 fill-current" /> {contractor.rating}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6">
              <div className="flex gap-4">
                <CheckCircle className="w-8 h-8 text-primary shrink-0" />
                <div>
                  <h4 className="font-bold text-white mb-2">Pse ne?</h4>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">
                    "Gjetëm kontraktorin ideal për shtëpinë tonë në Pejë përmes KahKosova. Proces transparent dhe pa stres."
                  </p>
                  <p className="text-white/50 text-xs">— Besart M., Zvicër</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}