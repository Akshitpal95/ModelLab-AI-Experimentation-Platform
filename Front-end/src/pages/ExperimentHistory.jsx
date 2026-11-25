
import React, { useEffect, useState } from "react";
import { getExperiments } from "../services/experimentService";
import "./ExperimentHistory.css";

const ExperimentHistory = () => {
  const [historyData, setHistoryData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [expandedId, setExpandedId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch experiment history from FastAPI
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getExperiments();

        const formattedExperiments = data.experiments.map((experiment) => ({
          id: experiment._id,
          displayId: `EXP-${experiment._id.slice(-6)}`,
          title: `${experiment.model_name} Experiment`,
          dataset: experiment.dataset_name,
          task: "Regression",
          models: [experiment.model_name],
          date: experiment.created_at
            ? new Date(experiment.created_at).toLocaleString()
            : "Date unavailable",
          status: "Completed",
          description: `Model trained to predict ${experiment.target_column} using ${experiment.feature_count} features.`,
          target: experiment.target_column,
          featureCount: experiment.feature_count,
          trainSize: experiment.train_size,
          testSize: experiment.test_size,
          mae: experiment.mae,
          rmse: experiment.rmse,
          r2Score: experiment.r2_score,
          randomState: experiment.random_state,
          modelParams: experiment.model_params,
        }));

        setHistoryData(formattedExperiments);
      } catch (err) {
        setError(err.message || "Unable to load experiment history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // Search and filter experiments
  const filteredExperiments = historyData.filter((experiment) => {
    const matchesSearch =
      experiment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      experiment.dataset.toLowerCase().includes(searchTerm.toLowerCase()) ||
      experiment.displayId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      experiment.models.some((model) =>
        model.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesFilter =
      selectedFilter === "All" || experiment.task === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  const toggleDetails = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="history-page">

      {/* Page Header */}
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

      {/* Loading */}
      {loading && (
        <div className="history-notice">
          <span className="notice-dot"></span>
          <p>Loading experiment history...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="history-notice">
          <span className="notice-dot"></span>
          <p>{error}</p>
        </div>
      )}

      {/* Search and Filter */}
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
          <option value="Regression">Regression</option>
        </select>
      </div>

      {/* Experiment List */}
      <div className="history-list">
        {!loading && !error && filteredExperiments.length > 0 ? (
          filteredExperiments.map((experiment) => (
            <div className="history-card" key={experiment.id}>

              <div className="history-card-main">
                <div className="history-card-icon">ML</div>

                <div className="history-card-content">
                  <div className="history-title-row">
                    <h3>{experiment.title}</h3>
                    <span className="history-status">
                      {experiment.status}
                    </span>
                  </div>

                  <p className="history-dataset">
                    {experiment.dataset}
                    <span> · </span>
                    {experiment.displayId}
                  </p>

                  <div className="history-meta">
                    <span>{experiment.task}</span>
                    <span>{experiment.date}</span>
                    <span>{experiment.models.length} model</span>
                  </div>
                </div>

                <button
                  className="history-details-button"
                  onClick={() => toggleDetails(experiment.id)}
                >
                  {expandedId === experiment.id
                    ? "Hide details"
                    : "View details"}
                  <span>
                    {expandedId === experiment.id ? "−" : "+"}
                  </span>
                </button>
              </div>

              {/* Expanded Details */}
              {expandedId === experiment.id && (
                <div className="history-expanded">

                  <div>
                    <h4>Experiment objective</h4>
                    <p>{experiment.description}</p>
                  </div>

                  <div>
                    <h4>Algorithm</h4>
                    <div className="history-model-tags">
                      {experiment.models.map((model) => (
                        <span key={model}>{model}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4>Evaluation Metrics</h4>
                    <p>MAE: {experiment.mae.toFixed(4)}</p>
                    <p>RMSE: {experiment.rmse.toFixed(4)}</p>
                    <p>R² Score: {experiment.r2Score.toFixed(4)}</p>
                  </div>

                  <div>
                    <h4>Dataset Configuration</h4>
                    <p>Target: {experiment.target}</p>
                    <p>Features: {experiment.featureCount}</p>
                    <p>Training samples: {experiment.trainSize}</p>
                    <p>Testing samples: {experiment.testSize}</p>
                    <p>Random state: {experiment.randomState}</p>
                  </div>

                  <div>
                    <h4>Model Parameters</h4>
                    <pre style={{ whiteSpace: "pre-wrap", fontSize: "12px" }}>
                      {JSON.stringify(experiment.modelParams, null, 2)}
                    </pre>
                  </div>

                </div>
              )}
            </div>
          ))
        ) : (
          !loading && !error && (
            <div className="history-empty">
              <h3>No experiments found</h3>
              <p>
                Try changing your search term or task type filter.
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ExperimentHistory;
