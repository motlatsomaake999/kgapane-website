// src/components/LearnersDashboard.js
import { useState, useEffect } from "react";
import GoogleCalendar from "./GoogleCalendar";

export default function LearnersDashboard() {
  const [resources, setResources] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch uploaded resources
    const fetchResources = async () => {
      try {
        const res = await fetch("/api/resources");
        const data = await res.json();
        setResources(data.resources || []);
      } catch (err) {
        console.error("Error fetching resources:", err);
      }
    };

    // Fetch messages for learners
    const fetchMessages = async () => {
      try {
        const res = await fetch("/api/messages?role=Learner");
        const data = await res.json();
        setMessages(data.messages || []);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    fetchResources();
    fetchMessages();
  }, []);

  return (
    <section className="p-8 space-y-8">
      <h1 className="text-2xl font-bold text-green-800 mb-6">Learner Dashboard</h1>

      {/* Messages from Staff */}
      <section className="border rounded p-4">
        <h2 className="text-xl font-semibold text-green-700 mb-2">Messages from Staff</h2>
        <ul className="list-disc pl-6">
          {messages.length === 0 && <li>No messages yet.</li>}
          {messages.map((msg) => (
            <li key={msg.id}>
              <span className="font-semibold">{msg.senderId}:</span> {msg.content}
            </li>
          ))}
        </ul>
      </section>

      {/* Resources by Subject */}
      <section className="border rounded p-4">
        <h2 className="text-xl font-semibold text-green-700 mb-2">Learning Materials</h2>
        <ul className="list-disc pl-6">
          {resources.length === 0 && <li>No resources uploaded yet.</li>}
          {resources.map((res) => (
            <li key={res.id}>
              <span className="font-semibold">{res.subject} (Grade {res.grade}):</span>{" "}
              <a href={res.fileUrl} className="text-blue-600 underline" download>
                {res.title}
              </a>{" "}
              — uploaded by {res.uploadedBy}
            </li>
          ))}
        </ul>
      </section>

      {/* Read-only Google Calendar */}
      <section className="border rounded p-4">
        <GoogleCalendar title="School Calendar" />
      </section>
    </section>
  );
}
