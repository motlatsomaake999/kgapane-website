// src/pages/login.js
import { useState } from "react";
import { useRouter } from "next/router";
import { users } from "../data/users"; // make sure this file exists

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    // check credentials against your users array
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // store login state
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", user.role);
      localStorage.setItem("username", user.username); // needed for clock in/out

      // redirect to dashboard
      router.push("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-green-50">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-green-800 mb-6 text-center">
          Login
        </h1>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800"
        >
          Login
        </button>
      </form>
    </section>
  );
}