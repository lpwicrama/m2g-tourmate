import { Rate } from 'antd'
export default function HotelCard({hotel}) {
  return (
    <div className="rounded-xl overflow-hidden shadow hover:shadow-lg transition">
      <img src={hotel.image} alt={hotel.name} className="w-full h-44 object-cover"/>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{hotel.name}</h3>
        <p className="text-slate-600">{hotel.location}</p>
        <div className="mt-2"><Rate disabled defaultValue={Math.round(hotel.rating)} /></div>
      </div>
    </div>
  )
}
