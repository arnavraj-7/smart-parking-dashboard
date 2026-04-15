import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'iot-data.sqlite');
const db = new Database(DB_PATH);

// Initialize Parking tables
db.exec(`
  CREATE TABLE IF NOT EXISTS alerts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT,
    severity TEXT,
    message TEXT,
    area TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS parking_slots (
    id TEXT PRIMARY KEY,
    slot_number TEXT,
    status TEXT,
    type TEXT,
    sensor_id TEXT,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS parking_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    occupancy_rate REAL,
    total_slots INTEGER,
    occupied_slots INTEGER,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

export const seedDatabase = () => {
  try {
    const rowCount = db.prepare('SELECT COUNT(*) as count FROM parking_slots').get() as { count: number };

    if (!rowCount || rowCount.count === 0) {
      console.log('🚗 Seeding parking lot...');
      const now = Date.now();

      // Seed Parking Slots
      const parkingSlotStmt = db.prepare('INSERT OR REPLACE INTO parking_slots (id, slot_number, status, type, sensor_id) VALUES (?, ?, ?, ?, ?)');
      for (let i = 1; i <= 24; i++) {
        const type = i <= 4 ? 'disabled' : i <= 8 ? 'ev' : 'standard';
        const status = Math.random() > 0.5 ? 'occupied' : 'available';
        parkingSlotStmt.run(`slot-${i}`, `P-${i.toString().padStart(2, '0')}`, status, type, `sensor-us-${i}`);
      }

      // Seed Parking History
      const parkingHistoryStmt = db.prepare('INSERT INTO parking_history (occupancy_rate, total_slots, occupied_slots, timestamp) VALUES (?, ?, ?, ?)');
      for (let i = 50; i >= 0; i--) {
        const timestamp = new Date(now - i * 15 * 60 * 1000).toISOString();
        const occupied = Math.floor(Math.random() * 10) + 10;
        parkingHistoryStmt.run((occupied / 24) * 100, 24, occupied, timestamp);
      }

      console.log('✅ Parking database seeded.');
    }
  } catch (e) {
    console.error('Seeding error:', e);
  }
};

export default db;
