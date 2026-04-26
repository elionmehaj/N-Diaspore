import { useQuery } from "@tanstack/react-query";

const API_BASE = (import.meta.env.VITE_AGENTS_API_URL || "").replace(/\/$/, "");

// ─── Shared fetch helper ──────────────────────────────────────
async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  return res.json();
}

// ─── Types ────────────────────────────────────────────────────
export interface Flight {
  id: string;
  origin: string;
  destination: string;
  airline: string;
  airlineCode?: string;
  price: number;
  currency: string;
  duration?: number;
  layovers?: number;
  departureTime?: string;
  arrivalTime?: string;
  categoryTag?: string;
  link?: string;
}

export interface BusRoute {
  id: string;
  origin: string;
  destination: string;
  operator: string;
  price: number;
  currency: string;
  duration?: number;
  departureTime?: string;
  arrivalTime?: string;
  categoryTag?: string;
  link?: string;
}

export interface BestDate {
  date: string;
  avgPrice: number;
  routeCount: number;
  routes?: Array<{ origin: string; destination: string; type: string; price: number }>;
}

interface ApiResponse<T> {
  count: number;
  data: T[];
}

// ─── Hook: Trending Flights ───────────────────────────────────
export function useTrendingFlights() {
  return useQuery<Flight[]>({
    queryKey: ["agent", "flights", "trending"],
    queryFn: async () => {
      const res = await fetchJson<ApiResponse<Flight>>(`${API_BASE}/api/flights/trending`);
      return res.data ?? [];
    },
    staleTime: 5 * 60 * 1000,    // 5 minutes
    retry: 2,
    retryDelay: 2000,
  });
}

// ─── Hook: Bus Routes ─────────────────────────────────────────
export function useBusRoutes() {
  return useQuery<BusRoute[]>({
    queryKey: ["agent", "buses", "routes"],
    queryFn: async () => {
      const res = await fetchJson<ApiResponse<BusRoute>>(`${API_BASE}/api/buses/routes`);
      return res.data ?? [];
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
    retryDelay: 2000,
  });
}

// ─── Hook: Best Dates ─────────────────────────────────────────
export function useBestDates() {
  return useQuery<BestDate[]>({
    queryKey: ["agent", "dates", "best"],
    queryFn: async () => {
      const res = await fetchJson<ApiResponse<BestDate>>(`${API_BASE}/api/dates/best`);
      return res.data ?? [];
    },
    staleTime: 10 * 60 * 1000,
    retry: 2,
    retryDelay: 2000,
  });
}
