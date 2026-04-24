import { useState, useEffect, useRef, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Send,
  Bot,
  User,
  Plane,
  Bus,
  Clock,
  Wifi,
  WifiOff,
  Sparkles,
  ExternalLink,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────
interface TripCard {
  type?: "flight" | "bus";
  origin?: string;
  originCity?: string;
  destination?: string;
  destinationCity?: string;
  operator?: string;
  airline?: string;
  price: number;
  duration?: number;
  layovers?: number;
  departureTime?: string;
  link?: string;
  categoryTag?: string;
}

interface SiteRoute {
  path: string;
  label: string;
  reason: string;
  isLive: boolean;
}

interface ChatMessage {
  id: string;
  role: "user" | "bot";
  text: string;
  cards?: TripCard[];
  siteRoutes?: SiteRoute[];
  bestDates?: Array<{ date: string; avgPrice: number; routeCount: number }>;
  timestamp: Date;
}

interface ChatResponse {
  message: string;
  intent?: string;
  cards?: TripCard[];
  siteRoutes?: SiteRoute[];
  bestDates?: Array<{ date: string; avgPrice: number; routeCount: number }>;
}

// ─── Markdown-lite renderer ──────────────────────────────────
function formatMarkdown(text: string): string {
  if (!text) return "";
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br/>")
    .replace(/•/g, "&bull;");
}

// ─── Duration formatter ──────────────────────────────────────
function formatDuration(minutes?: number): string {
  if (!minutes) return "N/A";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
}

// ─── Generate session ID ─────────────────────────────────────
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

// ─── Quick action suggestions ────────────────────────────────
const QUICK_ACTIONS = [
  { label: "✈️ Cheapest Flights", message: "What are the cheapest flights from Prishtina?" },
  { label: "🚌 Bus to Munich", message: "How can I get to Munich by bus from Prishtina?" },
  { label: "📅 Best Travel Dates", message: "When are the best dates to travel from Kosovo?" },
  { label: "🤝 How can I help my family?", message: "How can I help my family back home in Kosovo?" },
];

// ─── Site Route Deep-Link Card ───────────────────────────────
function SiteRouteCard({ route }: { route: SiteRoute }) {
  return (
    <a
      href={route.path}
      className="group flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 transition-all hover:border-primary/40 hover:bg-white/[0.06] no-underline"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold text-white group-hover:text-primary transition-colors">
            {route.label}
          </span>
          <span
            className={cn(
              "text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide",
              route.isLive
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "bg-white/10 text-white/40 border border-white/10"
            )}
          >
            {route.isLive ? "Live" : "Ready"}
          </span>
        </div>
        <p className="text-xs text-white/50 mt-0.5 leading-snug">{route.reason}</p>
      </div>
      <ExternalLink className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-white/30 group-hover:text-primary transition-colors" />
    </a>
  );
}

// ─── Trip Card Sub-component ─────────────────────────────────
function TripCardItem({ trip }: { trip: TripCard }) {
  const icon = trip.type === "flight" ? <Plane className="w-4 h-4" /> : <Bus className="w-4 h-4" />;
  const operatorName = trip.operator || trip.airline || "Unknown";
  const origin = trip.origin || trip.originCity || "—";
  const dest = trip.destination || trip.destinationCity || "—";

  return (
    <div className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 transition-all hover:border-primary/40 hover:bg-white/[0.06]">
      {/* Left: Route Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 text-sm font-medium text-white">
          {icon}
          <span className="truncate">
            {origin} <ArrowRight className="inline w-3 h-3 mx-0.5 text-white/40" /> {dest}
          </span>
        </div>
        <div className="mt-1 flex items-center gap-3 text-xs text-white/50">
          <span>{operatorName}</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatDuration(trip.duration)}
          </span>
          {trip.layovers !== undefined && (
            <span>{trip.layovers === 0 ? "Direct" : `${trip.layovers} stop${trip.layovers > 1 ? "s" : ""}`}</span>
          )}
        </div>
      </div>

      {/* Right: Price & Book */}
      <div className="flex flex-col items-end gap-1 flex-shrink-0">
        <span className="text-base font-bold text-primary">€{trip.price}</span>
        {trip.link && (
          <a
            href={trip.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] text-primary/80 hover:text-primary transition-colors"
          >
            Book <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
}

// ─── Typing Indicator ────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/20 flex items-center justify-center">
        <Bot className="w-4 h-4 text-primary" />
      </div>
      <div className="rounded-2xl rounded-tl-md bg-white/[0.05] border border-white/10 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:0ms]" />
          <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:150ms]" />
          <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────
export default function AiConcierge() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [socketError, setSocketError] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sessionIdRef = useRef<string>(generateSessionId());

  // ── Auto-scroll on new messages ──
  useEffect(() => {
    if (scrollRef.current) {
      requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth",
        });
      });
    }
  }, [messages, isTyping]);

  // ── Socket.io lifecycle ──
  useEffect(() => {
    const agentsUrl = import.meta.env.VITE_AGENTS_API_URL || "http://localhost:4000";

    const socket = io(agentsUrl, {
      transports: ["websocket", "polling"],
      reconnectionAttempts: 10,
      reconnectionDelay: 2000,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setSocketConnected(true);
      setSocketError(null);
      console.log("[AiConcierge] Connected:", socket.id);
    });

    socket.on("disconnect", () => {
      setSocketConnected(false);
      console.log("[AiConcierge] Disconnected");
    });

    socket.on("connect_error", (err) => {
      setSocketConnected(false);
      setSocketError(`Backend Disconnected — Is the Agents server running on port 4000? (${err.message})`);
      console.error("[AiConcierge] Socket connection error:", err);
    });

    socket.on("typing", (data: { isTyping: boolean }) => {
      setIsTyping(data.isTyping);
    });

    socket.on("chat-response", (response: ChatResponse) => {
      setIsTyping(false);
      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        role: "bot",
        text: response.message,
        cards: response.cards,
        siteRoutes: response.siteRoutes,
        bestDates: response.bestDates,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // ── Send a message ──
  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      // Append user message to local state
      const userMsg: ChatMessage = {
        id: `user_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        role: "user",
        text: trimmed,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");

      // Emit to socket
      if (socketRef.current?.connected) {
        socketRef.current.emit("chat-message", {
          message: trimmed,
          sessionId: sessionIdRef.current,
        });
      }
    },
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
    inputRef.current?.focus();
  };

  const handleQuickAction = (msg: string) => {
    sendMessage(msg);
  };

  // ── Render ──
  const isEmpty = messages.length === 0;

  return (
    <Card
      id="ai-concierge-card"
      className="flex flex-col h-[600px] bg-gradient-to-b from-card to-card/80 border-white/10 shadow-2xl overflow-hidden"
    >
      {/* Header */}
      <CardHeader className="flex-shrink-0 border-b border-white/5 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div
                className={cn(
                  "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card transition-colors",
                  socketConnected ? "bg-emerald-500" : socketError ? "bg-red-500" : "bg-zinc-500"
                )}
              />
            </div>
            <div>
              <CardTitle className="text-base text-white">KahKosova AI</CardTitle>
              <p className={cn("text-xs mt-0.5", socketError ? "text-red-400" : "text-white/50")}>
                {socketConnected
                  ? "Online — ready to help"
                  : socketError
                  ? "Backend Disconnected"
                  : "Connecting..."}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-white/40">
            {socketConnected ? (
              <Wifi className="w-3.5 h-3.5 text-emerald-500" />
            ) : socketError ? (
              <WifiOff className="w-3.5 h-3.5 text-red-400" />
            ) : (
              <WifiOff className="w-3.5 h-3.5 text-zinc-500" />
            )}
          </div>
        </div>
        {/* Error banner */}
        {socketError && (
          <div className="mt-3 flex items-start gap-2 rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2">
            <span className="text-red-400 text-[11px] leading-snug">{socketError}</span>
          </div>
        )}
      </CardHeader>

      {/* Messages Area */}
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full">
          <div ref={scrollRef} className="p-4 space-y-4 min-h-full flex flex-col">
            {/* Welcome State */}
            {isEmpty && (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-8 animate-in fade-in duration-500">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center mb-4">
                  <Bot className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">Ask our AI Travel Assistant</h3>
                <p className="text-sm text-white/50 max-w-[280px] mb-6">
                  I can help you find flights, bus routes, and the best travel dates from the Balkans.
                </p>
                <div className="grid grid-cols-2 gap-2 w-full max-w-sm">
                  {QUICK_ACTIONS.map((action) => (
                    <button
                      key={action.label}
                      onClick={() => handleQuickAction(action.message)}
                      className="text-left text-xs p-3 rounded-xl border border-white/10 bg-white/[0.03] text-white/70 hover:border-primary/30 hover:bg-white/[0.06] hover:text-white transition-all duration-200"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat messages */}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300",
                  msg.role === "user" && "flex-row-reverse"
                )}
              >
                {/* Avatar */}
                <div
                  className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border",
                    msg.role === "bot"
                      ? "bg-gradient-to-br from-primary/30 to-primary/10 border-primary/20"
                      : "bg-gradient-to-br from-white/15 to-white/5 border-white/20"
                  )}
                >
                  {msg.role === "bot" ? (
                    <Bot className="w-4 h-4 text-primary" />
                  ) : (
                    <User className="w-4 h-4 text-white/70" />
                  )}
                </div>

                {/* Bubble */}
                <div className={cn("max-w-[80%] space-y-2", msg.role === "user" && "items-end")}>
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                      msg.role === "bot"
                        ? "rounded-tl-md bg-white/[0.05] border border-white/10 text-white/90"
                        : "rounded-tr-md bg-primary text-white ml-auto"
                    )}
                    dangerouslySetInnerHTML={{ __html: formatMarkdown(msg.text) }}
                  />

                  {/* Trip Cards */}
                  {msg.cards && msg.cards.length > 0 && (
                    <div className="space-y-2 mt-2">
                      {msg.cards.map((card, idx) => (
                        <TripCardItem key={`${msg.id}_card_${idx}`} trip={card} />
                      ))}
                    </div>
                  )}

                  {/* Site Route Deep-Links */}
                  {msg.siteRoutes && msg.siteRoutes.length > 0 && (
                    <div className="space-y-1.5 mt-2">
                      <p className="text-[11px] text-white/30 font-medium uppercase tracking-wider px-1">Platform Features</p>
                      {msg.siteRoutes.map((route) => (
                        <SiteRouteCard key={route.path} route={route} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && <TypingIndicator />}
          </div>
        </ScrollArea>
      </CardContent>

      {/* Input Area */}
      <div className="flex-shrink-0 border-t border-white/5 p-4 bg-card/50 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={socketConnected ? "Ask me anything about travel..." : "Connecting to server..."}
            disabled={!socketConnected}
            className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/30 h-11 rounded-xl focus-visible:ring-primary/50"
          />
          <Button
            type="submit"
            disabled={!socketConnected || !input.trim() || isTyping}
            size="icon"
            className="h-11 w-11 rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all disabled:opacity-30"
          >
            {isTyping ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </form>
      </div>
    </Card>
  );
}
