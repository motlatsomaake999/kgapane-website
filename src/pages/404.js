import Image from "next/image";

export default function Custom404() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8">
      {/* School Logo */}
      <div className="mb-6">
        <Image
          src="/logo.png" // place your school logo in /public/logo.png
          alt="Kgapane High Logo"
          width={120}
          height={120}
        />
      </div>

      {/* Headline */}
      <h1 className="text-5xl font-bold text-green-600 mb-4">
        Page Not Found
      </h1>

      {/* Motto */}
      <p className="text-lg italic text-gray-300 mb-6">
        "Empowering Learners, Building Futures"
      </p>

      {/* Friendly Message */}
      <p className="text-lg text-gray-400 mb-8 text-center max-w-md">
        The page you’re looking for doesn’t exist or has been moved. 
        Let’s get you back to the right place.
      </p>

      {/* Return Button */}
      <a
        href="/"
        className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition"
      >
        Return to Homepage
      </a>
    </main>
  );
}

