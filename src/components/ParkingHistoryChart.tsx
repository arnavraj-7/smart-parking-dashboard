'use client';

import React from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ParkingHistory } from '@/types/iot';

interface ParkingHistoryChartProps {
  data: ParkingHistory[];
  title: string;
}

export const ParkingHistoryChart: React.FC<ParkingHistoryChartProps> = ({ data, title }) => {
  return (
    <div className="glass-card p-6 h-[400px]">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">{title}</h3>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Occupancy Rate (%)</span>
        </div>
      </div>

      <div className="w-full h-full pb-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorOccupancy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#475569', fontSize: 10, fontWeight: 700 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#475569', fontSize: 10, fontWeight: 700 }}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                backdropFilter: 'blur(8px)',
                fontSize: '12px',
                fontWeight: '800',
                color: '#f1f5f9'
              }}
              itemStyle={{ color: '#38bdf8' }}
              labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
            />
            <Area
              type="monotone"
              dataKey="occupancy"
              stroke="#38bdf8"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorOccupancy)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
