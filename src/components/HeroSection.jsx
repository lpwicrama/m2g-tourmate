export default function HeroSection(){
  return (
    <div className="h-[60vh] md:h-[70vh] bg-[url('/assets/hero.png')] bg-cover bg-center flex items-center">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-black/40 p-8 md:p-12 rounded-xl text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold">Discover Sri Lanka — Guides, Hotels & Destinations</h1>
          <p className="mt-4 text-lg md:text-xl text-slate-200">Find trusted local guides and beautiful stays across the island.</p>
          <div className="mt-6">
            <a href="/locations" className="inline-block bg-amber-400 text-slate-900 px-5 py-3 rounded-lg font-semibold shadow-md">Explore Locations</a>
          </div>
        </div>
      </div>
    </div>
  )
}
