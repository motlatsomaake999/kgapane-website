export default function AboutSection() {
  return (
    <section className="bg-white py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        {/* Logo on the top left */}
        <div className="flex justify-center md:justify-start">
          <img
            src="/logo.png" // replace with your actual logo path in /public
            alt="Kgapane High School Logo"
            className="w-96 h-96 object-contain" // 3x bigger than before
          />
        </div>

        {/* About Statement */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold text-green-800 mb-6">
            About Kgapane High School
          </h1>
          <p className="text-gray-700 leading-relaxed mb-4">
            Situated in the vibrant town of <strong>Kgapane, Mopani District, Limpopo</strong>, 
            Kgapane High School is a centre of excellence and opportunity. With an enrolment of 
            <strong> over 1,700 learners</strong> and a dedicated team of <strong>50 academic staff</strong>, 
            we combine scale with personal care,  ensuring every learner receives the support and 
            challenge they need to thrive.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our learners consistently achieve <strong>strong matric results</strong>, positioning 
            Kgapane High School among the leading institutions in the district. Beyond academics, 
            we offer a rich programme of co‑curricular and extra‑curricular activities, nurturing 
            confident leaders, creative thinkers, and resilient achievers.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Choosing Kgapane High School means choosing a future of <strong>discipline, innovation, 
            and success</strong>. We don’t just prepare learners for exams, we prepare them for life.
          </p>
        </div>
      </div>
    </section>
  );
}


