import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import TicketDetails from './pages/TicketDetails'
import Login from './pages/Login'
import Register from './pages/Register'
import Explore from './pages/Explore'
import Orders from './pages/Orders'
import Profile from './pages/Profile'
import './App.css'

function App() {
  return (
    <Router shadow-red-500>
      <div className="bg-[#fcfcfc] min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ticket/:id" element={<TicketDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
