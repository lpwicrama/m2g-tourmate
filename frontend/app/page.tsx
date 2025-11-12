import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Explore Beautiful Sri Lanka
          </h1>
          <p className="text-xl mb-8">
            Plan your perfect journey with interactive route planning, 
            expert guides, and comprehensive travel services
          </p>
          <Link
            href="/routes"
            className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition"
          >
            Start Planning Your Route
          </Link>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Services
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link href="/routes" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="text-xl font-bold mb-2">Route Planning</h3>
              <p className="text-gray-600">
                Create custom routes and discover attractions along your journey
              </p>
            </Link>
            
            <Link href="/guides" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">👨‍🏫</div>
              <h3 className="text-xl font-bold mb-2">Tour Guides</h3>
              <p className="text-gray-600">
                Connect with experienced local guides for authentic experiences
              </p>
            </Link>
            
            <Link href="/hotels" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">🏨</div>
              <h3 className="text-xl font-bold mb-2">Hotels</h3>
              <p className="text-gray-600">
                Find the perfect accommodation for your budget and preferences
              </p>
            </Link>
            
            <Link href="/transport" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">🚗</div>
              <h3 className="text-xl font-bold mb-2">Transport</h3>
              <p className="text-gray-600">
                Choose from various transport options for comfortable travel
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
