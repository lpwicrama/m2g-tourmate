import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sri Lanka Travel Guide',
  description: 'Your comprehensive guide to exploring Sri Lanka',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                SL Travel Guide
              </Link>
              
              <div className="flex gap-6">
                <Link href="/routes" className="hover:text-blue-600 transition">
                  Routes
                </Link>
                <Link href="/guides" className="hover:text-blue-600 transition">
                  Guides
                </Link>
                <Link href="/hotels" className="hover:text-blue-600 transition">
                  Hotels
                </Link>
                <Link href="/transport" className="hover:text-blue-600 transition">
                  Transport
                </Link>
              </div>
            </div>
          </div>
        </nav>
        
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
        
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2025 Sri Lanka Travel Guide. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
