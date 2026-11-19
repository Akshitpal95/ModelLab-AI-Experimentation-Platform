
import React from "react";

import WelcomeBanner from "../components/WelcomeBanner";
import StatCard from "../components/StatCard";
import ComparisonChart from "../components/ComparisonChart";

import { modelComparisonData } from "../data/mockResults";
import RecentExperiments from "../components/RecentExperiments.jsx";

import {
  FlaskConical,
  Trophy,
  Database,
  BrainCircuit,
} from "lucide-react";

import "./Dashboard.css";


const Dashboard = () => {

  // Dashboard statistics
  const stats = [
    {
      id: 1,
      title: "Total Experiments",
      value: "24",
      description: "Across all experiments",
      icon: FlaskConical,
      trend: "+4.2%",
      tone: "green",
    },
    {
      id: 2,
      title: "Best Accuracy",
      value: "96.5%",
      description: "Logistic Regression",
      icon: Trophy,
      trend: "Best result",
      tone: "blue",
    },
    {
      id: 3,
      title: "Datasets Used",
      value: "06",
      description: "Public datasets",
      icon: Database,
      trend: "Available",
      tone: "gold",
    },
    {
      id: 4,
      title: "Models Compared",
      value: "12",
      description: "Model evaluations",
      icon: BrainCircuit,
      trend: "2 types",
      tone: "green",
    },
  ];


  return (
    <section className="dashboard">

      {/* Welcome Section */}
      <WelcomeBanner />


      {/* Statistics Cards */}
      <div className="stats-grid">

        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            {...stat}
          />
        ))}

      </div>


      {/* Model Performance Comparison */}
      <div className="dashboard-chart-section">

        <ComparisonChart
          data={modelComparisonData}
        />

      </div>
      {/* Recent Experiments */}
      <RecentExperiments />
    </section>
  );
};


export default Dashboard;
