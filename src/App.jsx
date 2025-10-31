import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Locations from './pages/Locations'
import Guides from './pages/Guides'
import Hotels from './pages/Hotels'

export default function App(){
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/hotels" element={<Hotels />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
