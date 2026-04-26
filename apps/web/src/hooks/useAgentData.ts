import { useQuery } from "@tanstack/react-query";
import {
  getBestDates as fetchBestDates,
  getBusRoutes as fetchBusRoutes,
  getTrendingFlights as fetchTrendingFlights,
  setBaseUrl,
} from "@workspace/api-client-react";
import type {
  BestDateSummary,
  BusRouteDeal,
  FlightDeal,
} from "@workspace/shared";

const API_BASE = (import.meta.env.VITE_AGENTS_API_URL || "").replace(/\/$/, "");
setBaseUrl(API_BASE || null);

// ─── Shared fetch helper ──────────────────────────────────────
// ─── Types ────────────────────────────────────────────────────
export type Flight = FlightDeal;
export type BusRoute = BusRouteDeal;
export type BestDate = BestDateSummary;

// ─── Hook: Trending Flights ───────────────────────────────────
export function useTrendingFlights() {
  return useQuery<Flight[]>({
    queryKey: ["agent", "flights", "trending"],
    queryFn: async () => {
      const res = await fetchTrendingFlights();
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
      const res = await fetchBusRoutes();
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
      const res = await fetchBestDates();
      return res.data ?? [];
    },
    staleTime: 10 * 60 * 1000,
    retry: 2,
    retryDelay: 2000,
  });
}
