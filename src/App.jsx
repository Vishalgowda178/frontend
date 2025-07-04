"use client"

import { useState } from "react"
import Navbar from "./Navbar"
import Home from "./Home"
import Login from "./Login"
import Signup from "./Signup"
import Dashboard from "./Dashboard"

function App() {
  const [currentPage, setCurrentPage] = useState("home")

  const handleNavigate = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className="app">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {currentPage === "home" && <Home onNavigate={handleNavigate} />}
      {currentPage === "login" && <Login onNavigate={handleNavigate} />}
      {currentPage === "signup" && <Signup onNavigate={handleNavigate} />}
      {currentPage === "dashboard" && <Dashboard onNavigate={handleNavigate} />}
    </div>
  )
}

export default App
