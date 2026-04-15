export interface ParkingSlot {
  id: string;
  slotNumber: string;
  status: 'available' | 'occupied';
  type: 'standard' | 'ev' | 'disabled';
  lastUpdated: string;
  sensorId: string;
}

export interface ParkingHistory {
  time: string;
  occupancy: number; // Percentage
  totalSlots: number;
  occupiedSlots: number;
}

export interface Alert {
  id: string;
  type: 'parking' | 'system';
  severity: 'info' | 'warning' | 'critical';
  message: string;
  area: string;
  timestamp: string;
}

export interface Prediction {
  area: string;
  type: 'parking';
  message: string;
  confidence: number;
}

export interface DashboardStats {
  totalSensors: number;
  totalSlots: number;
  availableSlots: number;
  occupiedSlots: number;
  occupancyRate: number;
}
