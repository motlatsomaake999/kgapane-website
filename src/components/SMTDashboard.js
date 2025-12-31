import { useState, useEffect } from "react";
import EducatorDashboard from "./EducatorDashboard";
import GoogleCalendar from "./GoogleCalendar";

export default function SMTDashboard({ role }) {
  const [openSection, setOpenSection] = useState(null);
  const [openClass, setOpenClass] = useState(null);
  const [openLearner, setOpenLearner] = useState(null);
  const [records, setRecords] = useState({});

  // HR & Curriculum records
  const [hrRecords, setHrRecords] = useState({});
  const [curriculumRecords, setCurriculumRecords] = useState({});

  // Timetable state
  const [allocations, setAllocations] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [allocationForm, setAllocationForm] = useState({ educator: "", subject: "", grade: "" });
  const [timetableForm, setTimetableForm] = useState({ day: "", period: "", subject: "", educator: "" });

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  // Generate 5 classes with 10 learners each
  const classes = Array.from({ length: 5 }, (_, i) => ({
    id: `class${i + 1}`,
    name: `Class ${i + 1}`,
    learners: Array.from({ length: 10 }, (_, j) => ({
      id: `class${i + 1}-learner${j + 1}`,
      name: `Learner ${j + 1}`,
    })),
  }));

  // Fetch existing records from API
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await fetch("/api/learners");
        const data = await res.json();
        setRecords(data.records || {});
      } catch (err) {
        console.error("Error fetching learner records:", err);
      }
    };
    fetchRecords();
  }, []);

  // Record incident via API
  const recordIncident = async (learnerId, type, note, file) => {
    const formData = new FormData();
    formData.append("learnerId", learnerId);
    formData.append("type", type);
    formData.append("note", note);
    formData.append("reporter", role);
    if (file) formData.append("file", file);

    try {
      const res = await fetch("/api/learners", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setRecords((prev) => ({
          ...prev,
          [learnerId]: {
            ...prev[learnerId],
            [type]: [
              ...(prev[learnerId]?.[type] || []),
              {
                note,
                timestamp: new Date().toLocaleString(),
                reporter: role,
                fileName: file?.name || null,
              },
            ],
          },
        }));
      } else {
        console.error("Error saving record:", data.error);
      }
    } catch (err) {
      console.error("Error posting record:", err);
    }
  };

  // HR & Curriculum record handlers
  const handleHrSubmit = (item, note, file) => {
    setHrRecords((prev) => ({
      ...prev,
      [item]: [
        ...(prev[item] || []),
        {
          note,
          timestamp: new Date().toLocaleString(),
          reporter: role,
          fileName: file?.name || null,
        },
      ],
    }));
  };

  const handleCurriculumSubmit = (item, note, file) => {
    setCurriculumRecords((prev) => ({
      ...prev,
      [item]: [
        ...(prev[item] || []),
        {
          note,
          timestamp: new Date().toLocaleString(),
          reporter: role,
          fileName: file?.name || null,
        },
      ],
    }));
  };

  // Allocation + Timetable handlers
  const handleAllocationSubmit = (e) => {
    e.preventDefault();
    setAllocations([...allocations, allocationForm]);
    setAllocationForm({ educator: "", subject: "", grade: "" });
  };

  const handleTimetableSubmit = (e) => {
    e.preventDefault();
    const conflict = timetable.find(
      (t) =>
        t.day === timetableForm.day &&
        t.period === timetableForm.period &&
        t.educator === timetableForm.educator
    );
    if (conflict) {
      alert(`Conflict: ${timetableForm.educator} is already booked for ${timetableForm.day} period ${timetableForm.period}`);
      return;
    }
    setTimetable([...timetable, timetableForm]);
    setTimetableForm({ day: "", period: "", subject: "", educator: "" });
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    const html = `
      <html>
        <head>
          <title>Timetable</title>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #333; padding: 8px; text-align: left; }
            th { background: #e2e8f0; }
          </style>
        </head>
        <body>
          <h2>Life Sciences Timetable — Departmental Head</h2>
          <table>
            <thead>
              <tr>
                <th>Day</th>
                <th>Period</th>
                <th>Subject</th>
                <th>Educator</th>
              </tr>
            </thead>
            <tbody>
              ${timetable
                .map(
                  (t) =>
                    `<tr><td>${t.day}</td><td>${t.period}</td><td>${t.subject}</td><td>${t.educator}</td></tr>`
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <section className="p-8">
      <h1 className="text-2xl font-bold text-green-800 mb-6">{role} Dashboard</h1>

      {/* 🔍 Debug line */}
      <p className="text-red-600 font-mono mb-4">Debug: Role is {role}</p>

      {/* Learner Management */}
      {/* ... same as before ... */}

      {/* HR Management */}
      <div className="border rounded mb-4">
        <button
          onClick={() => toggleSection("hr")}
          className="w-full text-left p-4 bg-green-100 font-semibold"
        >
          HR Management
        </button>
        {openSection === "hr" && (
          <div className="p-4 space-y-4">
            {["Educators List", "Allocations", "Cover Arrangements", "Leave Records", "Delegations"].map((item) => (
              <div key={item} className="border rounded p-2">
                <h3 className="font-semibold">{item}</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const note = e.target.elements.note.value;
                    const file = e.target.elements.file.files[0];
                    handleHrSubmit(item, note, file);
                    e.target.reset();
                  }}
                >
                  <input type="text" name="note" placeholder={`Record ${item} note`} className="border p-1 mr-2" />
                  <input type="file" name="file" className="mr-2" />
                  <button type="submit" className="bg-green-700 text-white px-2 py-1 rounded">Save</button>
                </form>
                <ul className="list-disc pl-6 mt-2">
                  {(hrRecords[item] || []).map((rec, idx) => (
                    <li key={idx}>
                      {rec.timestamp}: {rec.note} (by {rec.reporter})
                      {rec.fileName && <span className="ml-2 text-sm text-gray-600">[Evidence: {rec.fileName}]</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

          {/* Curriculum Management */}
      <div className="border rounded mb-4">
        <button
          onClick={() => toggleSection("curriculum")}
          className="w-full text-left p-4 bg-green-100 font-semibold"
        >
          Curriculum Management
        </button>
        {openSection === "curriculum" && (
          <div className="p-4 space-y-4">
            {[
              "Class Visits",
              "Professional Development",
              "Audit of Written Work",
              "Pre‑Moderation",
              "Post‑Moderation",
            ].map((item) => (
              <div key={item} className="border rounded p-2">
                <h3 className="font-semibold">{item}</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const note = e.target.elements.note.value;
                    const file = e.target.elements.file.files[0];
                    handleCurriculumSubmit(item, note, file);
                    e.target.reset();
                  }}
                >
                  <input
                    type="text"
                    name="note"
                    placeholder={`Record ${item} note`}
                    className="border p-1 mr-2"
                  />
                  <input type="file" name="file" className="mr-2" />
                  <button
                    type="submit"
                    className="bg-green-700 text-white px-2 py-1 rounded"
                  >
                    Save
                  </button>
                </form>
                <ul className="list-disc pl-6 mt-2">
                  {(curriculumRecords[item] || []).map((rec, idx) => (
                    <li key={idx}>
                      {rec.timestamp}: {rec.note} (by {rec.reporter})
                      {rec.fileName && (
                        <span className="ml-2 text-sm text-gray-600">
                          [Evidence: {rec.fileName}]
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Departmental Documents */}
      <div className="border rounded mb-4">
        <button
          onClick={() => toggleSection("documents")}
          className="w-full text-left p-4 bg-green-100 font-semibold"
        >
          Departmental Documents
        </button>
        {openSection === "documents" && (
          <div className="p-4 space-y-4">
            <form>
              <input
                type="text"
                placeholder="Document Title"
                className="border p-2 mr-2"
              />
              <input type="file" className="mr-2" />
              <button
                type="submit"
                className="bg-green-700 text-white px-4 py-2 rounded"
              >
                Upload
              </button>
            </form>
            <ul className="list-disc pl-6 mt-4">
              <li>Departmental Plan — 14 Dec (by Principal)</li>
            </ul>
          </div>
        )}
      </div>

      {/* Teacher Duties */}
      <div className="border rounded mb-4">
        <button
          onClick={() => toggleSection("duties")}
          className="w-full text-left p-4 bg-green-100 font-semibold"
        >
          Teacher Duties
        </button>
        {openSection === "duties" && (
          <div className="p-4 space-y-4">
            <EducatorDashboard role={role} />
            <GoogleCalendar title="Teacher Tasks Calendar" />
          </div>
        )}
      </div>

      {/* Timetable Management — ONLY for Life Sciences Departmental Head */}
      {role === "Life Sciences Departmental Head" && (
        <div className="border rounded mb-4">
          <button
            onClick={() => toggleSection("timetable")}
            className="w-full text-left p-4 bg-green-100 font-semibold"
          >
            Timetable Management
          </button>
          {openSection === "timetable" && (
            <div className="p-4 space-y-6">
              {/* Allocation Form */}
              <form onSubmit={handleAllocationSubmit} className="space-y-4 mb-6">
                <input
                  type="text"
                  placeholder="Educator"
                  value={allocationForm.educator}
                  onChange={(e) =>
                    setAllocationForm({ ...allocationForm, educator: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Subject"
                  value={allocationForm.subject}
                  onChange={(e) =>
                    setAllocationForm({ ...allocationForm, subject: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Grade"
                  value={allocationForm.grade}
                  onChange={(e) =>
                    setAllocationForm({ ...allocationForm, grade: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
                <button
                  type="submit"
                  className="bg-green-700 text-white px-4 py-2 rounded"
                >
                  Save Allocation
                </button>
              </form>

              <ul className="list-disc pl-6 mb-6">
                {allocations.map((a, i) => (
                  <li key={i}>
                    {a.educator} → {a.subject} (Grade {a.grade})
                  </li>
                ))}
              </ul>

              {/* Timetable Form */}
              <form onSubmit={handleTimetableSubmit} className="space-y-4 mb-6">
                <input
                  type="text"
                  placeholder="Day"
                  value={timetableForm.day}
                  onChange={(e) =>
                    setTimetableForm({ ...timetableForm, day: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Period"
                  value={timetableForm.period}
                  onChange={(e) =>
                    setTimetableForm({ ...timetableForm, period: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Subject"
                  value={timetableForm.subject}
                  onChange={(e) =>
                    setTimetableForm({ ...timetableForm, subject: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Educator"
                  value={timetableForm.educator}
                  onChange={(e) =>
                    setTimetableForm({ ...timetableForm, educator: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
                <button
                  type="submit"
                  className="bg-green-700 text-white px-4 py-2 rounded"
                >
                  Add to Timetable
                </button>
              </form>

              {/* Timetable Display */}
              <table className="w-full border">
                <thead>
                  <tr className="bg-green-100">
                    <th className="border p-2">Day</th>
                    <th className="border p-2">Period</th>
                    <th className="border p-2">Subject</th>
                    <th className="border p-2">Educator</th>
                  </tr>
                </thead>
                <tbody>
                  {timetable.map((t, i) => (
                    <tr key={i}>
                      <td className="border p-2">{t.day}</td>
                      <td className="border p-2">{t.period}</td>
                      <td className="border p-2">{t.subject}</td>
                      <td className="border p-2">{t.educator}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Export Options */}
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => {
                    const blob = new Blob([JSON.stringify(timetable, null, 2)], {
                      type: "application/json",
                    });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "timetable.json";
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Export JSON
                </button>

                <button
                  onClick={() => {
                    let csv = "Day,Period,Subject,Educator\n";
                    timetable.forEach((t) => {
                      csv += `${t.day},${t.period},${t.subject},${t.educator}\n`;
                    });
                    const blob = new Blob([csv], { type: "text/csv" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "timetable.csv";
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Export CSV
                </button>

                                <button
                  onClick={handlePrint}
                  className="bg-purple-600 text-white px-4 py-2 rounded"
                >
                  Print Timetable
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
