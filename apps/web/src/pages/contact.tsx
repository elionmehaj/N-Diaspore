import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Mesazhi u Dërgua",
        description: "Kemi marrë mesazhin tuaj dhe do t'ju kontaktojmë së shpejti.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Info & Form */}
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Na Kontaktoni</h1>
            <p className="text-lg text-white/60 mb-10">
              Keni pyetje për shërbimet tona apo ju duhet ndihmë me një dokument? Ekipi ynë në Prishtinë dhe SHBA është këtu për t'ju ndihmuar.
            </p>

            <div className="flex flex-col gap-6 mb-12 bg-card border border-white/5 p-6 rounded-2xl shadow-lg">
              <div className="flex items-center gap-4 text-white/80">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <span>support@kahkosova.com</span>
              </div>
              <div className="flex items-center gap-4 text-white/80">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <span>+383 44 123 456 (Kosovë) <br/> +1 (555) 123-4567 (SHBA)</span>
              </div>
              <div className="flex items-center gap-4 text-white/80">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <span>Bulevardi Bill Clinton, Prishtinë 10000</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label className="text-white/80">Emri</Label>
                  <Input required className="bg-white/5 border-white/10 text-white h-12 rounded-xl" placeholder="Emri juaj" />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/80">Emaili</Label>
                  <Input required type="email" className="bg-white/5 border-white/10 text-white h-12 rounded-xl" placeholder="ju@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-white/80">Subjekti</Label>
                <Input required className="bg-white/5 border-white/10 text-white h-12 rounded-xl" placeholder="Si mund t'ju ndihmojmë?" />
              </div>
              <div className="space-y-2">
                <Label className="text-white/80">Mesazhi</Label>
                <Textarea required className="bg-white/5 border-white/10 text-white rounded-xl min-h-[120px]" placeholder="Shkruani mesazhin tuaj këtu..." />
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white text-base shadow-lg shadow-primary/20">
                {isSubmitting ? "Duke dërguar..." : <><Send className="w-4 h-4 mr-2" /> Dërgo Mesazhin</>}
              </Button>
            </form>
          </div>

          {/* FAQ Section */}
          <div className="lg:pl-8">
            <h2 className="text-3xl font-display font-bold text-white mb-8">Pyetjet e Bëra më Shpesh</h2>
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="bg-card border border-white/5 rounded-2xl px-6 data-[state=open]:border-primary/30 transition-colors">
                <AccordionTrigger className="text-white font-medium hover:no-underline py-5 text-left">
                  A janë formularët dygjuhësh ligjërisht të detyrueshëm?
                </AccordionTrigger>
                <AccordionContent className="text-white/60 pb-5">
                  Formularët tanë gjenerohen sipas shablloneve të fundit të kërkuara nga komunat e Kosovës. Megjithatë, varësisht nga lloji i dokumentit, mund t'ju duhet akoma t'i noterizoni ose t'i pajisni me vulë apostile në vendin tuaj të banimit përpara se të pranohen zyrtarisht në Kosovë.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-card border border-white/5 rounded-2xl px-6 data-[state=open]:border-primary/30 transition-colors">
                <AccordionTrigger className="text-white font-medium hover:no-underline py-5 text-left">
                  Si funksionon dorëzimi i Dhuratave?
                </AccordionTrigger>
                <AccordionContent className="text-white/60 pb-5">
                  Ne bashkëpunojmë direkt me rrjete të njohura supermarketesh dhe shitës lokalë në Kosovë. Pasi të bëni një porosi, shitësi përgatit paketën dhe koordinohet drejtpërdrejt me marrësin përmes numrit të telefonit që keni ofruar për marrje ose dërgesë.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-card border border-white/5 rounded-2xl px-6 data-[state=open]:border-primary/30 transition-colors">
                <AccordionTrigger className="text-white font-medium hover:no-underline py-5 text-left">
                  A është e sigurt të listoj tokën time për qira këtu?
                </AccordionTrigger>
                <AccordionContent className="text-white/60 pb-5">
                  Po. Ne verifikojmë identitetin e të gjithë përdoruesve në platformë. Marrëveshjet e qirasë bëhen drejtpërdrejt, por ne ofrojmë infrastrukturën digjitale për t'ju ndihmuar të lidheni sigurt dhe të hartoni marrëveshjet fillestare.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-card border border-white/5 rounded-2xl px-6 data-[state=open]:border-primary/30 transition-colors">
                <AccordionTrigger className="text-white font-medium hover:no-underline py-5 text-left">
                  Cilat valuta i pranoni?
                </AccordionTrigger>
                <AccordionContent className="text-white/60 pb-5">
                  Ju mund të paguani duke përdorur EUR, USD, CHF, ose GBP. Procesuesi ynë i pagesave konverton automatikisht fondet bazuar në kursin ditor të këmbimit, duke siguruar që shitësi lokal të marrë shumën e saktë në Euro.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}