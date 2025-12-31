// src/pages/404.js
export default function Custom404() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8">
      <h1 className="text-5xl font-bold text-green-600 mb-6">Oops! Page Not Found</h1>
      <p className="text-lg text-gray-300 mb-8">
        The page you’re looking for doesn’t exist. Let’s get you back on track.
      </p>
      <a
        href="/"
        className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition"
      >
        Return to Homepage
      </a>
    </main>
  );
}
