// src/components/EducatorDashboard.js
import { useState } from "react";
import GoogleCalendar from "./GoogleCalendar";

export default function EducatorDashboard({ role }) {
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const username = typeof window !== "undefined" ? localStorage.getItem("username") : null;

  // Clock in/out
  const handleClock = async (action) => {
    if (!username) {
      setStatus("No user logged in.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const res = await fetch("/api/clock", {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-user-id": username },
          body: JSON.stringify({ action, lat: latitude, lng: longitude }),
        });
        const data = await res.json();
        if (res.ok) {
          setStatus(`✅ ${action.replace("_", " ")} at ${new Date().toLocaleTimeString()}`);
        } else {
          setStatus(`❌ Error: ${data.error}`);
        }
      },
      () => setStatus("❌ Location required")
    );
  };

  // Upload resources
  const handleUpload = async (e) => {
    e.preventDefault();
    const file = e.target.elements.file.files[0];
    if (!file || !username) {
      setUploadStatus("❌ No file or user");
      return;
    }
    const res = await fetch("/api/resources", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-user-id": username },
      body: JSON.stringify({
        title: file.name,
        description: "Uploaded resource",
        fileUrl: `/uploads/${file.name}`,
        subject: "General",
        grade: "All",
      }),
    });
    const data = await res.json();
    if (res.ok) setUploadStatus(`✅ Uploaded ${file.name}`);
    else setUploadStatus(`❌ Error: ${data.error}`);
  };

  // Send message
  const handleSendMessage = async () => {
    if (!message || !username) {
      setStatus("❌ No message or user");
      return;
    }
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-user-id": username },
      body: JSON.stringify({ content: message, recipientRole: "Learner" }),
    });
    const data = await res.json();
    if (res.ok) {
      setStatus("✅ Message sent");
      setMessage("");
    } else {
      setStatus(`❌ Error: ${data.error}`);
    }
  };

  return (
    <div className="space-y-8">
      {/* Clock In/Out */}
      <section className="border rounded p-4">
        <h2 className="text-xl font-semibold text-green-700 mb-2">Clock In / Out</h2>
        <button onClick={() => handleClock("clock_in")} className="bg-green-700 text-white px-4 py-2 rounded mr-2">Clock In</button>
        <button onClick={() => handleClock("clock_out")} className="bg-green-700 text-white px-4 py-2 rounded">Clock Out</button>
        {status && <p className="mt-2 text-sm">{status}</p>}
      </section>

      {/* Upload Section */}
      <section className="border rounded p-4">
        <h2 className="text-xl font-semibold text-green-700 mb-2">Upload Resources</h2>
        <form onSubmit={handleUpload}>
          <input type="file" name="file" className="mb-2" />
          <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded">Upload</button>
        </form>
        {uploadStatus && <p className="mt-2 text-sm">{uploadStatus}</p>}
      </section>

      {/* Messages Section */}
      <section className="border rounded p-4">
        <h2 className="text-xl font-semibold text-green-700 mb-2">Messages</h2>
        <textarea
          className="w-full border rounded p-2 mb-2"
          placeholder="Write a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage} className="bg-green-700 text-white px-4 py-2 rounded">Send</button>
        {status && <p className="mt-2 text-sm">{status}</p>}
      </section>

      {/* Calendar */}
      <section className="border rounded p-4">
        <GoogleCalendar />
      </section>
    </div>
  );
}
