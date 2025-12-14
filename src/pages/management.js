import { useState, useEffect } from "react";
import { useRouter } from "next/router";

/* ---------- Sub-components ---------- */

function CurriculumManagement() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-green-700 mb-4">Curriculum Management</h2>
      <form className="space-y-4">
        <input type="text" placeholder="Class Visit Notes" className="w-full border p-2 rounded" />
        <input type="text" placeholder="Audit of Written Work" className="w-full border p-2 rounded" />
        <input type="text" placeholder="Pre-Moderation Task" className="w-full border p-2 rounded" />
        <input type="text" placeholder="Post-Moderation Task" className="w-full border p-2 rounded" />
        <label className="block text-gray-700">Upload Marksheets / Moderation Docs</label>
        <input type="file" className="w-full border p-2 rounded" />
        <button type="button" className="bg-green-700 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
}

function HRManagement() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-green-700 mb-4">HR Management</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Accountability Reports</li>
        <li>Delegation Records</li>
        <li>Class Allocation</li>
        <li>Missed Classes</li>
        <li>Absenteeism Tracking</li>
        <li>Cover Lessons</li>
      </ul>
      <label className="block text-gray-700 mt-4">Upload HR Documents</label>
      <input type="file" className="w-full border p-2 rounded" />
    </div>
  );
}

