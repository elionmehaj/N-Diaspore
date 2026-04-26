export interface ConciergeSiteRoute {
  path: string;
  label: string;
  reason: string;
  isLive: boolean;
}

export const SITE_ROUTE_BY_KEY = {
  transporti: { path: "/transporti", label: "Transport Search", isLive: true },
  agjenti: { path: "/agjenti", label: "AI Agent Dashboard", isLive: true },
  landLeasing: { path: "/land-leasing", label: "Land & Property", isLive: false },
  giftGateway: { path: "/services/gift-gateway", label: "Gift Gateway", isLive: false },
  formBuilder: { path: "/services/form-builder", label: "Form Builder", isLive: false },
  checklist: { path: "/services/checklist", label: "Return Checklist", isLive: false },
  construction: { path: "/ndertimi", label: "Construction Portal", isLive: false },
  healthcare: { path: "/shendeti", label: "Healthcare", isLive: false },
  investments: { path: "/investime", label: "Investment Offers", isLive: false },
  businesses: { path: "/bizneset", label: "Business Directory", isLive: false },
  genealogy: { path: "/gjurmet", label: "Family Genealogy", isLive: false },
  border: { path: "/kufiri", label: "Border Crossing Status", isLive: false },
  language: { path: "/gjuha-jone", label: "Albanian Language Hub", isLive: false },
  news: { path: "/news", label: "Diaspora News", isLive: false },
  services: { path: "/services", label: "All Services", isLive: false },
} as const satisfies Record<string, Omit<ConciergeSiteRoute, "reason">>;

export type SiteRouteKey = keyof typeof SITE_ROUTE_BY_KEY;
