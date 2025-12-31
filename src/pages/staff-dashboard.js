// src/pages/staff-dashboard.js
import ClockInWidget from "../components/ClockInWidget";

export default function StaffDashboard() {
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold">Staff Dashboard</h1>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <ClockInWidget />
        {/* Add other widgets here */}
      </div>
    </main>
  );
}
