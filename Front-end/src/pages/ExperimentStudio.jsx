
import React, { useState } from "react";
import {
  FlaskConical,
  Database,
  BrainCircuit,
  Settings2,
  Play,
  Info,
  LoaderCircle,
} from "lucide-react";

import { runExperiment } from "../services/experimentService";
import "./ExperimentStudio.css";

const ExperimentStudio = () => {
  const [selectedModel, setSelectedModel] = useState("Random Forest");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState(null);

  const models = [
    "Linear Regression",
    "Random Forest",
  ];

  const handleRunExperiment = async () => {
    setLoading(true);
    setError("");
    setResults(null);

    try {
      const data = await runExperiment(selectedModel);
      setResults(data);
    } catch (err) {
      setError(err.message || "Failed to run experiment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="experiment-studio">

      {/* Page Heading */}
      <div className="experiment-header">
        <div>
          <span className="section-eyebrow">MODEL WORKSPACE</span>
          <h1>Experiment Studio</h1>
          <p>
            Configure and run machine learning experiments
            on materials science datasets.
          </p>
        </div>

        <div className="experiment-header-icon">
          <FlaskConical size={25} />
        </div>
      </div>

      {/* Dataset Selection */}
      <div className="experiment-section">
        <div className="experiment-section-heading">
          <div className="experiment-section-icon">
            <Database size={19} />
          </div>

          <div>
            <h2>Selected Dataset</h2>
            <p>Materials science experimental dataset.</p>
          </div>
        </div>

        <div className="experiment-select">
          Matbench — Experimental Band Gap
        </div>

        <p className="experiment-selection-count">
          4,604 materials · Target: Experimental band gap (eV)
        </p>
      </div>

      {/* Model Selection */}
      <div className="experiment-section">
        <div className="experiment-section-heading">
          <div className="experiment-section-icon">
            <BrainCircuit size={19} />
          </div>

          <div>
            <h2>Select Model</h2>
            <p>Choose the regression algorithm to train.</p>
          </div>
        </div>

        <div className="experiment-model-grid">
          {models.map((model) => (
            <button
              key={model}
              type="button"
              className={`experiment-model-option ${
                selectedModel === model ? "selected" : ""
              }`}
              onClick={() => {
                setSelectedModel(model);
                setResults(null);
                setError("");
              }}
              disabled={loading}
            >
              <span className="model-check">
                {selectedModel === model ? "✓" : "+"}
              </span>

              <span>{model}</span>
            </button>
          ))}
        </div>

        <p className="experiment-selection-count">
          Selected: {selectedModel}
        </p>
      </div>

      {/* Experiment Settings */}
      <div className="experiment-section">
        <div className="experiment-section-heading">
          <div className="experiment-section-icon">
            <Settings2 size={19} />
          </div>

          <div>
            <h2>Experiment Settings</h2>
            <p>Current evaluation configuration.</p>
          </div>
        </div>

        <div className="experiment-settings-grid">
          <div className="experiment-setting">
            <label>Training / Testing Split</label>
            <strong>80% / 20%</strong>
            <small>3,683 training samples and 921 test samples.</small>
          </div>

          <div className="experiment-setting">
            <label>Random State</label>
            <strong>42</strong>
            <small>Fixed seed for reproducible experiments.</small>
          </div>
        </div>
      </div>

      {/* Information */}
      <div className="experiment-info">
        <Info size={18} />
        <p>
          Model training will run through the FastAPI backend.
          Results will be saved automatically in MongoDB.
        </p>
      </div>

      {/* Run Experiment */}
      <div className="experiment-actions">
        <button
          className="run-experiment-btn"
          onClick={handleRunExperiment}
          disabled={loading}
        >
          {loading ? (
            <>
              <LoaderCircle size={17} className="spin" />
              Training Model...
            </>
          ) : (
            <>
              <Play size={17} />
              Run Experiment
            </>
          )}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="experiment-info" role="alert">
          <Info size={18} />
          <p>{error}</p>
        </div>
      )}

      {/* Results */}
      {results && (
        <div className="experiment-section">

          <div className="experiment-section-heading">
            <div className="experiment-section-icon">
              <BrainCircuit size={19} />
            </div>

            <div>
              <h2>Experiment Results</h2>
              <p>{results.model_name} completed successfully.</p>
            </div>
          </div>

          <div className="experiment-settings-grid">
            <div className="experiment-setting">
              <label>MAE</label>
              <strong>{results.metrics.mae.toFixed(4)}</strong>
            </div>

            <div className="experiment-setting">
              <label>RMSE</label>
              <strong>{results.metrics.rmse.toFixed(4)}</strong>
            </div>

            <div className="experiment-setting">
              <label>R² Score</label>
              <strong>{results.metrics.r2_score.toFixed(4)}</strong>
            </div>

            <div className="experiment-setting">
              <label>Features</label>
              <strong>{results.dataset.feature_count}</strong>
            </div>
          </div>

          <p className="experiment-selection-count">
            Experiment ID: {results.experiment_id}
          </p>

          <h3>Actual vs Predicted</h3>

          <div style={{ overflowX: "auto" }}>
            <table>
              <thead>
                <tr>
                  <th>Actual (eV)</th>
                  <th>Predicted (eV)</th>
                </tr>
              </thead>

              <tbody>
                {results.predictions.map((item, index) => (
                  <tr key={index}>
                    <td>{item.actual.toFixed(4)}</td>
                    <td>{item.predicted.toFixed(4)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {results.feature_importance && (
            <>
              <h3>Top Feature Importance</h3>

              {Object.entries(results.feature_importance).map(
                ([feature, importance]) => (
                  <div key={feature} style={{ marginBottom: "12px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "12px",
                        fontSize: "13px",
                        marginBottom: "5px",
                      }}
                    >
                      <span>{feature}</span>
                      <strong>{importance.toFixed(4)}</strong>
                    </div>

                    <div
                      style={{
                        height: "7px",
                        background: "#e8e8e8",
                        borderRadius: "10px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${Math.min(importance * 100, 100)}%`,
                          background: "#789b83",
                          borderRadius: "10px",
                        }}
                      />
                    </div>
                  </div>
                )
              )}
            </>
          )}

        </div>
      )}

    </section>
  );
};

export default ExperimentStudio;
