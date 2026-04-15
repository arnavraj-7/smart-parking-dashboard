# 🛠️ SmartPark Pro - Getting Started Guide

Follow this guide to get the SmartPark Pro dashboard and IoT simulator running on your local machine.

---

## 📋 Prerequisites

Ensure you have the following installed:
1.  **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
2.  **npm** (comes with Node.js)
3.  **Git** (optional, for cloning)

---

## 🚀 1. Setup & Installation

### Option A: Clone the Repository
If you're using Git, run:
```bash
git clone <your-repository-url>
cd smart-parking-system
```

### Option B: Manual Setup
If you downloaded the folder, navigate into it:
```bash
cd smart-parking-system
```

### 📦 Install Dependencies
Run the following command to install all necessary libraries (Next.js, Tailwind, SQLite, etc.):
```bash
npm install
```

---

## 🖥️ 2. Running the Dashboard

### 🛰️ Step 1: Start the Dashboard
In your first terminal window, start the Next.js development server:
```bash
npm run dev
```
- Open [http://localhost:3000](http://localhost:3000) in your browser.
- You will see the **Live Dashboard**, but the slots may be empty or static until you start the simulator.

### 🚗 Step 2: Start the IoT Simulator
In a **new terminal window** (keep the first one running), start the hardware simulator:
```bash
node scripts/simulator.js
```
- This script mimics a real-world sensor mesh.
- It updates slot statuses and pushes them to your dashboard in real-time.

---

## 🧪 3. Verifying the System

1.  **Check the Grid:** You should see slot icons changing color (Emerald ↔ Crimson) every few seconds.
2.  **Check Analytics:** Click the **Usage Analytics** tab to see the live occupancy graph updating.
3.  **Check Stats:** The numbers at the top (Capacity, Available, Occupied) should update dynamically.

---

## 🛑 Troubleshooting

- **Empty Dashboard?** Make sure `node scripts/simulator.js` is running in a separate terminal.
- **Port Conflict?** If port 3000 is used, Next.js will use 3001. Ensure your simulator script `POST` URL in `scripts/simulator.js` matches the port in your browser.
- **Database Locked?** If you see a "Database Busy" error, stop the simulator and the dashboard, and restart them.

---

## 🎓 Presentation Tips
- **Demo Mode:** Show the "Live Grid" and explain that these represent real-time sensor triggers.
- **Data Integrity:** Mention that all data is stored in a **SQLite database**, which mimics a real-world data persistence layer.
- **Minimalist Design:** Highlight the **Clean UI/UX** - designed for maximum efficiency with zero distractions.
