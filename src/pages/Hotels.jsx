import HotelCard from '../components/HotelCard'
import { hotels } from '../data'
export default function Hotels(){
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-sky-700 mb-6">Hotels</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {hotels.map(h => <HotelCard key={h.id} hotel={h} />)}
      </div>
    </div>
  )
}
