import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, MapPin, Gift, FileText, Settings, LogOut, Home, Menu, Heart, Hammer, TrendingUp, Car } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function DashboardLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // If not logged in, just a fallback since routing should handle it
  if (!user) return null;

  const navItems = [
    { icon: LayoutDashboard, label: "Pulti", href: "/dashboard" },
    { icon: MapPin, label: "Toka", href: "/land-leasing" },
    { icon: Gift, label: "Dhurata & Dërgesa", href: "/services/gift-gateway" },
    { icon: FileText, label: "Letrat", href: "/services/form-builder" },
    { icon: Heart, label: "Shëndeti", href: "/shendeti" },
    { icon: Hammer, label: "Ndërtimi", href: "/ndertimi" },
    { icon: TrendingUp, label: "Investime", href: "/investime" },
    { icon: Car, label: "Transporti", href: "/transporti" },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-card border-r border-white/5">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/25">
            <span className="font-display font-bold text-white text-sm">K</span>
          </div>
          <span className="font-display font-bold text-lg text-white">KahKosova</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => {
          const active = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
                active ? "bg-primary/10 text-primary border border-primary/20" : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
              }`}>
                <item.icon className={`w-5 h-5 ${active ? "text-primary" : ""}`} />
                <span className="font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5 mt-auto">
        <div className="flex items-center gap-3 px-4 py-3 mb-4 rounded-xl bg-background border border-white/5">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
            {user.name.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-white truncate">{user.name}</p>
            <p className="text-xs text-white/50 truncate">{user.email}</p>
          </div>
        </div>
        <Link href="/">
          <Button variant="ghost" className="w-full justify-start text-white/60 hover:text-white hover:bg-white/5 mb-2">
            <Home className="w-4 h-4 mr-3" /> Kthehu në Ballinë
          </Button>
        </Link>
        <Button variant="ghost" onClick={logout} className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-400/10">
          <LogOut className="w-4 h-4 mr-3" /> Çkyçu
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-72 h-screen sticky top-0">
        <SidebarContent />
      </div>

      {/* Mobile Header & Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 border-b border-white/5 bg-card flex items-center justify-between px-4 sticky top-0 z-40">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="font-display font-bold text-white text-sm">K</span>
            </div>
          </Link>
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72 bg-card border-r border-white/10">
              <SidebarContent />
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-6xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
