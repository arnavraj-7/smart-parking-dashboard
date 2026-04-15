const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, '../iot-data.sqlite');
const db = new Database(DB_PATH);

async function generateData() {
  const timestamp = new Date().toISOString();

  // 1. UPDATE PARKING SLOTS (MOCK ULTRASONIC SENSORS)
  const slots = db.prepare('SELECT * FROM parking_slots').all();
  const updatedSlots = slots.map(slot => {
    // 15% chance for a car to enter/leave
    if (Math.random() > 0.85) {
      const newStatus = slot.status === 'available' ? 'occupied' : 'available';
      db.prepare('UPDATE parking_slots SET status = ?, last_updated = ? WHERE id = ?')
        .run(newStatus, timestamp, slot.id);
      return { ...slot, status: newStatus, last_updated: timestamp };
    }
    return slot;
  });

  const occupiedCount = updatedSlots.filter(s => s.status === 'occupied').length;
  const totalSlots = updatedSlots.length;
  const occupancyRate = (occupiedCount / totalSlots) * 100;

  // SAVE HISTORY
  db.prepare('INSERT INTO parking_history (occupancy_rate, total_slots, occupied_slots, timestamp) VALUES (?, ?, ?, ?)')
    .run(occupancyRate, totalSlots, occupiedCount, timestamp);

  // 2. PARKING ALERTS
  const alerts = [];
  if (occupancyRate > 90) {
    const message = '⚠️ Lot Capacity Alert: 90% full. Routing new vehicles to Overspill Area.';
    db.prepare('INSERT INTO alerts (type, severity, message, area, timestamp) VALUES (?, ?, ?, ?, ?)')
      .run('parking', 'warning', message, 'Section A', timestamp);
    alerts.push({ type: 'parking', severity: 'warning', message, area: 'Section A', timestamp });
  }

  // 3. PUSH TO FRONTEND
  try {
    const response = await fetch('http://localhost:3000/api/webhook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        parkingSlots: updatedSlots.map(s => ({
          id: s.id,
          slotNumber: s.slot_number,
          status: s.status,
          type: s.type,
          lastUpdated: s.last_updated,
          sensorId: s.sensor_id
        })),
        parkingHistory: {
          time: new Date().toLocaleTimeString(),
          occupancy: Math.round(occupancyRate),
          totalSlots,
          occupiedSlots: occupiedCount
        },
        alerts,
        timestamp,
        status: 'success'
      })
    });
    console.log(`[${new Date().toLocaleTimeString()}] Pushed Update: ${occupiedCount}/${totalSlots} slots occupied.`);
  } catch (e) {
    console.error('Webhook failed. Is Next.js running?');
  }

  // PRUNE DB
  db.prepare('DELETE FROM parking_history WHERE id NOT IN (SELECT id FROM parking_history ORDER BY id DESC LIMIT 200)').run();
  db.prepare('DELETE FROM alerts WHERE id NOT IN (SELECT id FROM alerts ORDER BY id DESC LIMIT 50)').run();
}

console.log('--- SMART PARKING IOT SIMULATOR ---');
setInterval(generateData, 3000); 
generateData();
