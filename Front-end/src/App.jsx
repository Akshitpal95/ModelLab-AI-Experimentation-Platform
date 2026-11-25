
import { useState } from "react";
import ExperimentStudio from "./pages/ExperimentStudio.jsx";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import DatasetExplorer from "./pages/DatasetExplorer";

import ModelComparison from "./pages/ModelComparison.jsx";

import ExperimentReport from "./pages/ExperimentReport.jsx";

import ExperimentHistory from "./pages/ExperimentHistory.jsx";





function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "datasets":
        return <DatasetExplorer />;

      case "experiments":
        return <ExperimentStudio />;

      case "comparison":
        return <ModelComparison />;  
       
      case "report":
        return <ExperimentReport />; 
        
      case "history":
        return <ExperimentHistory />;  



      case "dashboard":
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="main-content">
        <Navbar />
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
