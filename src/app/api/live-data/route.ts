import { NextResponse } from 'next/server';
import db, { seedDatabase } from '@/lib/db';

export async function GET() {
  try {
    // Ensure database is seeded
    seedDatabase();

    // Get latest parking slots
    const parkingSlots = db.prepare('SELECT * FROM parking_slots').all().map((s: any) => ({
      id: s.id,
      slotNumber: s.slot_number,
      status: s.status,
      type: s.type,
      lastUpdated: s.last_updated,
      sensorId: s.sensor_id
    }));

    // Get parking history for charts (last 20 points)
    const parkingHistory = db.prepare(`
      SELECT occupancy_rate, total_slots, occupied_slots, timestamp 
      FROM parking_history 
      ORDER BY id DESC 
      LIMIT 20
    `).all().reverse().map((h: any) => ({
      time: new Date(h.timestamp).toLocaleTimeString(),
      occupancy: Math.round(h.occupancy_rate),
      totalSlots: h.total_slots,
      occupiedSlots: h.occupied_slots
    }));

    // Get latest alerts
    const alerts = db.prepare('SELECT * FROM alerts ORDER BY id DESC LIMIT 50').all();

    return NextResponse.json({
      parkingSlots,
      parkingHistory,
      alerts,
      timestamp: new Date().toISOString(),
      status: 'success'
    });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to fetch live data' }, { status: 500 });
  }
}
