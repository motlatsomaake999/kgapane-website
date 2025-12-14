import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="bg-green-700 px-6 py-4 shadow">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo + School Name flush left */}
        <Link href="/" className="flex items-center space-x-3 flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Kgapane High School Logo"
            width={64}
            height={64}
            className="object-contain"
          />
          <span className="text-xl font-bold text-white">
            Kgapane High School
          </span>
        </Link>

        {/* Navigation Links fill remaining space */}
        <ul className="flex flex-wrap justify-end space-x-6 font-semibold">
          <li><Link href="/about" className="text-white hover:text-orange-300 transition">About</Link></li>
          <li><Link href="/our-curriculum" className="text-white hover:text-orange-300 transition">Curriculum</Link></li>
          <li><Link href="/our-staff" className="text-white hover:text-orange-300 transition">Our Staff</Link></li>
          <li className="relative group">
            <Link href="/activities" className="text-white hover:text-orange-300 transition">Activities ▾</Link>
          </li>
          <li>
            <Link href="/other-stakeholders" className="text-white hover:text-orange-300 transition">Other Stakeholders</Link>
          </li>
          <li><Link href="/notice-board" className="text-white hover:text-orange-300 transition">Notice Board</Link></li>
          <li><Link href="/contact" className="text-white hover:text-orange-300 transition">Contact</Link></li>
          <li><Link href="/management" className="text-white hover:text-orange-300 transition">Management Workspace</Link></li>
        </ul>
      </div>
    </nav>
  );
}
