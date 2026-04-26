import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Store, ShoppingCart, Gift } from "lucide-react";

export default function GiftGateway() {
  const { toast } = useToast();

  const gifts = [
    {
      id: 1,
      title: "Gjëra Ushqimore Thelbësore",
      vendor: "Viva Fresh Store",
      price: "€25.00",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
      desc: "Ushqime thelbësore përfshirë miell, vaj, sheqer dhe makarona."
    },
    {
      id: 2,
      title: "Shporta Ushqimore për Familje",
      vendor: "Meridian Express",
      price: "€45.00",
      image: "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=800&q=80",
      desc: "Një shportë e plotë mujore për një familje prej katër anëtarësh."
    },
    {
      id: 3,
      title: "Tortë Festimi",
      vendor: "Embëltorja Local",
      price: "€15.00",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
      desc: "Tortë e freskët për ditëlindje ose përvjetorë."
    },
    {
      id: 4,
      title: "Lule të Freskëta",
      vendor: "Lule Prishtina",
      price: "€20.00",
      image: "https://images.unsplash.com/photo-1563241527-3004b7be023b?w=800&q=80",
      desc: "Një buqetë e bukur sezonale e dorëzuar drejtpërdrejt në derën e tyre."
    }
  ];

  const handleSend = (title: string) => {
    toast({
      title: "U shtua në Shportë",
      description: `${title} është gati për t'u dërguar në Kosovë.`,
    });
  };

  return (
    <MainLayout>
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm mb-6">
              <Gift className="w-4 h-4" /> Familja
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Dhurata & Dërgesa</h1>
            <p className="text-lg text-white/60">
              Mbështesni familjen tuaj drejtpërdrejt. Blini mallra nga shitësit e besuar vendorë në Kosovë dhe dërgojini ato në adresë ose përgatitini për marrje.
            </p>
          </div>
          <Button size="lg" className="bg-white/10 hover:bg-white/20 text-white rounded-xl backdrop-blur-sm border border-white/10 shadow-lg">
            <ShoppingCart className="w-5 h-5 mr-2" /> Shporta
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {gifts.map((gift) => (
            <div key={gift.id} className="bg-card border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 group flex flex-col">
              <div className="h-48 overflow-hidden relative">
                {/* gift/grocery product unspash image */}
                <img 
                  src={gift.image} 
                  alt={gift.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-background/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-medium text-white flex items-center border border-white/10">
                  <Store className="w-3 h-3 mr-1.5 text-primary" />
                  {gift.vendor}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-white text-lg">{gift.title}</h3>
                  <span className="font-display font-bold text-primary">{gift.price}</span>
                </div>
                <p className="text-sm text-white/50 mb-6 flex-1">{gift.desc}</p>
                <Button 
                  onClick={() => handleSend(gift.title)}
                  className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/20"
                >
                  Dërgo në Kosovë
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}