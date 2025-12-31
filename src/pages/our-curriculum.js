import { useState } from "react";
import Link from "next/link";

function AccordionSection({ title, icon, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded mb-4 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-4 py-3 bg-green-700 text-white font-semibold transition-colors hover:bg-green-800"
      >
        <span className="flex items-center space-x-2">
          <span className="text-xl">{icon}</span>
          <span>{title}</span>
        </span>
        <span className="text-xl">{open ? "−" : "+"}</span>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          open ? "max-h-screen p-4 bg-green-50" : "max-h-0"
        } overflow-hidden`}
      >
        {children}
      </div>
    </div>
  );
}

export default function Curriculum() {
  const [isManagement, setIsManagement] = useState(false);

  const handleLogin = () => {
    const code = prompt("Enter management access code:");
    if (code === "MGMT2025") {
      setIsManagement(true);
    } else {
      alert("Invalid code");
    }
  };

  return (
    <section className="p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
        Our Curriculum
      </h1>

      {/* Senior Phase */}
      <AccordionSection title="Senior Phase (Grades 8–9)" icon="📘">
        <h3 className="text-xl font-semibold text-orange-600">Languages</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li><Link href="/docs/caps-sepedi.pdf" className="text-blue-600">Sepedi Home Language</Link></li>
          <li><Link href="/docs/caps-english-fal.pdf" className="text-blue-600">English First Additional Language</Link></li>
        </ul>
        <h3 className="text-xl font-semibold text-orange-600 mt-4">Other Subjects</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li><Link href="/docs/caps-maths.pdf" className="text-blue-600">Mathematics</Link></li>
          <li><Link href="/docs/caps-natural-sciences.pdf" className="text-blue-600">Natural Sciences</Link></li>
          <li><Link href="/docs/caps-social-sciences.pdf" className="text-blue-600">Social Sciences</Link></li>
          <li><Link href="/docs/caps-technology.pdf" className="text-blue-600">Technology</Link></li>
          <li><Link href="/docs/caps-ems.pdf" className="text-blue-600">Economic & Management Sciences</Link></li>
          <li><Link href="/docs/caps-creative-arts.pdf" className="text-blue-600">Creative Arts</Link></li>
          <li><Link href="/docs/caps-life-orientation.pdf" className="text-blue-600">Life Orientation</Link></li>
        </ul>
      </AccordionSection>

      {/* FET Phase */}
      <AccordionSection title="FET Phase (Grades 10–12)" icon="🎓">
        {/* Mathematics Department */}
        <h3 className="text-xl font-semibold text-orange-600">Mathematics Department</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li><Link href="/docs/caps-maths.pdf" className="text-blue-600">Mathematics</Link></li>
          <li><Link href="/docs/caps-maths-lit.pdf" className="text-blue-600">Mathematical Literacy</Link></li>
        </ul>

        {/* Sciences Department */}
        <h3 className="text-xl font-semibold text-orange-600 mt-4">Sciences Department</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li><Link href="/docs/caps-physical-sciences.pdf" className="text-blue-600">Physical Sciences</Link></li>
          <li><Link href="/docs/caps-life-sciences.pdf" className="text-blue-600">Life Sciences</Link></li>
          <li><Link href="/docs/caps-agricultural-sciences.pdf" className="text-blue-600">Agricultural Sciences</Link></li>
        </ul>

        {/* Humanities Department */}
        <h3 className="text-xl font-semibold text-orange-600 mt-4">Humanities Department</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li><Link href="/docs/caps-history.pdf" className="text-blue-600">History</Link></li>
          <li><Link href="/docs/caps-geography.pdf" className="text-blue-600">Geography</Link></li>
          <li><Link href="/docs/caps-life-orientation.pdf" className="text-blue-600">Life Orientation</Link></li>
        </ul>

        {/* Languages Department */}
        <h3 className="text-xl font-semibold text-orange-600 mt-4">Languages Department</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li><Link href="/docs/caps-sepedi.pdf" className="text-blue-600">Sepedi Home Language</Link></li>
          <li><Link href="/docs/caps-english-fal.pdf" className="text-blue-600">English First Additional Language</Link></li>
        </ul>

        {/* Commerce Department */}
        <h3 className="text-xl font-semibold text-orange-600 mt-4">Commerce Department</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li><Link href="/docs/caps-accounting.pdf" className="text-blue-600">Accounting</Link></li>
          <li><Link href="/docs/caps-business-studies.pdf" className="text-blue-600">Business Studies</Link></li>
          <li><Link href="/docs/caps-economics.pdf" className="text-blue-600">Economics</Link></li>
        </ul>
      </AccordionSection>

      {/* Important Documents */}
      <AccordionSection title="Important Documents" icon="📄">
        <ul className="list-disc list-inside text-blue-600 space-y-2">
          <li><Link href="/docs/code-of-conduct.pdf">Code of Conduct</Link></li>
          <li><Link href="/docs/assessment-policy.pdf">Assessment Policy</Link></li>
          <li><Link href="/docs/admission-policy.pdf">Admission Policy</Link></li>
          <li><Link href="/docs/popia-forms.pdf">POPIA Forms</Link></li>
          <li><Link href="/docs/discipline-policy.pdf">Discipline Policy</Link></li>
          <li><Link href="/docs/admission-forms.pdf">Admission Forms</Link></li>
        </ul>
      </AccordionSection>

      {/* Assessment Calendar */}
      <AccordionSection title="Assessment Calendar" icon="📅">
        <a
          href="https://calendar.google.com/calendar/embed?src=YOUR_CALENDAR_LINK"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
        >
          Open Assessment Calendar
        </a>
      </AccordionSection>
    </section>
  );
}
