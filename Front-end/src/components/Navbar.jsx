
import React from "react";
import { Search, Bell, ChevronDown } from "lucide-react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">

      {/* Left section */}
      <div className="navbar-left">
        <div>
          <h2>Model Labs</h2>
          <p>Explore Models. Discover Intelligence.</p>
        </div>
      </div>

      {/* Right section */}
      <div className="navbar-right">

        {/* Search */}
        <div className="navbar-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search experiments..."
          />
          <span className="search-shortcut">⌕</span>
        </div>

        {/* Notifications */}
        <button className="notification-btn" aria-label="Notifications">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>

        {/* Profile */}
        <button className="profile-btn">
          <div className="profile-avatar">A</div>
          <div className="profile-info">
            <span className="profile-name">Abhi</span>
            <span className="profile-role">Researcher</span>
          </div>
          <ChevronDown size={16} />
        </button>

      </div>
    </header>
  );
};

export default Navbar;
