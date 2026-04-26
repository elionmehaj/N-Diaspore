import type { ConciergeSiteRoute } from "./routes.js";

export type TripType = "flight" | "bus";

export interface TripDocument {
  _id?: unknown;
  type: TripType;
  origin?: string;
  originCity?: string;
  destination?: string;
  destinationCity?: string;
  airline_or_operator?: string;
  airline_code?: string;
  operator_logo?: string;
  price: number;
  currency?: string;
  duration?: number;
  layovers?: number;
  departure_time?: Date | string;
  arrival_time?: Date | string;
  category_tag?: string;
  link?: string;
  best_dates?: Array<Date | string>;
}

export interface FlightDeal {
  id: string;
  origin: string;
  destination: string;
  airline: string;
  airlineCode?: string;
  operatorLogo?: string;
  price: number;
  currency: string;
  duration?: number;
  layovers?: number;
  departureTime?: string | Date;
  arrivalTime?: string | Date;
  categoryTag?: string;
  link?: string;
}

export interface BusRouteDeal {
  id: string;
  origin: string;
  destination: string;
  operator: string;
  operatorLogo?: string;
  price: number;
  currency: string;
  duration?: number;
  departureTime?: string | Date;
  arrivalTime?: string | Date;
  categoryTag?: string;
  link?: string;
}

export interface BestDateSummary {
  date: string;
  avgPrice: number;
  routeCount: number;
  routes?: Array<{
    origin: string;
    destination: string;
    type: TripType | string;
    price: number;
  }>;
}

export interface ApiListResponse<T> {
  count: number;
  data: T[];
}

export interface ConciergeTripCard {
  id?: string;
  type?: TripType;
  origin?: string;
  originCity?: string;
  destination?: string;
  destinationCity?: string;
  operator?: string;
  airline?: string;
  price: number;
  currency?: string;
  duration?: number;
  layovers?: number;
  departureTime?: string | Date;
  arrivalTime?: string | Date;
  link?: string;
  categoryTag?: string;
}

export interface ChatResponsePayload {
  sessionId?: string;
  message: string;
  intent?: string;
  cards?: ConciergeTripCard[];
  siteRoutes?: ConciergeSiteRoute[];
  bestDates?: BestDateSummary[] | string[];
  timestamp?: Date | string;
}
