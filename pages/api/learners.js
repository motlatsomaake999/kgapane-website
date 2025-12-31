// src/pages/api/learners.js
export default function handler(req, res) {
  const learners = [
    { id: "L1", name: "John Doe", grade: "10", status: "Active" },
    { id: "L2", name: "Jane Smith", grade: "11", status: "Active" },
    { id: "L3", name: "Michael Khosa", grade: "12", status: "On Leave" },
  ];
  res.status(200).json({ learners });
}
