
import React, { useState } from "react";
import {
  BrainCircuit,
  LayoutDashboard,
  Database,
  FlaskConical,
  ChartNoAxesCombined,
  History,
  Settings,
  CircleHelp,
  MoreHorizontal,
  FileText,
} from "lucide-react";

import "./Sidebar.css";

const Sidebar = ({ activePage, setActivePage }) => {
  const [activeItem, setActiveItem] = useState("Overview");

  const mainLinks = [
    { name: "Overview", icon: LayoutDashboard, page: "dashboard" },
    { name: "Datasets", icon: Database, page: "datasets" },
    { name: "Experiments", icon: FlaskConical, page: "experiments" },
    { name: "Model Comparison", icon: ChartNoAxesCombined, page: "comparison" },
    { name: "History", icon: History, page: "history" },
    { name: "Experiment Report", icon: FileText, page: "report"},
  ];

  const bottomLinks = [
    { name: "Settings", icon: Settings },
    { name: "Help & Support", icon: CircleHelp },
  ];

  const handleNavigation = (item) => {
    setActiveItem(item.name);

    if (item.page) {
      setActivePage(item.page);
    }
  };

  return (
    <aside className="sidebar">

      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon">
          <BrainCircuit size={23} />
        </div>
      </div>

      {/* Main Navigation */}
      <div className="sidebar-navigation">
        <p className="sidebar-label">HOMEPAGE</p>

        <nav className="sidebar-menu">
          {mainLinks.map((item) => {
            const Icon = item.icon;

            const isActive =
              item.page
                ? activePage === item.page
                : activeItem === item.name;

            return (
              <button
                key={item.name}
                className={`sidebar-link ${isActive ? "active" : ""}`}
                onClick={() => handleNavigation(item)}
                title={item.name}
                aria-label={item.name}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon size={21} strokeWidth={1.8} />

                <span className="sidebar-tooltip">
                  {item.name}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Navigation */}
      <div className="sidebar-bottom">
        {bottomLinks.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              className="sidebar-link"
              title={item.name}
              aria-label={item.name}
            >
              <Icon size={20} strokeWidth={1.8} />

              <span className="sidebar-tooltip">
                {item.name}
              </span>
            </button>
          );
        })}

        {/* User Profile */}
        <div className="sidebar-profile">
          <div className="sidebar-avatar">A</div>

          <div className="sidebar-profile-menu">
            <MoreHorizontal size={30} />
          </div>
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;
