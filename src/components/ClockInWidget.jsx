// src/components/ClockInWidget.jsx
import { useState } from "react";

export default function ClockInWidget() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastResult, setLastResult] = useState(null);

  async function doClock(action) {
    setLoading(true);
    setStatus("Requesting location...");
    if (!("geolocation" in navigator)) {
      setLoading(false);
      setStatus("Geolocation not supported on this device.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          setStatus("Validating location...");
          const body = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            action,
          };
          const res = await fetch("/api/clock", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
          const data = await res.json();
          setLoading(false);

          if (!res.ok) {
            setStatus(data.error || "Clock request failed");
            return;
          }

          setLastResult(data);
          setStatus(data.message);
        } catch (err) {
          setLoading(false);
          setStatus("Network error while clocking. Try again.");
        }
      },
      (err) => {
        setLoading(false);
        if (err.code === 1) setStatus("Permission denied for location.");
        else if (err.code === 2) setStatus("Position unavailable.");
        else if (err.code === 3) setStatus("Location request timed out.");
        else setStatus("Location error.");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }

  return (
    <div className="rounded-lg border border-green-700 bg-green-50/5 p-4 text-white">
      <h3 className="text-lg font-semibold">Clock-in</h3>
      <p className="text-xs text-gray-300">
        Your location must be within the school radius to clock in/out.
      </p>

      <div className="mt-3 flex gap-3">
        <button
          onClick={() => doClock("clock_in")}
          disabled={loading}
          className="px-3 py-2 bg-green-700 hover:bg-green-800 disabled:opacity-50 rounded text-sm"
        >
          {loading ? "Clocking..." : "Clock In"}
        </button>
        <button
          onClick={() => doClock("clock_out")}
          disabled={loading}
          className="px-3 py-2 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 rounded text-sm"
        >
          {loading ? "Clocking..." : "Clock Out"}
        </button>
      </div>

      {status && <p className="mt-3 text-sm">{status}</p>}

      {lastResult && (
        <div className="mt-3 text-xs">
          <p>
            Distance from school:{" "}
            <span className="font-semibold">
              {Math.round(lastResult.distance)} m
            </span>{" "}
            (allowed {lastResult.allowedRadius} m)
          </p>
          <p>
            Approved:{" "}
            <span className={`font-semibold ${lastResult.approved ? "text-green-400" : "text-red-400"}`}>
              {lastResult.approved ? "Yes" : "No"}
            </span>
          </p>
          <p>Time: {new Date(lastResult.log.timestamp).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}
