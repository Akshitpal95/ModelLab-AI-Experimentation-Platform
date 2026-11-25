
import React from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  MoreHorizontal,
} from "lucide-react";

import "./RecentExperiments.css";

const RecentExperiments = ({ experiments = [] }) => {

  // Display only the latest 4 experiments.
  const recentExperiments = experiments.slice(0, 4);

  // Format backend date into a readable date.
  const formatDate = (dateString) => {
    if (!dateString) return "—";

    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

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
              <th>R² Score</th>
              <th>Last Run</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {recentExperiments.length > 0 ? (
              recentExperiments.map((experiment) => (

                <tr key={experiment._id}>

                  <td>
                    <div className="experiment-name">
                      <span>{experiment.model_name}</span>
                      <small>
                        {experiment._id.slice(-8).toUpperCase()}
                      </small>
                    </div>
                  </td>

                  <td className="dataset-cell">
                    {experiment.dataset_name}
                  </td>

                  <td>
                    <span className="model-tag">
                      {experiment.model_name}
                    </span>
                  </td>

                  <td className="accuracy-cell">
                    {typeof experiment.r2_score === "number"
                      ? experiment.r2_score.toFixed(4)
                      : "—"}
                  </td>

                  <td className="date-cell">
                    {formatDate(experiment.created_at)}
                  </td>

                  <td>
                    <span className="experiment-status status-completed">
                      <CheckCircle2 size={13} />
                      Completed
                    </span>
                  </td>

                  <td>
                    <button
                      className="experiment-more-btn"
                      aria-label={`More options for ${experiment.model_name}`}
                    >
                      <MoreHorizontal size={19} />
                    </button>
                  </td>

                </tr>

              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "30px" }}>
                  No experiments found.
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* Footer */}
      <div className="recent-footer">
        Showing {recentExperiments.length} of {experiments.length} experiments
      </div>

    </section>
  );
};

export default RecentExperiments;
