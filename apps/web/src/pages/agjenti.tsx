import { MainLayout } from "@/components/layout/MainLayout";
import AiConcierge from "@/components/chat/AiConcierge";
import AgentDashboard from "@/components/chat/AgentDashboard";
import { useTrendingFlights, useBusRoutes } from "@/hooks/useAgentData";
import {
  Sparkles,
  Plane,
  Bus,
  MapPin,
  Bot,
  Zap,
} from "lucide-react";

// ─── Stats block ──────────────────────────────────────────────
interface StatBlockProps {
  value: string | number;
  label: string;
  icon: React.ReactNode;
  loading?: boolean;
}

function StatBlock({ value, label, icon, loading }: StatBlockProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:border-primary/20 hover:bg-primary/[0.03] transition-all group">
      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
        {icon}
      </div>
      <div className="text-3xl font-bold text-white tabular-nums">
        {loading ? (
          <span className="inline-block w-8 h-7 rounded bg-white/10 animate-pulse" />
        ) : (
          value
        )}
      </div>
      <div className="text-xs text-white/50 text-center font-medium leading-tight">{label}</div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────
export default function Agjenti() {
  const { data: flights, isLoading: flightsLoading } = useTrendingFlights();
  const { data: buses, isLoading: busesLoading } = useBusRoutes();

  return (
    <MainLayout>
      {/* ── Brand background accent ── */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-primary/3 blur-[100px] rounded-full" />
      </div>

      <div className="pt-24 pb-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* ═══ HERO SECTION ═══ */}
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>I Fuqizuar nga Groq AI · 4 Agjentë Aktivë</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-5 leading-tight tracking-tight">
            Udhëtoni Më Smart
            <br />
            <span className="bg-gradient-to-r from-[#e63946] via-[#e63946]/80 to-[#e63946]/50 bg-clip-text text-transparent">
              me Agjentin AI
            </span>
          </h1>

          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Platforma jonë autonome me 4 agjentë AI punon 24/7 për të gjetur fluturimet dhe 
            linjat e autobusëve më të lira për diasporën shqiptare — nga Ballkani drejt Evropës.
          </p>
        </div>

        {/* ═══ STATS GRID ═══ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatBlock
            icon={<Plane className="w-5 h-5" />}
            value={flightsLoading ? "…" : (flights?.length ?? 0)}
            label="Rrugë Fluturimi"
            loading={flightsLoading}
          />
          <StatBlock
            icon={<Bus className="w-5 h-5" />}
            value={busesLoading ? "…" : (buses?.length ?? 0)}
            label="Rrugë Autobusi"
            loading={busesLoading}
          />
          <StatBlock
            icon={<MapPin className="w-5 h-5" />}
            value={3}
            label="Aeroporte të Skanuara"
          />
          <StatBlock
            icon={<Bot className="w-5 h-5" />}
            value={4}
            label="Agjentë AI Aktivë"
          />
        </div>

        {/* ═══ CHAT SECTION ═══ */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-white">Chat me AI Agjentin</h2>
            </div>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <p className="text-sm text-white/50 mb-5">
            Pyetni çdo gjë — rrugët, çmimet, datat e udhëtimit. Agjenti i kupton pyetjet 
            në shqip, gjermanisht dhe anglisht.
          </p>
          {/* Fixed-height chat panel */}
          <div className="h-[600px]">
            <AiConcierge />
          </div>
        </div>

        {/* ═══ DASHBOARD SECTION ═══ */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2">
              <Plane className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-white">Paneli i Agjentëve</h2>
            </div>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <p className="text-sm text-white/50 mb-5">
            Të dhëna në kohë reale nga AeroScout, TransitScout dhe RouteAnalyzer — 
            fluturimet dhe autobusët me çmimet më të ulëta nga Kosova.
          </p>
          <AgentDashboard />
        </div>

      </div>
    </MainLayout>
  );
}
