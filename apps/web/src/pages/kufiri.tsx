import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, Video, Clock } from "lucide-react";

interface BorderCardProps {
  name: string;
  waitTime: string;
  status: "green" | "yellow" | "red";
}

function BorderCard({ name, waitTime, status }: BorderCardProps) {
  const statusColors = {
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500"
  };

  const statusBg = {
    green: "bg-green-500/10 border-green-500/20 text-green-400",
    yellow: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400",
    red: "bg-red-500/10 border-red-500/20 text-red-400"
  };

  return (
    <div className="glass-panel overflow-hidden rounded-2xl flex flex-col transition-all hover:-translate-y-1 hover:border-primary/30">
      {/* Webcam Simulation */}
      <div className="w-full h-48 bg-[#050505] relative flex items-center justify-center border-b border-white/5">
        {/* Live indicator */}
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/5">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] font-bold text-white tracking-widest uppercase">LIVE</span>
        </div>
        <Video className="w-8 h-8 text-white/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
        <div className="absolute bottom-3 left-4 text-xs font-mono text-white/50">{name.toUpperCase()} CAM-01</div>
      </div>
      
      {/* Details */}
      <div className="p-6 flex flex-col gap-4 flex-1">
        <h3 className="text-xl font-display font-bold text-white">{name}</h3>
        
        <div className={`px-4 py-3 rounded-xl border flex items-center justify-between ${statusBg[status]}`}>
          <div className="flex items-center gap-2 font-medium">
            <Clock className="w-4 h-4" />
            <span>Pritja: {waitTime}</span>
          </div>
          <div className={`w-3 h-3 rounded-full shadow-[0_0_10px_currentColor] ${statusColors[status]}`} />
        </div>

        <div className="mt-auto pt-4">
          <Button variant="outline" className="w-full text-white/80 border-white/10 bg-white/5 hover:bg-white/10 hover:text-white">
            <Plus className="w-4 h-4 mr-2" />
            Shto Raport
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function KufiriLive() {
  const borders: BorderCardProps[] = [
    { name: "Merdare", waitTime: "2h+", status: "red" },
    { name: "Dheu i Bardhë", waitTime: "30-60 min", status: "yellow" },
    { name: "Hani i Elezit", waitTime: "5-10 min", status: "green" },
    { name: "Muçibabë", waitTime: "5-10 min", status: "green" },
  ];

  return (
    <MainLayout>
      <div className="pt-28 pb-20 min-h-screen bg-background relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm mb-6">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Përditësime në kohë reale
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Kufiri Live
            </h1>
            <p className="text-lg text-white/60 max-w-2xl">
              Informohu për gjendjen në pikat kufitare përmes kamerave live dhe raportimeve të komunitetit.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {borders.map((border, i) => (
              <motion.div
                key={border.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <BorderCard {...border} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
