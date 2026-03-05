import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import TicketDetails from './pages/TicketDetails'
import Login from './pages/Login'
import Register from './pages/Register'
import Explore from './pages/Explore'
import Orders from './pages/Orders'
import Profile from './pages/Profile'
import SearchResults from './pages/SearchResults'
import Schedules from './pages/Schedules'
import ScrollToTop from './components/ScrollToTop'
import './App.css'

function App() {
  return (
    <Router shadow-red-500>
      <ScrollToTop />
      <div className="bg-[#fcfcfc] min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ticket/:id" element={<TicketDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/schedules" element={<Schedules />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
