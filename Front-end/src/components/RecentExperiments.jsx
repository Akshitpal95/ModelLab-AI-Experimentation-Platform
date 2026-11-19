
import React from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  MoreHorizontal,
} from "lucide-react";

import "./RecentExperiments.css";

// Temporary mock data.
// Later, these records will come from our Python backend.
const experiments = [
  {
    id: "EXP-024",
    name: "Customer Churn Prediction",
    dataset: "Telco Customer Churn",
    model: "Logistic Regression",
    accuracy: "96.5%",
    date: "18 Nov, 2026",
    status: "Completed",
  },
  {
    id: "EXP-023",
    name: "Iris Classification",
    dataset: "Iris Dataset",
    model: "Decision Tree",
    accuracy: "94.2%",
    date: "17 Nov, 2026",
    status: "Completed",
  },
  {
    id: "EXP-022",
    name: "Wine Quality Analysis",
    dataset: "Wine Quality",
    model: "Logistic Regression",
    accuracy: "89.8%",
    date: "16 Nov, 2026",
    status: "Completed",
  },
  {
    id: "EXP-021",
    name: "Breast Cancer Detection",
    dataset: "Breast Cancer Wisconsin",
    model: "Decision Tree",
    accuracy: "—",
    date: "18 Nov, 2026",
    status: "Running",
  },
];

const RecentExperiments = () => {
  return (
    <section className="recent-experiments">

      {/* Section Header */}
      <div className="recent-header">
        <div>
          <h3>Recent Experiments</h3>
          <p>
            Track your latest model evaluations and results.
          </p>
        </div>

        <button className="view-all-btn">
          View all
          <ArrowUpRight size={15} />
        </button>
      </div>

      {/* Experiments Table */}
      <div className="experiments-table-wrapper">
        <table className="experiments-table">

          <thead>
            <tr>
              <th>Experiment</th>
              <th>Dataset</th>
              <th>Model</th>
              <th>Accuracy</th>
              <th>Last Run</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {experiments.map((experiment) => (
              <tr key={experiment.id}>

                <td>
                  <div className="experiment-name">
                    <span>{experiment.name}</span>
                    <small>{experiment.id}</small>
                  </div>
                </td>

                <td className="dataset-cell">
                  {experiment.dataset}
                </td>

                <td>
                  <span className="model-tag">
                    {experiment.model}
                  </span>
                </td>

                <td className="accuracy-cell">
                  {experiment.accuracy}
                </td>

                <td className="date-cell">
                  {experiment.date}
                </td>

                <td>
                  <span
                    className={`experiment-status ${
                      experiment.status === "Completed"
                        ? "status-completed"
                        : "status-running"
                    }`}
                  >
                    {experiment.status === "Completed" ? (
                      <CheckCircle2 size={13} />
                    ) : (
                      <Clock3 size={13} />
                    )}

                    {experiment.status}
                  </span>
                </td>

                <td>
                  <button
                    className="experiment-more-btn"
                    aria-label={`More options for ${experiment.name}`}
                  >
                    <MoreHorizontal size={19} />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Footer */}
      <div className="recent-footer">
        Showing {experiments.length} recent experiments
      </div>

    </section>
  );
};

export default RecentExperiments;
