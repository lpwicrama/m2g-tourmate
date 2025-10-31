import { Link } from 'react-router-dom'

export default function Navbar(){
  return (
    <nav className="bg-white/80 backdrop-blur sticky top-0 z-40 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-rose-500 rounded-full flex items-center justify-center text-white font-bold">Ceylon</div>
          <div className="text-lg font-semibold text-sky-700">TourMate</div>
        </Link>
        <div className="flex items-center gap-6 text-slate-700">
          <Link to="/locations" className="hover:text-sky-600">Locations</Link>
          <Link to="/guides" className="hover:text-sky-600">Guides</Link>
          <Link to="/hotels" className="hover:text-sky-600">Hotels</Link>
        </div>
      </div>
    </nav>
  )
}
