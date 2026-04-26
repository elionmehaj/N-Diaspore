import { MainLayout } from "@/components/layout/MainLayout";
import { Link } from "wouter";
import { MapPin, Gift, FileText, ClipboardCheck, ArrowRight, Heart, Hammer, TrendingUp, Car } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Toka",
      description: "Jepni me qira pronat tuaja në vendlindje në mënyrë të sigurt. Shfletoni tokën e disponueshme ose listoni tuajën për bujqësi ose biznes.",
      icon: MapPin,
      color: "text-primary",
      bg: "bg-primary/10",
      href: "/land-leasing"
    },
    {
      title: "Dhurata & Dërgesa",
      description: "Mbështesni familjen tuaj në Kosovë duke dërguar mallra thelbësore, ushqime dhe dhurata përmes rrjetit tonë të besuar të shitësve.",
      icon: Gift,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      href: "/services/gift-gateway"
    },
    {
      title: "Letrat / Administrata",
      description: "Gjeneroni lehtësisht formularë ligjorë dhe administrativë dygjuhësh të nevojshëm për komunat e Kosovës.",
      icon: FileText,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      href: "/services/form-builder"
    },
    {
      title: "Kthimi në Kosovë",
      description: "Një udhëzues gjithëpërfshirës, hap pas hapi për anëtarët e diasporës që planifikojnë të kthehen në Kosovë.",
      icon: ClipboardCheck,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
      href: "/services/checklist"
    },
    {
      title: "Shëndeti",
      description: "Rezervoni kontrollime mjekësore ose boni farmaci për të afërmit tuaj në Kosovë.",
      icon: Heart,
      color: "text-red-400",
      bg: "bg-red-500/10",
      href: "/shendeti"
    },
    {
      title: "Ndërtimi",
      description: "Gjeni kontraktorë të besueshëm për ndërtime dhe renovime të shtëpisë tuaj në Kosovë.",
      icon: Hammer,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      href: "/ndertimi"
    },
    {
      title: "Investime",
      description: "Mbështesni bizneset lokale dhe investoni në projekte me potencial në Kosovë.",
      icon: TrendingUp,
      color: "text-green-400",
      bg: "bg-green-500/10",
      href: "/investime"
    },
    {
      title: "Transporti",
      description: "Rezervoni vetura me qira paraprakisht për udhëtimin tuaj në vendlindje.",
      icon: Car,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      href: "/transporti"
    }
  ];

  return (
    <MainLayout>
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Shërbimet Tona</h1>
          <p className="text-lg text-white/60">
            Mjete të dedikuara për të mbushur hendekun midis diasporës dhe Kosovës. Gjithçka që ju nevojitet në një platformë të sigurt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((s, idx) => (
            <Link key={idx} href={s.href}>
              <div className="bg-card border border-white/5 rounded-3xl p-8 hover:bg-white/[0.02] hover:border-white/20 transition-all duration-300 group cursor-pointer h-full flex flex-col shadow-lg">
                <div className={`w-16 h-16 rounded-2xl ${s.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <s.icon className={`w-8 h-8 ${s.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{s.title}</h3>
                <p className="text-white/60 mb-8 flex-1 leading-relaxed">{s.description}</p>
                <div className={`flex items-center font-medium ${s.color} mt-auto`}>
                  Hap Shërbimin <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
