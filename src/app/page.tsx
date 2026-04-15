'use client';

import { useIoTData } from '@/hooks/useIoTData';
import { StatCard } from '@/components/StatCard';
import { ParkingGrid } from '@/components/ParkingGrid';
import { ParkingHistoryChart } from '@/components/ParkingHistoryChart';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Car,
  LayoutDashboard,
  ShieldCheck,
  Activity,
  Zap,
  Accessibility,
  CheckCircle2
} from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Home() {
  const { parkingSlots, history, stats } = useIoTData();

  return (
    <main className="min-h-screen p-4 md:p-8 space-y-8 max-w-[1400px] mx-auto bg-slate-950 text-slate-100">     
      {/* Premium Header */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/5">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-sky-500/10 rounded-2xl border border-sky-500/20 shadow-[0_0_15px_rgba(56,189,248,0.1)]">
              <Car className="w-6 h-6 text-sky-400" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter text-slate-100 uppercase">SmartPark Pro</h1>   
              <div className="flex items-center gap-2">
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Sensor Mesh Active • v3.2.0</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div variants={item}>
          <StatCard label="Total Capacity" value={stats.totalSlots} icon={LayoutDashboard} color="text-indigo-400" />
        </motion.div>
        <motion.div variants={item}>
          <StatCard label="Available Slots" value={stats.availableSlots} icon={CheckCircle2} color="text-emerald-400" />
        </motion.div>
        <motion.div variants={item}>
          <StatCard label="Occupied Slots" value={stats.occupiedSlots} icon={Car} color="text-red-400" />       
        </motion.div>
        <motion.div variants={item}>
          <StatCard label="Occupancy Rate" value={`${stats.occupancyRate}%`} icon={Activity} color="text-sky-400" />
        </motion.div>
      </motion.div>

      {/* Main Content Area */}
      <div className="space-y-6">
        <Tabs defaultValue="grid" className="w-full">
          <TabsList className="bg-slate-900/50 border border-white/5 mb-4 p-1">
            <TabsTrigger value="grid" className="data-[state=active]:bg-sky-500/10 data-[state=active]:text-sky-400 rounded-lg px-8">
              <LayoutDashboard className="w-4 h-4 mr-2" /> Live Slot Status
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-emerald-500/10 data-[state=active]:text-emerald-400 rounded-lg px-8">
              <Activity className="w-4 h-4 mr-2" /> Usage Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="grid" className="space-y-6 outline-none">
            <ParkingGrid slots={parkingSlots} />
            
            {/* Legend / Special Slots Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-card p-4 flex items-center justify-between border-l-4 border-l-sky-500">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-sky-500/10 rounded-lg">
                    <Zap className="w-4 h-4 text-sky-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase">EV Charging Stations</p>
                    <p className="text-sm font-black text-white">Dedicated Slots Available</p>
                  </div>
                </div>
              </div>
              <div className="glass-card p-4 flex items-center justify-between border-l-4 border-l-indigo-500">       
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-indigo-500/10 rounded-lg">
                    <Accessibility className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase">Disabled Access</p>
                    <p className="text-sm font-black text-white">Priority Reserved Slots</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 outline-none">
            <ParkingHistoryChart data={history} title="Real-Time Occupancy Trends (Mock Data)" />
          </TabsContent>
        </Tabs>
      </div>

    </main>
  );
}
