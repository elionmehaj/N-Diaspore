import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { MapPin, Gift, FileText, ArrowRight, Clock } from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  const { user } = useAuth();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (!user) {
      setLocation("/sign-in");
    }
  }, [user, setLocation]);

  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="mb-10">
        <h1 className="text-3xl font-display font-bold text-white">Mirë se vini, {user.name}!</h1>
        <p className="text-white/60 mt-2">Këtu është ajo që po ndodh me shërbimet tuaja në KahKosova.</p>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Link href="/land-leasing">
          <div className="bg-card border border-white/5 rounded-2xl p-6 hover:bg-white/[0.02] hover:border-primary/30 transition-all cursor-pointer group">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-white mb-2">Toka Ime</h3>
            <p className="text-sm text-white/50 mb-4">Shikoni ose listoni pronat tuaja në Kosovë.</p>
            <span className="text-primary text-sm font-medium flex items-center">
              Shiko Tokat <ArrowRight className="w-4 h-4 ml-1" />
            </span>
          </div>
        </Link>
        
        <Link href="/services/gift-gateway">
          <div className="bg-card border border-white/5 rounded-2xl p-6 hover:bg-white/[0.02] hover:border-purple-400/30 transition-all cursor-pointer group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Gift className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Dërgo një Dhuratë</h3>
            <p className="text-sm text-white/50 mb-4">Dërgoni ushqime ose dhurata te familja.</p>
            <span className="text-purple-400 text-sm font-medium flex items-center">
              Shfleto Dhuratat <ArrowRight className="w-4 h-4 ml-1" />
            </span>
          </div>
        </Link>

        <Link href="/services/form-builder">
          <div className="bg-card border border-white/5 rounded-2xl p-6 hover:bg-white/[0.02] hover:border-emerald-400/30 transition-all cursor-pointer group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Dokumente</h3>
            <p className="text-sm text-white/50 mb-4">Gjeneroni formularë dygjuhësh menjëherë.</p>
            <span className="text-emerald-400 text-sm font-medium flex items-center">
              Krijo Formular <ArrowRight className="w-4 h-4 ml-1" />
            </span>
          </div>
        </Link>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-bold text-white mb-6">Aktiviteti i Fundit</h2>
        <div className="bg-card border border-white/5 rounded-2xl p-6">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                <Clock className="w-5 h-5 text-white/40" />
              </div>
              <div>
                <p className="text-white font-medium">Llogaria u krijua</p>
                <p className="text-sm text-white/50 mt-1">Sapo u bashkuat me KahKosova. Mirë se vini!</p>
                <p className="text-xs text-white/30 mt-2">Tani</p>
              </div>
            </div>
            <div className="flex items-start gap-4 opacity-50 grayscale">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
                <Gift className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-white font-medium">Dërgoni Shportë Ushqimesh për Familje</p>
                <p className="text-sm text-white/50 mt-1">Për: Prishtinë, Kosovë</p>
                <p className="text-xs text-white/30 mt-2">Nuk ka histori (Demo)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
