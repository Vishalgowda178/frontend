"use client"

import "./Navbar.css"

const CalendarIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

export default function Navbar({ currentPage, onNavigate }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo" onClick={() => onNavigate("home")}>
          <CalendarIcon />
          <span className="logo-text">TaskScheduler</span>
        </div>

        {/* Navigation Links */}
        <div className="navbar-links">
          <button className={`nav-link ${currentPage === "home" ? "active" : ""}`} onClick={() => onNavigate("home")}>
            Home
          </button>
          <button className={`nav-link ${currentPage === "login" ? "active" : ""}`} onClick={() => onNavigate("login")}>
            Login
          </button>
          <button
            className={`nav-link signup-btn ${currentPage === "signup" ? "active" : ""}`}
            onClick={() => onNavigate("signup")}
          >
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  )
}
