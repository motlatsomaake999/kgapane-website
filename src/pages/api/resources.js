import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, description, fileUrl, subject, grade } = req.body;
    const userId = req.headers["x-user-id"];

    if (!userId || !fileUrl) {
      return res.status(400).json({ error: "Missing user or file" });
    }

    try {
      const resource = await prisma.resource.create({
        data: { title, description, fileUrl, subject, grade, uploadedBy: userId },
      });
      return res.status(200).json({ ok: true, resource });
    } catch (err) {
      return res.status(500).json({ error: "Database error" });
    }
  }

  if (req.method === "GET") {
    const resources = await prisma.resource.findMany({ orderBy: { createdAt: "desc" } });
    return res.status(200).json({ resources });
  }

  return res.status(405).json({ error: "Method not allowed" });
  // src/pages/api/resources.js
}
