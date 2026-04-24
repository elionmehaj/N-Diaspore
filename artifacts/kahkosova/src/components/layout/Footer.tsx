import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-card border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <img src="/logo.png" alt="KahKosova Logo" className="h-[4.5rem] w-auto object-contain" />
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Your digital bridge to Kosovo. We provide software tools to help the diaspora manage land, handle bureaucracy, and stay connected with family.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-primary hover:bg-white/10 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-primary hover:bg-white/10 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-primary hover:bg-white/10 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-primary hover:bg-white/10 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-6">{t.services}</h4>
            <ul className="space-y-3">
              <li><Link href="/land-leasing" className="text-white/60 hover:text-primary transition-colors text-sm">{t.land}</Link></li>
              <li><Link href="/services/gift-gateway" className="text-white/60 hover:text-primary transition-colors text-sm">Dhurata & Dërgesa</Link></li>
              <li><Link href="/services/form-builder" className="text-white/60 hover:text-primary transition-colors text-sm">Letrat / Administrata</Link></li>
              <li><Link href="/services/checklist" className="text-white/60 hover:text-primary transition-colors text-sm">Kthimi në Kosovë</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-6">{t.about}</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-white/60 hover:text-primary transition-colors text-sm">{t.about}</Link></li>
              <li><Link href="/news" className="text-white/60 hover:text-primary transition-colors text-sm">{t.news}</Link></li>
              <li><Link href="/contact" className="text-white/60 hover:text-primary transition-colors text-sm">{t.contact}</Link></li>
              <li><a href="#" className="text-white/60 hover:text-primary transition-colors text-sm">Karriera</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-6">{t.contact}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/60">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Bulevardi Bill Clinton,<br/>Prishtinë 10000, Kosovo</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+383 44 123 456</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>hello@kahkosova.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} KahKosova. All rights reserved.
          </p>
          <p className="text-xs text-white/40 text-center md:text-left">
            Ne ofrojmë mjete softuerike, jo përfaqësim ligjor.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/40">
            <a href="#" className="hover:text-white transition-colors">Politika e Privatësisë</a>
            <a href="#" className="hover:text-white transition-colors">Kushtet e Përdorimit</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
