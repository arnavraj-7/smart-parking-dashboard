'use client';

import React from 'react';
import { ParkingSlot } from '@/types/iot';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Car, Zap, Accessibility } from 'lucide-react';

interface ParkingGridProps {
  slots: ParkingSlot[];
}

export const ParkingGrid: React.FC<ParkingGridProps> = ({ slots }) => {
  return (
    <div className="glass-card p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Live Parking Grid</h3>
        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-emerald-500/20 border border-emerald-500/30" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-red-500/20 border border-red-500/30" />
            <span>Occupied</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
        {slots.map((slot) => (
          <motion.div
            key={slot.id}
            initial={false}
            animate={{
              scale: slot.status === 'occupied' ? 0.98 : 1,
              backgroundColor: slot.status === 'occupied' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
              borderColor: slot.status === 'occupied' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
            }}
            className={cn(
              "relative aspect-square rounded-xl border-2 flex flex-col items-center justify-center gap-1 transition-all duration-500 cursor-default group hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]",
            )}
          >
            {slot.type === 'ev' && (
              <Zap className="w-3 h-3 text-sky-400 absolute top-1.5 right-1.5" />
            )}
            {slot.type === 'disabled' && (
              <Accessibility className="w-3 h-3 text-indigo-400 absolute top-1.5 right-1.5" />
            )}
            
            <span className="text-[10px] font-black text-slate-500 mb-1">{slot.slotNumber}</span>
            
            <motion.div
              animate={{
                opacity: slot.status === 'occupied' ? 1 : 0.3,
                scale: slot.status === 'occupied' ? 1 : 0.8,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Car className={cn(
                "w-6 h-6 transition-colors duration-500",
                slot.status === 'occupied' ? "text-red-500" : "text-emerald-500/40"
              )} />
            </motion.div>

            {/* Status Indicator */}
            <div className={cn(
              "absolute bottom-1.5 w-1 h-1 rounded-full",
              slot.status === 'occupied' ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" : "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
            )} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
