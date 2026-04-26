import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTrendingFlights, useBusRoutes, useBestDates } from "@/hooks/useAgentData";
import {
  Plane,
  Bus,
  Calendar,
  Clock,
  ExternalLink,
  ArrowRight,
  TrendingDown,
  AlertCircle,
} from "lucide-react";

// ─── Helpers ──────────────────────────────────────────────────
function formatDuration(minutes?: number): string {
  if (!minutes) return "—";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h === 0 ? `${m}m` : `${h}h ${m}m`;
}

function formatDate(dateStr: string): { weekday: string; day: number; month: string; year: number } {
  const d = new Date(dateStr);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return {
    weekday: weekdays[d.getUTCDay()],
    day: d.getUTCDate(),
    month: months[d.getUTCMonth()],
    year: d.getUTCFullYear(),
  };
}

// ─── Skeleton row ─────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
      <Skeleton className="h-10 w-10 rounded-lg bg-white/5" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-48 bg-white/5" />
        <Skeleton className="h-3 w-32 bg-white/5" />
      </div>
      <Skeleton className="h-6 w-16 bg-white/5" />
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────
function EmptyState({ icon, message }: { icon: React.ReactNode; message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-white/30">
        {icon}
      </div>
      <p className="text-sm text-white/40">{message}</p>
    </div>
  );
}

// ─── Error state ─────────────────────────────────────────────
function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/5 border border-red-500/20 text-red-400 text-sm">
      <AlertCircle className="w-4 h-4 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
}

