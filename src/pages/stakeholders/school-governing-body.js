export default function SchoolGoverningBody() {
  const sgbMembers = [
    { label: "SGB member", image: "/sgb/member1.jpg" },
    { label: "SGB member", image: "/sgb/member2.jpg" },
    { label: "SGB member", image: "/sgb/member3.jpg" },
    { label: "SGB member", image: "/sgb/member4.jpg" },
    { label: "SGB member", image: "/sgb/member5.jpg" },
  ];

  return (
    <section className="p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
        School Governing Body (SGB)
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
