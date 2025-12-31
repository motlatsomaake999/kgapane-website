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

export default function OurStaff() {
  const smt = [
    { name: "Mr. Phosa N.M", role: "Principal" },
    { name: "Mrs. Ramafalo P.F", role: "Deputy Principal" },
    { name: "Mr. Letseku T.B.P", role: "Mathematics Departmental Head" },
    { name: "Mr. Letseku M.H", role: "Accounting Departmental Head" },
    { name: "Ms. Maake M.L", role: "Life Sciences Departmental Head" },
    { name: "Ms. Mokwalakwala M.J", role: "Sepedi HL Departmental Head" },
    { name: "Mr. Pilusa M.S", role: "History Departmental Head" },
    { name: "Mr. Ramalepe K.Z", role: "English FAL Departmental Head" },
    { name: "Mr. Talakgale M.J", role: "Physical Sciences Departmental Head" },
  ];

  const educators = [
    { name: "Baloyi R.", subject: "Mathematics" },
    { name: "Banda E.", subject: "Geography" },
    { name: "Kgatla P.Z.", subject: "History" },
    { name: "Lebea L.D.", subject: "Geography" },
    { name: "Letswalo M.P.", subject: "Life Sciences" },
    { name: "Mabunda N.R.", subject: "Business Studies" },
    { name: "Mafotja P.", subject: "Life Sciences" },
    { name: "Mahlane M.G.", subject: "Sepedi HL" },
    { name: "Mailula M.", subject: "Geography" },
    { name: "Malematja T.", subject: "Mathematical Literacy" },
    { name: "Malemela M.J.", subject: "Mathematics" },
    { name: "Mandíwana P.P.", subject: "Creative Arts" },
    { name: "Mashale J.M.", subject: "Natural Sciences" },
    { name: "Mkhari T.A.", subject: "Physical Sciences" },
    { name: "Modike M.N.", subject: "Life Orientation" },
    { name: "Mohale M.A.L", subject: "Agricultural Sciences" },
    { name: "Ratlabala", subject: "Mathematics" },
    { name: "Mokgalabone M.", subject: "Business Studies" },
    { name: "Molokwane M.M.M.", subject: "Social Sciences" },
    { name: "Motswane M.P.", subject: "English FAL" },
    { name: "Mphahlele M.A.", subject: "Sepedi HL" },
    { name: "Mphekgwane I.M.", subject: "Mathematical Literacy" },
    { name: "Papo A.M.", subject: "Subject pending" },
    { name: "Rabothata M.M.", subject: "Economics" },
    { name: "Rakomane M.P.", subject: "Business Studies" },
    { name: "Ramalepe M.M.", subject: "English FAL" },
    { name: "Ramalepe M.N.", subject: "Sepedi HL" },
    { name: "Ramaselele D.T.", subject: "History" },
    { name: "Ramodike M.P.", subject: "Sepedi HL" },
    { name: "Ramothwala S.", subject: "English FAL" },
    { name: "Rangwato M.T.", subject: "Mathematical Literacy" },
    { name: "Raphadu M.C.", subject: "English FAL" },
    { name: "Rasebotsá S.T.", subject: "Sepedi HL" },
    { name: "Raseluma M.E.", subject: "English FAL" },
    { name: "Selomo D.D.", subject: "Accounting" },
    { name: "Sethole M.V.", subject: "EMS" },
    { name: "Thobakgale S.D.", subject: "Sepedi HL" },
  ];

  const admin = [
    { name: "Ms. Modjadji T", role: "School Administrator" },
    { name: "Mr. Motshekga N", role: "Assistant School Administrator" },
  ];

  const support = [
    { name: "General Assistants", role: "Maintenance & Cleaning" },
    { name: "Groundskeepers", role: "School Grounds" },
    { name: "Cleaners", role: "School Hygiene" },
    { name: "Security Personnel", role: "Safety & Security" },
  ];

  return (
    <section className="p-8 bg-white min-h-screen overflow-y-auto">
      <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
        Our Staff
      </h1>

      {/* SMT */}
      <AccordionSection title="School Management Team (SMT)" icon="🎯">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {smt.map((member, idx) => (
            <div key={idx} className="border rounded-lg shadow-sm p-4 flex flex-col items-center bg-white">
              <div className="w-[180px] h-[180px] bg-green-100 border border-green-200 rounded-md flex items-center justify-center">
                <span className="text-green-700">Photo</span>
              </div>
              <div className="mt-4 text-center">
                <p className="font-semibold text-gray-900">{member.name}</p>
                <p className="text-gray-600">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </AccordionSection>

      {/* Academic Staff */}
      <AccordionSection title="Academic Staff (Educators)" icon="📚">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {educators.map((teacher, idx) => (
            <div key={idx} className="border rounded-lg shadow-sm p-4 flex flex-col items-center bg-white">
              <div className="w-[180px] h-[180px] bg-green-100 border border-green-200 rounded-md flex items-center justify-center">
                <span className="text-green-700">Photo</span>
              </div>
              <div className="mt-4 text-center">
                <p className="font-semibold text-gray-900">{teacher.name}</p>
                <p className="text-gray-600">{teacher.subject}</p>
              </div>
            </div>
          ))}
        </div>
      </AccordionSection>

      {/* Admin Staff */}
      <AccordionSection title="Admin Staff" icon="🗂️">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {admin.map((member, idx) => (
            <div key={idx} className="border rounded-lg shadow-sm p-4 flex flex-col items-center bg-white">
              <div className="w-[180px] h-[180px] bg-green-100 border border-green-200 rounded-md flex items-center justify-center">
                <span className="text-green-700">Photo</span>
              </div>
              <div className="mt-4 text-center">
                <p className="font-semibold text-gray-900">{member.name}</p>
                <p className="text-gray-600">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </AccordionSection>

       {/* Support Staff */}
      <AccordionSection title="Support Staff" icon="🧹">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {support.map((member, idx) => (
            <div
              key={idx}
              className="border rounded-lg shadow-sm p-4 flex flex-col items-center bg-white"
            >
              <div className="w-[180px] h-[180px] bg-green-100 border border-green-200 rounded-md flex items-center justify-center">
                <span className="text-green-700">Photo</span>
              </div>
              <div className="mt-4 text-center">
                <p className="font-semibold text-gray-900">{member.name}</p>
                <p className="text-gray-600">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </AccordionSection>
    </section>
  );
}
