// src/pages/api/clock-logs.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const logs = await prisma.clockLog.findMany({
        orderBy: { timestamp: "desc" },
      });
      return res.status(200).json({ logs });
    } catch (error) {
      console.error("Error fetching clock logs:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}

