# 🌟 SmartPark Pro - Feature Documentation

SmartPark Pro is a premium IoT-based parking management solution designed for modern Smart Cities. It provides a real-time bridge between physical hardware sensors and a high-performance visual dashboard.

---

## 🚀 Core Features

### 1. Real-Time Slot Monitoring (Live Grid)
The centerpiece of the application is the **Dynamic Parking Grid**. 
- **Ultrasonic Integration:** Mimics data from HC-SR04 ultrasonic sensors. When a car is detected within a specific range (e.g., < 10cm), the UI updates instantly.
- **Visual Feedback:** Uses high-fidelity car icons and color coding (Emerald for Available, Crimson for Occupied).
- **Smooth Transitions:** Powered by `Framer Motion`, ensure that status changes feel fluid and professional rather than jarring.

### 2. Intelligent Categorization
The system doesn't just treat every slot the same. It supports specialized parking types essential for modern infrastructure:
- **EV Charging Slots:** Marked with a Lightning Bolt icon, these slots are reserved for electric vehicles.
- **ADA/Disabled Access:** Marked with the accessibility icon, ensuring compliance with city regulations.
- **Standard Slots:** General-purpose parking for all other vehicles.

### 3. Live Statistical Overview
At a glance, operators can see the health of the parking lot through four key performance indicators (KPIs):
- **Total Capacity:** The maximum number of vehicles the lot can hold.
- **Live Availability:** Real-time count of empty spots.
- **Current Occupancy:** Real-time count of parked vehicles.
- **Occupancy Rate:** A percentage-based trend showing how full the lot is, including a "Trend Indicator" to show if usage is increasing or decreasing.

### 4. Peak Usage Analytics
The **Analytics Tab** provides a historical perspective using a Recharts-powered Area Chart.
- **Trend Tracking:** It logs occupancy percentages every few seconds.
- **Pattern Recognition:** Helps administrators understand "Peak Hours" (e.g., 9 AM office arrivals) vs. "Off-Peak" times.
- **Data Persistence:** Even if the dashboard is closed, the historical data remains saved in the SQLite database.

### 5. Premium Dark-Mode UI
Built with a "Glassmorphism" aesthetic:
- **Minimalist Design:** No cluttered sidebars or unnecessary popups.
- **High Contrast:** Slate-950 background with Sky-400 accents ensures readability in control room environments.
- **Responsive Layout:** Works perfectly on desktop monitors, tablets, and mobile devices.

---

## 🛠️ IoT Hardware Simulation
Even without physical hardware connected, the system simulates a full IoT stack:
- **Sensor Mesh:** Each slot has a unique `sensorId`.
- **Latency Simulation:** Data updates every 3 seconds to mimic real-world network transmission.
- **State Persistence:** Slot status is stored in a local SQL database, exactly how a production cloud server would handle IoT data.
