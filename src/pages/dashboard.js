// src/pages/dashboard.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SMTDashboard from "../components/SMTDashboard";
import EducatorDashboard from "../components/EducatorDashboard";
import LearnerDashboard from "../components/LearnerDashboard";
import GoogleCalendar from "../components/GoogleCalendar";

export default function Dashboard() {
  const router = useRouter();
  const [role, setRole] = useState("");

  useEffect(() => {
    const loggedIn =
      typeof window !== "undefined" ? localStorage.getItem("isLoggedIn") : null;
    const storedRole =
      typeof window !== "undefined" ? localStorage.getItem("role") : null;

    if (loggedIn !== "true") {
      router.push("/login");
    } else {
      setRole(storedRole || "");
    }
  }, [router]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("role");
      localStorage.removeItem("username");
    }
    router.push("/login");
  };

  return (
    <section className="p-8">
      {role === "Principal" || role === "Deputy Principal" || role.includes("Head") ? (
        <SMTDashboard role={role} />
      ) : role === "Educator" || role === "School Administrator" ? (
        <EducatorDashboard role={role} />
      ) : role === "Learner" ? (
        <LearnersDashboard />
      ) : (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-green-800">Dashboard</h1>
          <p className="text-gray-700">
            Your role ({role || "Unknown"}) isn’t configured yet.
          </p>
          <GoogleCalendar />
        </div>
      )}

      <div className="mt-8">
        <button
          type="button"
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </section>
  );
}
