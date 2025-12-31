// src/pages/api/staff.js
export default function handler(req, res) {
  const staff = [
    { id: "T1", name: "Mr Baloyi", role: "Educator", allocation: "Grade 10 Science", cover: "None", leave: ["2025-12-01: Sick Leave"], delegation: ["2025-12-05: Supervised exam"] },
    { id: "T2", name: "Ms Nkuna", role: "Educator", allocation: "Grade 11 Maths", cover: "Mr Baloyi", leave: [], delegation: [] },
  ];
  res.status(200).json({ staff });
}
