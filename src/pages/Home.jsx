import HeroSection from '../components/HeroSection'
import LocationCard from '../components/LocationCard'
import GuideCard from '../components/GuideCard'
import HotelCard from '../components/HotelCard'
import { locations, guides, hotels } from '../data'

export default function Home(){
  return (
    <div>
      <HeroSection />
      <section className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-sky-700 mb-4">Popular Locations</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {locations.map(l => <LocationCard key={l.id} location={l} />)}
        </div>

        <h2 className="text-2xl font-bold text-sky-700 mt-10 mb-4">Top Guides</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {guides.map(g => <GuideCard key={g.id} guide={g} />)}
        </div>

        <h2 className="text-2xl font-bold text-sky-700 mt-10 mb-4">Recommended Hotels</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {hotels.map(h => <HotelCard key={h.id} hotel={h} />)}
        </div>
      </section>
    </div>
  )
}
