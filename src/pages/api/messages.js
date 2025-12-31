import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { content, recipientRole } = req.body;
    const senderId = req.headers["x-user-id"];

    if (!senderId || !content || !recipientRole) {
      return res.status(400).json({ error: "Missing fields" });
    }

    try {
      const message = await prisma.message.create({
        data: { senderId, recipientRole, content },
      });
      return res.status(200).json({ ok: true, message });
    } catch (err) {
      return res.status(500).json({ error: "Database error" });
    }
  }

  if (req.method === "GET") {
    const { role } = req.query;
    const messages = await prisma.message.findMany({
      where: { recipientRole: role },
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json({ messages });
  }

  return res.status(405).json({ error: "Method not allowed" });
  // src/pages/api/messages.js
}