// ─── Flight Card ──────────────────────────────────────────────
function FlightCard({ flight, index }: { flight: ReturnType<typeof useTrendingFlights>["data"] extends (infer T)[] | undefined ? T : never; index: number }) {
  const isBest = index === 0;
  return (
    <div className={`group flex items-center gap-4 p-4 rounded-xl border transition-all hover:border-primary/30 hover:bg-white/[0.04] ${
      isBest ? "border-primary/30 bg-primary/5" : "border-white/5 bg-white/[0.02]"
    }`}>
      {/* Rank badge */}
      <div className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold ${
        isBest ? "bg-primary text-white shadow-lg shadow-primary/30" : "bg-white/5 text-white/50"
      }`}>
        {isBest ? "★" : `#${index + 1}`}
      </div>

      {/* Route */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 text-sm font-medium text-white">
          <Plane className="w-3.5 h-3.5 text-primary/70 flex-shrink-0" />
          <span className="truncate">
            {flight.origin} <ArrowRight className="inline w-3 h-3 mx-0.5 opacity-40" /> {flight.destination}
          </span>
        </div>
        <div className="flex items-center gap-3 mt-1 text-xs text-white/50">
          <span>{flight.airline || "—"}</span>
          {flight.duration && (
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDuration(flight.duration)}
            </span>
          )}
          {flight.layovers !== undefined && (
            <span>{flight.layovers === 0 ? "Direct" : `${flight.layovers} stop${flight.layovers > 1 ? "s" : ""}`}</span>
          )}
        </div>
      </div>

      {/* Price & link */}
      <div className="flex flex-col items-end gap-1 flex-shrink-0">
        <span className={`text-base font-bold ${isBest ? "text-primary" : "text-white"}`}>
          €{flight.price}
        </span>
        {flight.link && (
          <a href={flight.link} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] text-primary/70 hover:text-primary transition-colors">
            Book <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
}

// ─── Bus Card ─────────────────────────────────────────────────
function BusCard({ bus, index }: { bus: ReturnType<typeof useBusRoutes>["data"] extends (infer T)[] | undefined ? T : never; index: number }) {
  return (
    <div className="group flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] transition-all hover:border-primary/30 hover:bg-white/[0.04]">
      <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-xs font-bold text-white/50">
        #{index + 1}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 text-sm font-medium text-white">
          <Bus className="w-3.5 h-3.5 text-primary/70 flex-shrink-0" />
          <span className="truncate">
            {bus.origin} <ArrowRight className="inline w-3 h-3 mx-0.5 opacity-40" /> {bus.destination}
          </span>
        </div>
        <div className="flex items-center gap-3 mt-1 text-xs text-white/50">
          <span>{bus.operator || "—"}</span>
          {bus.duration && (
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDuration(bus.duration)}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col items-end gap-1 flex-shrink-0">
        <span className="text-base font-bold text-white">€{bus.price}</span>
        {bus.link && (
          <a href={bus.link} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] text-primary/70 hover:text-primary transition-colors">
            Book <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
}

// ─── Date Card ────────────────────────────────────────────────
function DateCard({ item, index }: { item: ReturnType<typeof useBestDates>["data"] extends (infer T)[] | undefined ? T : never; index: number }) {
  const { weekday, day, month, year } = formatDate(item.date);
  const isBest = index < 3;
  return (
    <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all hover:border-primary/30 hover:bg-white/[0.04] ${
      isBest ? "border-primary/20 bg-primary/[0.04]" : "border-white/5 bg-white/[0.02]"
    }`}>
      {/* Date block */}
      <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex flex-col items-center justify-center border ${
        isBest ? "border-primary/30 bg-primary/10" : "border-white/10 bg-white/5"
      }`}>
        <span className="text-[10px] uppercase tracking-widest text-white/50">{weekday}</span>
        <span className={`text-xl font-bold leading-none ${isBest ? "text-primary" : "text-white"}`}>{day}</span>
        <span className="text-[10px] text-white/50">{month} {year}</span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          {isBest && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-semibold">
              <TrendingDown className="w-3 h-3" /> Çmim i mirë
            </span>
          )}
        </div>
        <p className="text-xs text-white/50 mt-1">
          {item.routeCount} rrugë të disponueshme
        </p>
      </div>

      <div className="flex-shrink-0 text-right">
        <p className="text-base font-bold text-white">€{item.avgPrice}</p>
        <p className="text-[11px] text-white/40">mesatare</p>
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────
export default function AgentDashboard() {
  const { data: flights, isLoading: flightsLoading, error: flightsError } = useTrendingFlights();
  const { data: buses, isLoading: busesLoading, error: busesError } = useBusRoutes();
  const { data: dates, isLoading: datesLoading, error: datesError } = useBestDates();

  return (
    <div className="rounded-2xl border border-white/10 bg-card/60 backdrop-blur-sm overflow-hidden">
      <Tabs defaultValue="flights">
        {/* Tab Header */}
        <div className="border-b border-white/5 px-4 pt-4">
          <TabsList className="bg-white/5 border border-white/10 h-10 gap-1">
            <TabsTrigger
              value="flights"
              className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 text-white/60 hover:text-white transition-all"
            >
              <Plane className="w-3.5 h-3.5 mr-1.5" />
              Fluturime
              {flights && flights.length > 0 && (
                <span className="ml-2 px-1.5 py-0.5 rounded-full bg-white/10 text-[10px] font-semibold">
                  {flights.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="buses"
              className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 text-white/60 hover:text-white transition-all"
            >
              <Bus className="w-3.5 h-3.5 mr-1.5" />
              Autobusë
              {buses && buses.length > 0 && (
                <span className="ml-2 px-1.5 py-0.5 rounded-full bg-white/10 text-[10px] font-semibold">
                  {buses.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="dates"
              className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 text-white/60 hover:text-white transition-all"
            >
              <Calendar className="w-3.5 h-3.5 mr-1.5" />
              Datat më të mira
            </TabsTrigger>
          </TabsList>
        </div>

        {/* ── Flights ── */}
        <TabsContent value="flights" className="p-4 space-y-2 mt-0 max-h-[480px] overflow-y-auto">
          {flightsLoading && Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
          {flightsError && <ErrorState message={`Could not load flights: ${(flightsError as Error).message}`} />}
          {!flightsLoading && !flightsError && (!flights || flights.length === 0) && (
            <EmptyState
              icon={<Plane className="w-7 h-7" />}
              message="Waiting for AeroScout to collect flight data..."
            />
          )}
          {flights?.map((flight, i) => <FlightCard key={String(flight.id)} flight={flight} index={i} />)}
        </TabsContent>

        {/* ── Buses ── */}
        <TabsContent value="buses" className="p-4 space-y-2 mt-0 max-h-[480px] overflow-y-auto">
          {busesLoading && Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
          {busesError && <ErrorState message={`Could not load bus routes: ${(busesError as Error).message}`} />}
          {!busesLoading && !busesError && (!buses || buses.length === 0) && (
            <EmptyState
              icon={<Bus className="w-7 h-7" />}
              message="Waiting for TransitScout to collect bus route data..."
            />
          )}
          {buses?.map((bus, i) => <BusCard key={String(bus.id)} bus={bus} index={i} />)}
        </TabsContent>

        {/* ── Best Dates ── */}
        <TabsContent value="dates" className="p-4 space-y-2 mt-0 max-h-[480px] overflow-y-auto">
          {datesLoading && Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
          {datesError && <ErrorState message={`Could not load best dates: ${(datesError as Error).message}`} />}
          {!datesLoading && !datesError && (!dates || dates.length === 0) && (
            <EmptyState
              icon={<Calendar className="w-7 h-7" />}
              message="Waiting for RouteAnalyzer to process pricing data..."
            />
          )}
          {dates?.map((item, i) => <DateCard key={item.date} item={item} index={i} />)}
        </TabsContent>
      </Tabs>
    </div>
  );
}
