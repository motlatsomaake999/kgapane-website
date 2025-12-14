export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-green-700">
        Welcome to Kgapane High School
      </h1>
      <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-xl">
        Excellence, equity, and innovation drive us forward. Explore our curriculum, meet our staff, and discover how we empower learners across Africa.
      </p>
      <div className="mt-8 flex gap-4">
        <a
          href="/our-curriculum"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          View Curriculum
        </a>
        <a
          href="/our-staff"
          className="border border-green-600 text-green-600 px-6 py-2 rounded hover:bg-green-50 transition"
        >
          Meet Our Staff
        </a>
      </div>
    </main>
  );
}
