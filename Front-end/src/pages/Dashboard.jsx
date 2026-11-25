
import React, { useEffect, useState } from "react";

import WelcomeBanner from "../components/WelcomeBanner";
import StatCard from "../components/StatCard";
import ComparisonChart from "../components/ComparisonChart";
import RecentExperiments from "../components/RecentExperiments.jsx";



import { getExperiments } from "../services/experimentService";

import {
  FlaskConical,
  Trophy,
  Database,
  BrainCircuit,
} from "lucide-react";

import "./Dashboard.css";

const Dashboard = () => {
  const [experiments, setExperiments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExperiments = async () => {
      try {
        const data = await getExperiments();

        setExperiments(data.experiments || []);
      } catch (err) {
        console.error("Dashboard API Error:", err);
        setError("Unable to load experiment statistics.");
      } finally {
        setLoading(false);
      }
    };

    fetchExperiments();
  }, []);

  // Calculate dashboard statistics from actual experiment records.
  const bestExperiment = experiments.reduce((best, current) => {
    if (
      typeof current.r2_score !== "number" ||
      !Number.isFinite(current.r2_score)
    ) {
      return best;
    }

    if (!best || current.r2_score > best.r2_score) {
      return current;
    }

    return best;
  }, null);

  const uniqueDatasets = new Set(
    experiments.map((experiment) => experiment.dataset_name)
  );

  const uniqueModels = new Set(
    experiments.map((experiment) => experiment.model_name)
  );

  const stats = [
    {
      id: 1,
      title: "Total Experiments",
      value: loading ? "..." : experiments.length,
      description: "Across all experiments",
      icon: FlaskConical,
      trend: "Saved runs",
      tone: "green",
    },
    {
      id: 2,
      title: "Best R² Score",
      value: loading
        ? "..."
        : bestExperiment
          ? bestExperiment.r2_score.toFixed(4)
          : "—",
      description: bestExperiment
        ? bestExperiment.model_name
        : "No results yet",
      icon: Trophy,
      trend: "Best result",
      tone: "blue",
    },
    {
      id: 3,
      title: "Datasets Used",
      value: loading ? "..." : uniqueDatasets.size,
      description: "Unique datasets",
      icon: Database,
      trend: "From database",
      tone: "gold",
    },
    {
      id: 4,
      title: "Models Trained",
      value: loading ? "..." : uniqueModels.size,
      description: "Unique model types",
      icon: BrainCircuit,
      trend: "Evaluated",
      tone: "green",
    },
  ];

  return (
    <section className="dashboard">

      <WelcomeBanner />

      {error && (
        <p className="dashboard-error">{error}</p>
      )}

      <div className="stats-grid">
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            {...stat}
          />
        ))}
      </div>

      <div className="dashboard-chart-section">
  <ComparisonChart
    experiments={experiments}
  />
</div>

      <RecentExperiments experiments={experiments} />

    </section>
  );
};

export default Dashboard;
