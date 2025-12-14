import Image from "next/image";

export default function PrincipalsWelcome() {
  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">
        Principal's Welcome
      </h1>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Principal's Picture */}
        <div className="flex justify-center">
          <Image
            src="/principal.jpg"   // 👉 Add your principal's photo in public/principal.jpg
            alt="Principal of Kgapane High School"
            width={350}
            height={450}
            className="rounded-lg shadow-md"
          />
        </div>

        {/* Welcome Text */}
        <div>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            It is my privilege to extend a warm welcome to all learners, parents,
            staff, and visitors of Kgapane High School. Our institution is founded
            on the belief that wisdom is a treasure of enduring value, and we remain
            steadfast in our commitment to academic excellence, integrity, and service.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            At Kgapane High School, we strive to cultivate disciplined, resilient,
            and responsible young people who are prepared to contribute meaningfully
            to society. I invite you to engage with our programs, support our vision,
            and join us in building a future defined by knowledge, leadership, and purpose.
          </p>
        </div>
      </div>
    </main>
  );
}
