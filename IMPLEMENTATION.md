# 🏛️ SmartPark Pro - Technical Implementation

This document provides a deep dive into the architecture, data flow, and code structure of the SmartPark Pro system.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 19 + Next.js 16 | Core framework for the web dashboard. |
| **Styling** | Tailwind CSS + Shadcn/UI | Modern, utility-first design and accessible components. |
| **Animations** | Framer Motion | Smooth UI transitions and live data animations. |
| **Analytics** | Recharts | Interactive charts for historical trends. |
| **Database** | Better-SQLite3 | High-performance, local SQL storage. |
| **Mock HW** | Node.js (scripts) | Background simulator mimicking IoT sensors. |
| **Communication** | SSE (Server-Sent Events) | Real-time "Push" updates from server to client. |

---

## 📡 1. The Data Pipeline (Simulator to Dashboard)

The system is designed with a **Push-based Architecture** to ensure real-time responsiveness.

### A. The Simulator (`/scripts/simulator.js`)
This Node.js script acts as our "Hardware Driver."
1.  **State Logic:** It iterates through each parking slot in the SQLite database.
2.  **Probability Logic:** Every 3 seconds, it has a 15% chance to change a slot's status (Available ↔ Occupied), mimicking a car pulling in or out.
3.  **Database Update:** It writes the new status and timestamp to the `parking_slots` table and appends a record to the `parking_history` table.
4.  **Webhook Trigger:** Finally, it sends a `POST` request to `/api/webhook` with the latest data.

### B. The Webhook & SSE (`/src/app/api/webhook/route.ts`)
1.  **Ingestion:** The webhook receives the data from the simulator.
2.  **Broadcasting:** It uses a shared `EventEmitter` to broadcast the update internally.
3.  **Streaming:** The `/api/stream` endpoint maintains an open connection with the browser and "pushes" the data as soon as it's received.

### C. The Frontend Hook (`/src/hooks/useIoTData.ts`)
1.  **Hydration:** On page load, it performs an initial `fetch` to get the latest DB state.
2.  **Live Updates:** It subscribes to the SSE stream. When new data arrives, it updates the React state, triggering an instant, flicker-free re-render of the dashboard.

---

## 🗄️ 2. Database Schema

We use **SQLite** because it is lightweight yet allows for complex SQL queries that a simple JSON file cannot handle.

### Tables:
- **`parking_slots`**: Tracks the static information (ID, Slot #, Type) and the dynamic status.
- **`parking_history`**: A high-resolution log of total occupancy over time, used for our charts.
- **`alerts`**: Stores critical events like "Lot Full" notifications.

---

## 🎨 3. UI Design Principles

- **Glassmorphism:** The `glass-card` class in `globals.css` uses `backdrop-filter: blur` and subtle borders to give a high-tech, semi-transparent look.
- **Performance:** We use **monospaced fonts** for real-time numbers to prevent layout shifting during rapid updates.
- **Iconography:** Using `lucide-react`, we ensure consistent, high-quality vector icons for every vehicle and sensor type.

---

## 🧪 4. Testing with Tinkercad
While this dashboard mocks the data, it is built to be **Hardware Ready**. 
- To connect to a real Arduino: Simply replace the `simulator.js` logic with an HTTP client on your Arduino/ESP32 that sends `POST` requests to the `/api/webhook` endpoint with the sensor readings.
