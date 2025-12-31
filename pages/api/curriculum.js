// src/pages/api/curriculum.js
export default function handler(req, res) {
  const curriculum = [
    { id: "C1", type: "Class Visit", notes: "Observed Grade 10 lesson", date: "2025-12-01", file: null },
    { id: "C2", type: "Professional Development", notes: "Workshop on PBL", date: "2025-12-02", file: null },
    { id: "C3", type: "Moderation", notes: "Pre-moderation of Grade 11 task", date: "2025-12-03", file: "/uploads/moderation.pdf" },
  ];
  res.status(200).json({ curriculum });
}
