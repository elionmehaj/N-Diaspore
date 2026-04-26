import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Plane, Bus, Users, Loader2, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  getTransportSearchQueryKey,
  useTransportSearch,
  type TransportSearchParams,
} from "@workspace/api-client-react";

export default function Transporti() {
  const { toast } = useToast();
  
  // Form State
  const [type, setType] = useState<"flight" | "bus">("flight");
  const [origin, setOrigin] = useState("prishtine");
  const [destination, setDestination] = useState("zvicer");
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [passengers, setPassengers] = useState("1");
  
  // Search Params State for query
  const [searchParams, setSearchParams] = useState<TransportSearchParams | null>(null);
  const activeSearchParams: TransportSearchParams = searchParams ?? {
    origin,
    destination,
    date,
    type,
    passengers: parseInt(passengers, 10),
  };

  // API Query
  const { data: tickets, isLoading, isError, error } = useTransportSearch(
    activeSearchParams,
    {
      query: {
        queryKey: getTransportSearchQueryKey(activeSearchParams),
        enabled: !!searchParams,
        retry: false,
      }
    }
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin || !destination || !date) {
      toast({
        title: "Kujdes",
        description: "Ju lutem plotësoni të gjitha fushat.",
        variant: "destructive"
      });
      return;
    }
    
    setSearchParams({
      origin,
      destination,
      date,
      type,
      passengers: parseInt(passengers, 10),
    });
  };

  const handleBook = (provider: string) => {
    toast({
      title: "Rezervimi i suksesshëm",
      description: `Duke u lidhur me ofruesin ${provider}...`,
    });
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString('sq-AL', { timeStyle: 'short' });
  };

  return (
    <MainLayout>
      <div className="pt-24 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Search Header Config */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Udhëtoni Drejt Kosovës</h1>
            <p className="text-white/60 text-lg">Gjeni biletat më të lira me aeroplan dhe autobus</p>
          </div>
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 w-fit">
            <button
              onClick={() => setType("flight")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
                type === "flight" ? "bg-primary text-white shadow-lg" : "text-white/60 hover:text-white"
              }`}
            >
              <Plane className="w-4 h-4" /> Fluturime
            </button>
            <button
              onClick={() => setType("bus")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
                type === "bus" ? "bg-primary text-white shadow-lg" : "text-white/60 hover:text-white"
              }`}
            >
              <Bus className="w-4 h-4" /> Autobus
            </button>
          </div>
        </div>

        {/* Search Form */}
        <div className="bg-card border border-white/5 rounded-3xl p-8 shadow-xl mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[100px] pointer-events-none" />
          
          <form onSubmit={handleSearch} className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            <div className="space-y-2 md:col-span-3">
              <Label className="text-white/80">Nisja</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <Input 
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="bg-white/5 border-white/10 text-white h-12 rounded-xl pl-9" 
                  placeholder="Nga"
                />
              </div>
            </div>
            
            <div className="space-y-2 md:col-span-3">
              <Label className="text-white/80">Destinacioni</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <Input 
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="bg-white/5 border-white/10 text-white h-12 rounded-xl pl-9" 
                  placeholder="Ku dëshironi të shkoni?"
                />
              </div>
            </div>

            <div className="space-y-2 md:col-span-3">
              <Label className="text-white/80">Data</Label>
              <div className="relative">
                <Input 
                  required 
                  type="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-white/5 border-white/10 text-white h-12 rounded-xl [color-scheme:dark] pl-4" 
                />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label className="text-white/80">Pasagjerë</Label>
              <Select value={passengers} onValueChange={setPassengers}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white h-12 rounded-xl">
                  <Users className="w-4 h-4 mr-2 text-white/40" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-white/10 text-white">
                  {[1,2,3,4,5,6].map(num => (
                    <SelectItem key={num} value={num.toString()}>{num} {num === 1 ? 'Pasagjer' : 'Pasagjerë'}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-1">
              <Button disabled={isLoading} type="submit" className="h-12 w-full bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/20">
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
              </Button>
            </div>
          </form>
        </div>

        {/* Results Info */}
        {searchParams && tickets && !isLoading && (
          <h2 className="text-xl font-medium text-white mb-6">
            U gjetën {tickets.length} rezultate nga <span className="font-bold text-primary">{searchParams.origin}</span> për në <span className="font-bold text-primary">{searchParams.destination}</span>
          </h2>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-center py-20 bg-card border border-white/5 rounded-3xl">
            <h3 className="text-xl font-bold text-white mb-2">Ndodhi një gabim</h3>
            <p className="text-white/60">Ju lutem provoni përsëri më vonë.</p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-white/60">Duke kërkuar biletat më të mira...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && tickets?.length === 0 && (
          <div className="text-center py-20 bg-card border border-white/5 rounded-3xl">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-white/40" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Nuk u gjetën bileta</h3>
            <p className="text-white/60">Provoni data ose destinacione të tjera.</p>
          </div>
        )}

        {/* Tickets Grid */}
        <div className="space-y-4">
          {!isLoading && tickets?.map((ticket: any) => (
            <div key={ticket.id} className="bg-card border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 hover:border-white/20 transition-all">
              
              {/* Provider Info */}
              <div className="flex-shrink-0 w-32 border-r border-white/5 flex flex-col items-center pr-6 hidden md:flex">
                <span className="text-white font-medium text-center">{ticket.provider}</span>
                <span className="text-xs text-white/40 mt-1 capitalize">{type}</span>
              </div>

              {/* Mobile Provider (only on small screens) */}
              <div className="md:hidden w-full flex justify-between items-center pb-4 border-b border-white/5">
                <span className="text-white font-medium">{ticket.provider}</span>
                <span className="text-xs text-white/40 bg-white/5 px-2 py-1 rounded-md capitalize">{type}</span>
              </div>

              {/* Time Location Config */}
              <div className="flex-1 flex items-center justify-between w-full">
                <div className="text-center md:text-left">
                  <div className="text-2xl font-bold text-white">{formatTime(ticket.departureTime)}</div>
                  <div className="text-sm text-white/60 mt-1 capitalize">{searchParams?.origin}</div>
                </div>

                <div className="flex flex-col items-center px-4 flex-1">
                  <div className="text-xs text-primary mb-1">{ticket.duration}</div>
                  <div className="w-full flex items-center relative">
                    <div className="w-2 h-2 rounded-full border-2 border-primary bg-background absolute left-0" />
                    <div className="h-[2px] bg-white/10 w-full border-t border-dashed border-white/30" />
                    <div className="w-2 h-2 rounded-full border-2 border-primary bg-primary absolute right-0" />
                    <div className="absolute left-1/2 -translate-x-1/2 -top-3">
                      {type === "flight" ? <Plane className="w-4 h-4 text-primary" /> : <Bus className="w-4 h-4 text-primary" />}
                    </div>
                  </div>
                  <div className="text-xs text-white/40 mt-1">{ticket.isDirect ? "Direkt" : "Me ndalesë"}</div>
                </div>

                <div className="text-center md:text-right">
                  <div className="text-2xl font-bold text-white">{formatTime(ticket.arrivalTime)}</div>
                  <div className="text-sm text-white/60 mt-1 capitalize">{searchParams?.destination}</div>
                </div>
              </div>

              {/* Pricing & Booking */}
              <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto md:border-l border-white/5 md:pl-6 pt-4 md:pt-0 border-t border-white/5 md:border-t-0 space-x-4 md:space-x-0">
                <div className="text-right mb-0 md:mb-3">
                  <div className="text-2xl font-display font-bold text-white">€{ticket.price}</div>
                  <div className="text-xs text-white/40">për pasagjer</div>
                </div>
                <Button onClick={() => handleBook(ticket.provider)} className="bg-primary hover:bg-primary/90 text-white rounded-xl px-6">
                  Zgjedh <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

            </div>
          ))}
        </div>

        {/* AI Assistant Banner */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-primary/20 bg-primary/5 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Search className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Keni nevojë për ndihmë?</p>
              <p className="text-xs text-white/50">Agjenti ynë AI gjen rrugët dhe çmimet më të mira për ju.</p>
            </div>
          </div>
          <a
            href="/agjenti"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            Pyetni AI Agjentin <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </MainLayout>
  );
}
