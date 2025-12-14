export default function OtherStakeholders() {
  const learnerLeaders = [
    { name: "Learner Leader 1" },
    { name: "Learner Leader 2" },
    { name: "Learner Leader 3" },
  ];

  const sgbMembers = [
    { label: "SGB member", image: "/sgb/member1.jpg" },
    { label: "SGB member", image: "/sgb/member2.jpg" },
    { label: "SGB member", image: "/sgb/member3.jpg" },
    { label: "SGB member", image: "/sgb/member4.jpg" },
    { label: "SGB member", image: "/sgb/member5.jpg" },
  ];

  return (
    <section className="p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-green-800 mb-10 text-center">
        Other Stakeholders
      </h1>

      {/* Learner Leaders */}
      <h2 className="text-2xl font-semibold text-green-700 mb-4">Learner Leaders</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {learnerLeaders.map((leader, i) => (
          <div
            key={i}
            className="border rounded-lg shadow hover:shadow-lg transition p-6 text-center"
          >
            <div className="w-full h-40 bg-gray-200 flex items-center justify-center mb-4 text-gray-500">
              Picture Coming Soon
            </div>
            <p className="text-lg font-medium text-gray-800">{leader.name}</p>
          </div>
        ))}
      </div>

      {/* School Governing Body */}
      <h2 className="text-2xl font-semibold text-green-700 mb-4">School Governing Body (SGB)</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {sgbMembers.map((member, i) => (
          <div
            key={i}
            className="bg-white border rounded-lg shadow hover:shadow-lg transition p-6 flex flex-col items-center"
          >
            <img
              src={member.image}
              alt={`SGB member ${i + 1}`}
              className="w-48 h-64 object-cover rounded-md mb-4 border border-gray-200"
            />
            <p className="text-lg font-medium text-gray-800">{member.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
