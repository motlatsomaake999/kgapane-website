import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { action, lat, lng } = req.body;
  const userId = req.headers["x-user-id"];

  if (!userId || !action) {
    return res.status(400).json({ error: "Missing user or action" });
  }

  try {
    const log = await prisma.clockLog.create({
      data: { userId, action, lat, lng },
    });
    return res.status(200).json({ ok: true, log });
  } catch (err) {
    return res.status(500).json({ error: "Database error" });
  }
}
