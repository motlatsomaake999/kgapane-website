import { useState, useEffect } from "react";

const heroImages = [
  "/hero/hero1.jpg",
  "/hero/hero2.jpg",
  "/hero/hero3.jpg",
  "/hero/hero4.jpg",
  "/hero/hero5.jpg",
  "/hero/hero6.jpg",
  "/hero/hero7.jpg"
];

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000); // rotates every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative h-[350px] md:h-[450px] flex items-center justify-center text-center bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
      style={{ backgroundImage: `url('${heroImages[currentImage]}')` }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Text + CTA */}
      <div className="relative z-10 text-white">
        <h1 className="text-3xl md:text-5xl font-bold">Welcome to Kgapane High</h1>
        <p className="mt-2 text-lg">Empowering learners across Africa</p>

        <div className="mt-4 flex justify-center space-x-4">
          <a
            href="/resources"
            className="px-4 py-2 bg-green-600 rounded text-white hover:bg-green-700 transition"
          >
            Explore Resources
          </a>
          <a
            href="/classroom"
            className="px-4 py-2 bg-white text-green-600 rounded hover:bg-gray-100 transition"
          >
            Join Classroom
          </a>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-3 h-3 rounded-full ${
              currentImage === index ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
