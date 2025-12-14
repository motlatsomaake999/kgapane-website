import { useState, useEffect } from "react";

const heroMedia = [
  // 13 images
  "/hero/hero1.png", "/hero/hero2.jpg", "/hero/hero3.jpg", "/hero/hero4.jpg",
  "/hero/hero5.jpg", "/hero/hero6.png", "/hero/hero7.jpg", "/hero/hero8.jpg",
  "/hero/hero9.jpg", "/hero/hero10.png", "/hero/hero11.png", "/hero/hero12.jpg",
  "/hero/hero13.png",

  // 10 videos
  "/hero/hero1.mp4", "/hero/hero2.mp4", "/hero/hero3.mp4", "/hero/hero4.mp4",
  "/hero/hero5.mp4", "/hero/hero6.mp4", "/hero/hero7.mp4", "/hero/hero8.mp4",
  "/hero/hero9.mp4", "/hero/hero10.mp4"
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 2) % heroMedia.length);
    }, 5000); // 5 seconds per slide
    return () => clearInterval(interval);
  }, []);

  const currentPair = [
    heroMedia[currentIndex],
    heroMedia[(currentIndex + 1) % heroMedia.length]
  ];

  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden text-white flex flex-col justify-center">
      <div className="flex w-full h-full gap-4 px-4">
        {currentPair.map((media, idx) => {
          const isVideo = media.endsWith(".mp4");
          return (
            <div
              key={`${media}-${idx}`}
              className="w-1/2 h-full border-4 border-white rounded-xl shadow-xl overflow-hidden flex items-center justify-center bg-black"
            >
              {isVideo ? (
                <video
                  src={media}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const fallback = document.createElement("div");
                    fallback.className = "w-full h-full flex items-center justify-center text-white";
                    fallback.textContent = "Video Missing";
                    e.currentTarget.parentElement.appendChild(fallback);
                  }}
                />
              ) : (
                <img
                  src={media}
                  alt={`Hero media ${idx + 1}`}
                  className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
                  style={{ imageRendering: "auto" }}
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/600x400?text=Image+Missing";
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      {/* Text content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-lg">
          Welcome to Kgapane High School
        </h1>
        <p className="mt-4 text-base sm:text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
          Excellence, equity, and innovation drive us forward.
        </p>
      </div>
    </section>
  );
}