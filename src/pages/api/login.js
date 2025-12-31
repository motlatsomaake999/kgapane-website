// src/pages/api/login.js
import { users } from "../../data/users.js";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, password } = req.body;

  // Find user by username
  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  // Compare entered password with stored hash
  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  // Success → return user info (you can set a cookie/session here)
  return res.status(200).json({
    ok: true,
    username: user.username,
    role: user.role,
    subject: user.subject || null,
    message: "Login successful",
  });
}
