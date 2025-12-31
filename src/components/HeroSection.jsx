import { useState, useEffect } from "react";

const images = [
  "/hero/hero1.png", "/hero/hero2.jpg", "/hero/hero3.jpg", "/hero/hero4.jpg",
  "/hero/hero5.jpg", "/hero/hero6.png", "/hero/hero7.jpg", "/hero/hero8.jpg",
  "/hero/hero9.jpg", "/hero/hero10.png"
];

const videos = [
  "/hero/hero1.mp4", "/hero/hero2.mp4", "/hero/hero3.mp4", "/hero/hero4.mp4",
  "/hero/hero5.mp4", "/hero/hero6.mp4", "/hero/hero7.mp4", "/hero/hero8.mp4",
  "/hero/hero9.mp4", "/hero/hero10.mp4"
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % Math.min(images.length, videos.length));
    }, 6000);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    // Reduced further: hero now only takes half the viewport height
    <section className="h-[50vh] w-full relative flex items-center justify-center px-3 py-2">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />

      {/* Image + Video side by side */}
      <div className="w-full h-full flex gap-3 z-10">
        <div className="w-1/2 h-full border-2 border-white rounded-lg overflow-hidden">
          <img
            src={images[index]}
            alt="Hero"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-1/2 h-full border-2 border-white rounded-lg overflow-hidden">
          <video
            src={videos[index]}
            autoPlay
            muted={muted}
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Text + Controls */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold drop-shadow-lg">
          Welcome to Kgapane High School
        </h1>
        <p className="mt-2 text-xs sm:text-sm md:text-base max-w-xl mx-auto drop-shadow-md">
          Excellence, equity, and innovation drive us forward.
        </p>
        <button
          onClick={() => setMuted(!muted)}
          className="mt-3 px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition text-xs sm:text-sm"
        >
          {muted ? "Unmute Video" : "Mute Video"}
        </button>
      </div>
    </section>
  );
}