function LearnerManagement() {
  const learners = ["Learner A", "Learner B", "Learner C"];
  const [selected, setSelected] = useState(null);
  const [records, setRecords] = useState({});
  const [form, setForm] = useState({ type: "Strike", note: "", recorder: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selected) return;

    const newRecord = {
      type: form.type,
      note: form.note,
      recorder: form.recorder,
      date: new Date().toLocaleDateString(),
    };

    setRecords((prev) => {
      const learnerRecords = prev[selected] || {
        strikes: [],
        commendations: [],
        meetings: [],
        achievements: [],
        absenteeism: [],
      };

      const updated = { ...learnerRecords };
      if (form.type === "Strike") updated.strikes.push(newRecord);
      if (form.type === "Commendation") updated.commendations.push(newRecord);
      if (form.type === "Meeting") updated.meetings.push(newRecord);
      if (form.type === "Achievement") updated.achievements.push(newRecord);
      if (form.type === "Absenteeism") updated.absenteeism.push(newRecord);

      return { ...prev, [selected]: updated };
    });

    setForm({ type: "Strike", note: "", recorder: "" });
  };

  const handleDelete = (type, index) => {
    setRecords((prev) => {
      const learnerRecords = prev[selected];
      if (!learnerRecords) return prev;
      const updated = { ...learnerRecords, [type]: learnerRecords[type].filter((_, i) => i !== index) };
      return { ...prev, [selected]: updated };
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-green-700 mb-4">Learner Management</h2>

      <label className="block text-gray-700">Upload Class List</label>
      <input type="file" className="w-full border p-2 rounded mb-4" />

      <div className="grid grid-cols-2 gap-4">
        {learners.map((learner) => (
          <button
            key={learner}
            type="button"
            onClick={() => setSelected(learner)}
            className={`border p-2 rounded ${selected === learner ? "bg-green-100" : ""}`}
          >
            {learner}
          </button>
        ))}
      </div>

      {selected && (
        <div className="mt-6 border p-4 rounded bg-green-50">
          <h3 className="font-bold mb-4">{selected} Profile</h3>

          {/* Mini Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full border p-2 rounded"
            >
              <option>Strike</option>
              <option>Commendation</option>
              <option>Meeting</option>
              <option>Achievement</option>
              <option>Absenteeism</option>
            </select>

            <input
              type="text"
              placeholder="Notes"
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              className="w-full border p-2 rounded"
            />

            <input
              type="text"
              placeholder="Recorded by"
              value={form.recorder}
              onChange={(e) => setForm({ ...form, recorder: e.target.value })}
              className="w-full border p-2 rounded"
            />

            <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded">
              Record Entry
            </button>
          </form>

          {/* Records Display with Delete */}
          <div className="space-y-4">
            {["strikes", "commendations", "meetings", "achievements", "absenteeism"].map((type) => (
              <div key={type}>
                <h4 className="font-semibold capitalize">{type}</h4>
                <ul className="list-disc pl-6">
                  {(records[selected]?.[type] || []).map((r, i) => (
                    <li key={i} className="flex justify-between items-center">
                      <span>
                        {r.date} — {r.note} (by {r.recorder})
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDelete(type, i)}
                        className="ml-4 text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function DepartmentalDocuments() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-green-700 mb-4">Departmental Documents</h2>
      <form className="space-y-4">
        <label className="block text-gray-700">Upload CAPS / ATPs / Circulars</label>
        <input type="file" className="w-full border p-2 rounded" />
        <button type="button" className="bg-green-700 text-white px-4 py-2 rounded">Upload</button>
      </form>
    </div>
  );
}

function Reports() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-green-700 mb-4">Reports</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Subject Improvement Plans</li>
        <li>Annual Plans</li>
        <li>Profiling</li>
        <li>Consequence Management</li>
        <li>Subject Performance Reports</li>
      </ul>
      <label className="block text-gray-700 mt-4">Upload Reports</label>
      <input type="file" className="w-full border p-2 rounded" />
    </div>
  );
}

function GoogleCalendar() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-green-700 mb-4">Departmental Calendar</h2>
      <iframe
        src="https://calendar.google.com/calendar/embed?src=YOUR_CALENDAR_ID&ctz=Africa/Johannesburg"
        style={{ border: 0 }}
        width="100%"
        height="600"
        frameBorder="0"
        scrolling="no"
        title="Departmental Calendar"
      ></iframe>
    </div>
  );
}

/* ---------- Dashboards ---------- */

function DepartmentHeadDashboard({ role }) {
  const [activeTab, setActiveTab] = useState("curriculum");

  const tabs = [
    { id: "curriculum", label: "Curriculum Management" },
    { id: "hr", label: "HR Management" },
    { id: "learners", label: "Learner Management" },
    { id: "documents", label: "Departmental Documents" },
    { id: "reports", label: "Reports" },
    { id: "calendar", label: "Google Calendar" },
  ];

  return (
    <section className="p-8">
      <h1 className="text-2xl font-bold text-green-800 mb-6">
        {role} Dashboard
      </h1>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded ${
              activeTab === tab.id
                ? "bg-green-700 text-white"
                : "bg-green-100 text-green-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "curriculum" && <CurriculumManagement />}
      {activeTab === "hr" && <HRManagement />}
      {activeTab === "learners" && <LearnerManagement />}
      {activeTab === "documents" && <DepartmentalDocuments />}
      {activeTab === "reports" && <Reports />}
      {activeTab === "calendar" && <GoogleCalendar />}
    </section>
  );
}

/* ---------- Principal Dashboard ---------- */

function PrincipalDashboard() {
  const people = [
    { id: "deputy", name: "Mrs Ramafalo P.F", dept: "Deputy Principal" },
    { id: "life", name: "Ms Maake M.L", dept: "Life Sciences" },
    { id: "maths", name: "Mr Letseku T.B.P", dept: "Mathematics" },
    { id: "accounting", name: "Mr Letseku M.H", dept: "Accounting" },
    { id: "sepedi", name: "Ms Mokwalakwala M.J", dept: "Sepedi HL" },
    { id: "english", name: "Mr Ramalepe K.Z", dept: "English FAL" },
    { id: "history", name: "Mr Pilusa M.H", dept: "History" },
    { id: "physical", name: "Mr Talakgale M.J", dept: "Physical Sciences" },
  ];
  const [active, setActive] = useState(null);

  return (
    <section className="p-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Principal Dashboard</h1>
      {!active ? (
        <div className="grid grid-cols-2 gap-4">
          {people.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActive(p)}
              className="border p-4 rounded hover:bg-green-100 text-left"
            >
              <span className="font-semibold">{p.name}</span>
              <br />
              <span className="text-gray-600">{p.dept}</span>
            </button>
          ))}
        </div>
      ) : (
        <DepartmentHeadDashboard role={`${active.dept} — ${active.name}`} />
      )}
    </section>
  );
}

/* ---------- Deputy Dashboard ---------- */

function DeputyDashboard() {
  const heads = [
    { id: "life", name: "Ms Maake M.L", dept: "Life Sciences" },
    { id: "maths", name: "Mr Letseku T.B.P", dept: "Mathematics" },
    { id: "accounting", name: "Mr Letseku M.H", dept: "Accounting" },
    { id: "sepedi", name: "Ms Mokwalakwala M.J", dept: "Sepedi HL" },
    { id: "english", name: "Mr Ramalepe K.Z", dept: "English FAL" },
    { id: "history", name: "Mr Pilusa M.H", dept: "History" },
    { id: "physical", name: "Mr Talakgale M.J", dept: "Physical Sciences" },
  ];
  const [active, setActive] = useState(null);

  return (
    <section className="p-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Deputy Principal Dashboard</h1>
      {!active ? (
        <div className="grid grid-cols-2 gap-4">
          {heads.map((h) => (
            <button
              key={h.id}
              type="button"
              onClick={() => setActive(h)}
              className="border p-4 rounded hover:bg-green-100 text-left"
            >
              <span className="font-semibold">{h.name}</span>
              <br />
              <span className="text-gray-600">{h.dept}</span>
            </button>
          ))}
        </div>
      ) : (
        <DepartmentHeadDashboard role={`${active.dept} — ${active.name}`} />
      )}
    </section>
  );
}

/* ---------- Main Dashboard ---------- */

export default function ManagementDashboard() {
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
    }
    router.push("/login");
  };

  return (
    <section className="p-8">
      {role === "Principal" ? (
        <PrincipalDashboard />
      ) : role === "Deputy Principal" ? (
        <DeputyDashboard />
      ) : role && (role.includes("Head") || role.includes("Departmental Head")) ? (
        <DepartmentHeadDashboard role={role} />
      ) : (
        <GoogleCalendar />
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
