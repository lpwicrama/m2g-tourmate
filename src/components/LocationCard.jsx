export default function LocationCard({location}) {
  return (
    <div className="rounded-xl overflow-hidden shadow hover:scale-[1.02] transition">
      <img src={location.image} alt={location.name} className="w-full h-44 object-cover"/>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{location.name}</h3>
        <p className="text-slate-600 text-sm mt-1">{location.description}</p>
      </div>
    </div>
  )
}
