export default function Footer() {
  return (
    <footer className="bg-green-700 text-white mt-12">
      <div className="max-w-6xl mx-auto px-6 py-6 grid md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-semibold">Kgapane High School</h4>
          <p className="text-sm mt-2">Wisdom is a Treasure of All Time.</p>
        </div>
        <div>
          <h4 className="font-semibold">Contact</h4>
          <p className="text-sm mt-2">Gakgapane, 0838</p>
          <p className="text-sm">Tel: 015 123 4567</p>
          <p className="text-sm">Email: info@kgapanehigh.co.za</p>
        </div>
        <div>
          <h4 className="font-semibold">Quick Links</h4>
          <ul className="text-sm mt-2 space-y-1">
            <li><a href="/about" className="hover:underline">About</a></li>
            <li><a href="/our-curriculum" className="hover:underline">Curriculum</a></li>
            <li><a href="/notice-board" className="hover:underline">Notice Board</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="bg-green-800 text-xs text-center py-3">
        © {new Date().getFullYear()} Kgapane High School. All rights reserved.
      </div>
    </footer>
  );
}
