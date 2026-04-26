import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function FormBuilder() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    idNumber: "",
    purpose: "",
    date: new Date().toISOString().split('T')[0],
  });

  const handleDownload = () => {
    toast({
      title: "PDF u Gjenerua",
      description: "Formulari juaj dygjuhësh u shkarkua me sukses.",
    });
  };

  return (
    <MainLayout>
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm mb-6">
            <FileText className="w-4 h-4" /> Letrat
          </div>
          <h1 className="text-4xl font-display font-bold text-white mb-4">Krijuesi i Formularëve Dygjuhësh</h1>
          <p className="text-lg text-white/60 max-w-2xl">
            Gjeneroni dokumente ligjore shqip/anglisht të formatuara në mënyrë të përsosur, të nevojshme për administratën e Kosovës.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Side */}
          <div className="bg-card border border-white/5 rounded-3xl p-8 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Detajet e Dokumentit</h3>
            
            <div className="space-y-6">
              <div>
                <Label className="text-white/80 mb-2 block">Emri i Plotë / Full Name</Label>
                <Input 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Shkruani emrin tuaj ligjor"
                  className="bg-white/5 border-white/10 text-white h-12 rounded-xl"
                />
              </div>

              <div>
                <Label className="text-white/80 mb-2 block">Numri Personal / Personal ID</Label>
                <Input 
                  value={formData.idNumber}
                  onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                  placeholder="Numri personal 10-shifror"
                  className="bg-white/5 border-white/10 text-white h-12 rounded-xl"
                />
              </div>

              <div>
                <Label className="text-white/80 mb-2 block">Qëllimi i Formularit / Form Purpose</Label>
                <Select value={formData.purpose} onValueChange={(val) => setFormData({ ...formData, purpose: val })}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white h-12 rounded-xl">
                    <SelectValue placeholder="Zgjidhni qëllimin" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-white/10 text-white">
                    <SelectItem value="power_of_attorney">Autorizim (Power of Attorney)</SelectItem>
                    <SelectItem value="property_transfer">Kërkesë për Transferim Prone</SelectItem>
                    <SelectItem value="civil_status">Deklaratë e Gjendjes Civile</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-white/80 mb-2 block">Data / Date</Label>
                <Input 
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="bg-white/5 border-white/10 text-white h-12 rounded-xl [color-scheme:dark]"
                />
              </div>
            </div>

            <Button 
              onClick={handleDownload}
              className="w-full mt-10 h-14 rounded-xl bg-primary hover:bg-primary/90 text-white text-base shadow-lg shadow-primary/20"
            >
              <Download className="w-5 h-5 mr-2" /> Shkarko Formularin PDF
            </Button>
          </div>

          {/* Preview Side */}
          <div className="bg-white/5 rounded-3xl p-6 lg:p-8 flex items-center justify-center border border-white/10">
            {/* Fake A4 Paper */}
            <div className="bg-white w-full max-w-[450px] aspect-[1/1.4] rounded-sm shadow-2xl p-8 lg:p-10 flex flex-col relative overflow-hidden">
              {/* Header */}
              <div className="text-center border-b border-black/10 pb-4 mb-6">
                <h4 className="text-black font-serif font-bold text-lg leading-tight uppercase tracking-wide">
                  Republika e Kosovës <br/> Republic of Kosovo
                </h4>
                <p className="text-black/60 text-xs mt-2 uppercase">Formular Zyrtar Deklarimi</p>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-6">
                <div>
                  <p className="text-black/40 text-[10px] uppercase font-bold tracking-wider mb-1">Emri i Aplikantit</p>
                  <div className="border-b border-black/20 pb-1 text-black font-serif h-7">
                    {formData.name || <span className="text-black/20 italic">Shkruani emrin...</span>}
                  </div>
                </div>

                <div>
                  <p className="text-black/40 text-[10px] uppercase font-bold tracking-wider mb-1">Numri Personal</p>
                  <div className="border-b border-black/20 pb-1 text-black font-mono tracking-widest h-7">
                    {formData.idNumber || <span className="text-black/20 italic tracking-normal font-sans">Shkruani ID...</span>}
                  </div>
                </div>

                <div>
                  <p className="text-black/40 text-[10px] uppercase font-bold tracking-wider mb-1">Qëllimi i Dokumentit</p>
                  <div className="border-b border-black/20 pb-1 text-black font-serif h-7">
                    {formData.purpose ? formData.purpose.replace('_', ' ').toUpperCase() : <span className="text-black/20 italic">Zgjidhni qëllimin...</span>}
                  </div>
                </div>

                {/* Mock Legal Text */}
                <div className="pt-4">
                  <div className="h-2 bg-black/5 rounded w-full mb-3" />
                  <div className="h-2 bg-black/5 rounded w-[90%] mb-3" />
                  <div className="h-2 bg-black/5 rounded w-[95%] mb-3" />
                  <div className="h-2 bg-black/5 rounded w-[70%]" />
                </div>
              </div>

              {/* Footer / Signatures */}
              <div className="pt-8 border-t border-black/10 flex justify-between">
                <div>
                  <p className="text-black/40 text-[10px] uppercase font-bold mb-1">Data</p>
                  <p className="text-black text-sm font-mono">{formData.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-black/40 text-[10px] uppercase font-bold mb-1">Nënshkrimi</p>
                  <div className="w-32 h-px bg-black/20 mt-6" />
                </div>
              </div>
              
              {/* Overlay shadow for realism */}
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(0,0,0,0.05)]" />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}