import { useState } from "react";

function AccordionSection({ title, icon, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded mb-4 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-4 py-3 bg-green-700 text-white font-semibold transition hover:bg-green-800"
      >
        <span className="flex items-center space-x-2">
          <span className="text-xl">{icon}</span>
          <span>{title}</span>
        </span>
        <span className="text-xl">{open ? "−" : "+"}</span>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          open ? "max-h-[600px] p-4 bg-green-50 overflow-y-auto" : "max-h-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default function Activities() {
  const coCurricular = [
    { name: "Debate Club", description: "Sharpen critical thinking and public speaking skills." },
    { name: "Science Olympiad", description: "Hands-on experiments and competitions in STEM fields." },
    { name: "Math Circle", description: "Problem-solving sessions and contests for learners." },
    { name: "Cultural Society", description: "Celebrate heritage through language, drama, and arts." },
    { name: "Coding & Robotics", description: "Learn programming, robotics, and problem-solving for the digital age." },
    { name: "Reading Club", description: "Encourage a love for books and improve comprehension skills." },
    { name: "Poetry Society", description: "Creative writing and performance of poetry." },
    { name: "Public Speaking", description: "Develop confidence and communication skills through speeches and presentations." },
  ];

  const extraCurricular = [
    { name: "Soccer Team", description: "Competitive training and matches across the district." },
    { name: "Netball Team", description: "Teamwork and tournaments for all grades." },
    { name: "Choir", description: "Music, harmony, and performances at school events." },
    { name: "Dance Crew", description: "Creative expression through modern and traditional dance." },
    { name: "Community Service", description: "Volunteer projects and outreach programs." },
  ];

  return (
    <section className="p-8 bg-white min-h-screen overflow-y-auto">
      <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
        Activities
      </h1>

      {/* Co-Curricular */}
      <AccordionSection title="Co-Curricular Activities" icon="📘">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coCurricular.map((activity, idx) => (
            <div
              key={idx}
              className="border rounded-lg shadow-sm p-4 flex flex-col items-center bg-white"
            >
              <div className="w-[180px] h-[180px] bg-green-100 border border-green-200 rounded-md flex items-center justify-center">
                <span className="text-green-700">Icon</span>
              </div>
              <div className="mt-4 text-center">
                <p className="font-semibold text-gray-900">{activity.name}</p>
                <p className="text-gray-600">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </AccordionSection>

      {/* Extra-Curricular */}
      <AccordionSection title="Extra-Curricular Activities" icon="⚽">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {extraCurricular.map((activity, idx) => (
            <div
              key={idx}
              className="border rounded-lg shadow-sm p-4 flex flex-col items-center bg-white"
            >
              <div className="w-[180px] h-[180px] bg-green-100 border border-green-200 rounded-md flex items-center justify-center">
                <span className="text-green-700">Icon</span>
              </div>
              <div className="mt-4 text-center">
                <p className="font-semibold text-gray-900">{activity.name}</p>
                <p className="text-gray-600">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </AccordionSection>
    </section>
  );
}
