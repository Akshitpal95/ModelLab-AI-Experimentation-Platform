
import React, { useState } from "react";
import {
  FlaskConical,
  Database,
  BrainCircuit,
  Settings2,
  Play,
  Info,
} from "lucide-react";

import "./ExperimentStudio.css";

const ExperimentStudio = () => {
  const [selectedDataset, setSelectedDataset] = useState("Iris Dataset");
  const [selectedModels, setSelectedModels] = useState([
    "Logistic Regression",
  ]);
  const [testSize, setTestSize] = useState(20);
  const [randomState, setRandomState] = useState(42);

  const models = [
    "Logistic Regression",
    "Decision Tree",
    "Random Forest",
    "K-Nearest Neighbors",
  ];

  const toggleModel = (model) => {
    setSelectedModels((previous) =>
      previous.includes(model)
        ? previous.filter((item) => item !== model)
        : [...previous, model]
    );
  };

  const handleRunExperiment = () => {
    if (selectedModels.length === 0) {
      alert("Please select at least one model.");
      return;
    }

    alert(
      `Experiment configuration saved!\nDataset: ${selectedDataset}\nModels: ${selectedModels.join(", ")}`
    );
  };

  return (
    <section className="experiment-studio">

      {/* Page Heading */}
      <div className="experiment-header">
        <div>
          <span className="section-eyebrow">MODEL WORKSPACE</span>
          <h1>Experiment Studio</h1>
          <p>
            Configure datasets, select machine learning models,
            and prepare your experiments.
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
            <h2>Select Dataset</h2>
            <p>Choose the dataset you want to experiment with.</p>
          </div>
        </div>

        <select
          className="experiment-select"
          value={selectedDataset}
          onChange={(e) => setSelectedDataset(e.target.value)}
        >
          <option>Iris Dataset</option>
          <option>Titanic Dataset</option>
          <option>Wine Quality</option>
          <option>Breast Cancer</option>
          <option>Diabetes Dataset</option>
          <option>California Housing</option>
        </select>
      </div>

      {/* Model Selection */}
      <div className="experiment-section">
        <div className="experiment-section-heading">
          <div className="experiment-section-icon">
            <BrainCircuit size={19} />
          </div>

          <div>
            <h2>Select Models</h2>
            <p>
              Choose one or more algorithms to compare.
            </p>
          </div>
        </div>

        <div className="experiment-model-grid">
          {models.map((model) => (
            <button
              key={model}
              type="button"
              className={`experiment-model-option ${
                selectedModels.includes(model) ? "selected" : ""
              }`}
              onClick={() => toggleModel(model)}
            >
              <span className="model-check">
                {selectedModels.includes(model) ? "✓" : "+"}
              </span>

              <span>{model}</span>
            </button>
          ))}
        </div>

        <p className="experiment-selection-count">
          {selectedModels.length} model(s) selected
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
            <p>Configure how your models will be evaluated.</p>
          </div>
        </div>

        <div className="experiment-settings-grid">
          <div className="experiment-setting">
            <label htmlFor="test-size">
              Test Size
              <strong>{testSize}%</strong>
            </label>

            <input
              id="test-size"
              type="range"
              min="10"
              max="40"
              step="5"
              value={testSize}
              onChange={(e) => setTestSize(Number(e.target.value))}
            />

            <small>Percentage of data reserved for testing.</small>
          </div>

          <div className="experiment-setting">
            <label htmlFor="random-state">Random State</label>

            <input
              id="random-state"
              type="number"
              min="0"
              value={randomState}
              onChange={(e) => setRandomState(Number(e.target.value))}
            />

            <small>Controls reproducibility of the data split.</small>
          </div>
        </div>
      </div>

      {/* Information */}
      <div className="experiment-info">
        <Info size={18} />
        <p>
          These settings configure your experiment.
          Actual model training will be enabled after connecting
          the Python machine-learning backend.
        </p>
      </div>

      {/* Run Experiment */}
      <div className="experiment-actions">
        <button
          className="run-experiment-btn"
          onClick={handleRunExperiment}
        >
          <Play size={17} />
          Prepare Experiment
        </button>
      </div>

    </section>
  );
};

export default ExperimentStudio;
