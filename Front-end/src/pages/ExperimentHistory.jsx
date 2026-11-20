
import React, { useState } from "react";
import "./ExperimentHistory.css";

const historyData = [
  {
    id: "EXP-001",
    title: "Iris Classification Experiment",
    dataset: "Iris Dataset",
    task: "Classification",
    models: ["Logistic Regression", "Decision Tree"],
    date: "19 Nov 2026",
    status: "Demo",
    description:
      "A sample experiment exploring how different classification algorithms can be used to classify iris flower species.",
  },
  {
    id: "EXP-002",
    title: "Titanic Survival Prediction",
    dataset: "Titanic Dataset",
    task: "Classification",
    models: ["Random Forest", "Logistic Regression"],
    date: "18 Nov 2026",
    status: "Demo",
    description:
      "A sample experiment exploring passenger information as features for a survival prediction task.",
  },
  {
    id: "EXP-003",
    title: "Wine Quality Analysis",
    dataset: "Wine Quality",
    task: "Classification",
    models: ["Decision Tree", "K-Nearest Neighbors"],
    date: "17 Nov 2026",
    status: "Demo",
    description:
      "A sample experiment demonstrating how machine learning models can be applied to wine quality data.",
  },
  {
    id: "EXP-004",
    title: "Breast Cancer Classification",
    dataset: "Breast Cancer Dataset",
    task: "Classification",
    models: ["Logistic Regression", "Random Forest"],
    date: "16 Nov 2026",
    status: "Demo",
    description:
      "A sample experiment showing a possible classification workflow using diagnostic dataset features.",
  },
];

const ExperimentHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [expandedId, setExpandedId] = useState(null);

  const filteredExperiments = historyData.filter((experiment) => {
    const matchesSearch =
      experiment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      experiment.dataset.toLowerCase().includes(searchTerm.toLowerCase()) ||
      experiment.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      selectedFilter === "All" || experiment.task === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  const toggleDetails = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="history-page">
      <div className="history-header">
        <div>
          <p className="history-eyebrow">WORKSPACE / EXPERIMENTS</p>
          <h1>Experiment History</h1>
          <p className="history-subtitle">
            Keep track of your machine learning experiments and configurations.
          </p>
        </div>

        <div className="history-total">
          <span>Total records</span>
          <strong>{historyData.length}</strong>
        </div>
      </div>

      <div className="history-notice">
        <span className="notice-dot"></span>
        <p>
          These are sample history records for interface demonstration.
          Actual experiment history will appear here after backend integration.
        </p>
      </div>

      <div className="history-toolbar">
        <div className="history-search">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Search experiments, datasets or IDs..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <select
          value={selectedFilter}
          onChange={(event) => setSelectedFilter(event.target.value)}
          className="history-filter"
        >
          <option value="All">All task types</option>
          <option value="Classification">Classification</option>
          <option value="Regression">Regression</option>
        </select>
      </div>

      <div className="history-list">
        {filteredExperiments.length > 0 ? (
          filteredExperiments.map((experiment) => (
            <div className="history-card" key={experiment.id}>
              <div className="history-card-main">
                <div className="history-card-icon">ML</div>

                <div className="history-card-content">
                  <div className="history-title-row">
                    <h3>{experiment.title}</h3>
                    <span className="history-status">{experiment.status}</span>
                  </div>

                  <p className="history-dataset">
                    {experiment.dataset} <span>·</span> {experiment.id}
                  </p>

                  <div className="history-meta">
                    <span>{experiment.task}</span>
                    <span>{experiment.date}</span>
                    <span>{experiment.models.length} models</span>
                  </div>
                </div>

                <button
                  className="history-details-button"
                  onClick={() => toggleDetails(experiment.id)}
                >
                  {expandedId === experiment.id ? "Hide details" : "View details"}
                  <span>{expandedId === experiment.id ? "−" : "+"}</span>
                </button>
              </div>

              {expandedId === experiment.id && (
                <div className="history-expanded">
                  <div>
                    <h4>Experiment objective</h4>
                    <p>{experiment.description}</p>
                  </div>

                  <div>
                    <h4>Algorithms selected</h4>
                    <div className="history-model-tags">
                      {experiment.models.map((model) => (
                        <span key={model}>{model}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="history-empty">
            <h3>No experiments found</h3>
            <p>Try changing your search term or task type filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperimentHistory;
