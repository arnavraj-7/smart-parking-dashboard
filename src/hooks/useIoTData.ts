'use client';

import { useState, useEffect } from 'react';
import { ParkingSlot, ParkingHistory, Alert, DashboardStats, Prediction } from '@/types/iot';

export function useIoTData() {
  const [parkingSlots, setParkingSlots] = useState<ParkingSlot[]>([]);
  const [history, setHistory] = useState<ParkingHistory[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);

  useEffect(() => {
    // 1. Initial fetch
    const fetchInitial = async () => {
      try {
        const res = await fetch('/api/live-data');
        const data = await res.json();
        if (data.status === 'success') {
          updateStates(data);
        }
      } catch (e) {
        console.error('Initial fetch failed:', e);
      }
    };

    // 2. Open SSE Stream
    const eventSource = new EventSource('/api/stream');

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        updateStates(data);
      } catch (e) {
        console.error('Stream parsing error:', e);
      }
    };

    const updateStates = (data: any) => {
      // ONLY accept parking data to prevent "Smart City" leaks
      if (data.parkingSlots) setParkingSlots(data.parkingSlots);

      if (data.parkingHistory) {
        if (Array.isArray(data.parkingHistory)) {
          setHistory(data.parkingHistory);
        } else {
          setHistory(prev => [...prev, data.parkingHistory].slice(-20));
        }
      }

      if (data.alerts) {
        // FILTER: Only keep parking-related alerts
        const newParkingAlerts = (data.alerts || []).filter((a: Alert) => 
          a.type === 'parking' || a.message.toLowerCase().includes('parking') || a.message.toLowerCase().includes('lot')
        );
        
        if (newParkingAlerts.length > 0) {
          setAlerts((prev) => {
            const combined = [...newParkingAlerts, ...prev];
            return combined.slice(0, 50);
          });
        }
      }

      // Generate mock predictions for parking based on occupancy
      const slots = data.parkingSlots || parkingSlots;
      const occupied = slots.filter((s: any) => s.status === 'occupied').length || 0;
      const total = slots.length || 24;
      const rate = (occupied / total) * 100;

      if (rate > 85) {
        setPredictions([{
          area: 'Main Lot',
          type: 'parking',
          message: 'Lot capacity exceeding 85%. Expect full status soon.',
          confidence: 92
        }]);
      } else if (rate > 60) {
        setPredictions([{
          area: 'Main Lot',
          type: 'parking',
          message: 'Steady incoming traffic. Availability decreasing.',
          confidence: 75
        }]);
      } else {
        setPredictions([]);
      }
    };

    fetchInitial();

    return () => {
      eventSource.close();
    };
  }, [parkingSlots.length]);

  const totalSlots = parkingSlots.length || 24;
  const occupiedSlots = parkingSlots.filter(s => s.status === 'occupied').length;
  const availableSlots = totalSlots - occupiedSlots;
  const occupancyRate = totalSlots > 0 ? Math.round((occupiedSlots / totalSlots) * 100) : 0;

  const stats: DashboardStats = {
    totalSensors: totalSlots,
    totalSlots,
    availableSlots,
    occupiedSlots,
    occupancyRate,
    avgTraffic: 0,
    avgAQI: 0,
    avgTemp: 0
  };

  return { parkingSlots, alerts, predictions, history, stats };
}
