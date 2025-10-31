import LocationCard from '../components/LocationCard'
import { locations } from '../data'
export default function Locations(){
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-sky-700 mb-6">Locations</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {locations.map(l => <LocationCard key={l.id} location={l} />)}
      </div>
    </div>
  )
}
