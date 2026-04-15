import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isUp: boolean;
  };
  className?: string;
  color?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  label, 
  value, 
  icon: Icon, 
  trend, 
  className,
  color = "text-sky-400"
}) => {
  return (
    <div className={cn("glass-card p-6 relative overflow-hidden group", className)}>
      {/* Dynamic Background Glow */}
      <div className={cn("absolute -right-10 -top-10 w-32 h-32 blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-500", color.replace('text-', 'bg-'))} />
      
      <div className="flex flex-col gap-5 relative z-10">
        <div className="flex items-center gap-4">
          <div className={cn("p-2.5 rounded-2xl bg-slate-900/60 border border-white/5 shadow-inner backdrop-blur-sm transition-transform duration-300 group-hover:scale-110", color)}>
            <Icon className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 leading-none">{label}</span>
        </div>
        
        <div className="flex items-end justify-between gap-3">
          <span className="text-4xl font-black tracking-[-0.05em] leading-none text-white drop-shadow-sm transition-transform duration-300 group-hover:translate-x-1">{value}</span>
          {trend && (
            <div className={cn(
              "flex items-center px-2 py-1 rounded-lg text-[10px] font-black border border-white/5 backdrop-blur-md transition-all duration-300 group-hover:scale-105",
              trend.isUp ? "bg-red-500/10 text-red-400 border-red-500/10" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/10"
            )}>
              <span className="mr-0.5">{trend.isUp ? '↑' : '↓'}</span>
              {trend.value}%
            </div>
          )}
        </div>
      </div>
      
      {/* Decorative Bottom Line */}
      <div className={cn("absolute bottom-0 left-6 right-6 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500", color.replace('text-', 'bg-gradient-to-r from-transparent via-'), " to-transparent")} />
    </div>
  );
};
