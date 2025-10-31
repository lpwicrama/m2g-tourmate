import GuideCard from '../components/GuideCard'
import { guides } from '../data'
export default function Guides(){
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-sky-700 mb-6">Guides</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {guides.map(g => <GuideCard key={g.id} guide={g} />)}
      </div>
    </div>
  )
}
