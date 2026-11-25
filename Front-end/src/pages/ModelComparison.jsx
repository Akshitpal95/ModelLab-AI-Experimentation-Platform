
import React, { useEffect, useMemo, useState } from "react";
import {
  ChartNoAxesCombined,
  Trophy,
  Target,
  Gauge,
  Activity,
  Database,
  Layers3,
  TrendingUp,
  Info,
  RefreshCw,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { getExperiments } from "../services/experimentService";
import "./ModelComparison.css";

const metrics = [
  { key: "mae", label: "MAE", direction: "lower" },
  { key: "rmse", label: "RMSE", direction: "lower" },
  { key: "r2_score", label: "R² Score", direction: "higher" },
];

const formatMetric = (value) => {
  return Number.isFinite(value) ? value.toFixed(4) : "—";
};

const getMetricValue = (value) => {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const number = Number(value);

  return Number.isFinite(number) ? number : null;
};

const ModelComparison = () => {
  const [historyData, setHistoryData] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState("r2_score");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch actual experiment records from MongoDB through FastAPI
  const fetchExperiments = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getExperiments();

      if (!Array.isArray(data.experiments)) {
        throw new Error("Invalid experiment history response.");
      }

      setHistoryData(data.experiments);
    } catch (err) {
      setError(
        err.message || "Unable to load experiment comparison data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiments();
  }, []);

  // Select the latest experiment for each model
  const models = useMemo(() => {
    const sortedExperiments = [...historyData].sort((a, b) => {
      return (
        new Date(b.created_at || 0).getTime() -
        new Date(a.created_at || 0).getTime()
      );
    });

    const latestModels = new Map();

    sortedExperiments.forEach((experiment) => {
      const modelName = experiment.model_name?.trim();

      if (!modelName || latestModels.has(modelName)) {
        return;
      }

      latestModels.set(modelName, {
        id: experiment._id,
        name: modelName,
        dataset: experiment.dataset_name || "Unknown dataset",
        target: experiment.target_column || "Unknown target",
        date: experiment.created_at,
        featureCount: experiment.feature_count,
        trainSize: experiment.train_size,
        testSize: experiment.test_size,
        randomState: experiment.random_state,

        mae: getMetricValue(experiment.mae),
        rmse: getMetricValue(experiment.rmse),
        r2_score: getMetricValue(experiment.r2_score),
      });
    });

    return Array.from(latestModels.values());
  }, [historyData]);

  // Current selected metric
  const activeMetric = metrics.find(
    (metric) => metric.key === selectedMetric
  );

  // Models with a valid value for the selected metric
  const validModels = models.filter((model) =>
    Number.isFinite(model[selectedMetric])
  );

  // Determine the best model
  const bestModel = validModels.reduce((best, current) => {
    if (!best) return current;

    if (activeMetric.direction === "lower") {
      return current[selectedMetric] < best[selectedMetric]
        ? current
        : best;
    }

    return current[selectedMetric] > best[selectedMetric]
      ? current
      : best;
  }, null);

  // Calculate average metric
  const averageScore =
    validModels.length > 0
      ? validModels.reduce(
          (total, model) => total + model[selectedMetric],
          0
        ) / validModels.length
      : null;

  // Dataset context
  const datasets = [...new Set(models.map((model) => model.dataset))];
  const targets = [...new Set(models.map((model) => model.target))];

  const isComparable =
    datasets.length <= 1 && targets.length <= 1;

  // Main chart data
  const mainChartData = validModels.map((model) => ({
    name: model.name,
    score: model[selectedMetric],
  }));

  // Error metric chart data
  const errorChartData = models
    .filter(
      (model) =>
        Number.isFinite(model.mae) &&
        Number.isFinite(model.rmse)
    )
    .map((model) => ({
      name: model.name,
      MAE: model.mae,
      RMSE: model.rmse,
    }));

  // R² chart data
  const r2ChartData = models
    .filter((model) => Number.isFinite(model.r2_score))
    .map((model) => ({
      name: model.name,
      "R² Score": model.r2_score,
    }));

  // Loading state
  if (loading) {
    return (
      <section className="model-comparison">
        <div className="comparison-note">
          <Info size={17} />
          <p>Loading experiment comparison data from MongoDB...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="model-comparison">
        <div className="comparison-header">
          <div>
            <span className="section-eyebrow">
              ANALYSIS WORKSPACE
            </span>
            <h1>Model Comparison</h1>
            <p>Compare your machine learning experiments.</p>
          </div>
        </div>

        <div className="comparison-note">
          <Info size={17} />
          <p>{error}</p>
        </div>

        <button
          className="metric-selector"
          onClick={fetchExperiments}
        >
          <RefreshCw size={15} />
          Retry loading experiments
        </button>
      </section>
    );
  }

  // Empty state
  if (models.length === 0) {
    return (
      <section className="model-comparison">
        <div className="comparison-header">
          <div>
            <span className="section-eyebrow">
              ANALYSIS WORKSPACE
            </span>
            <h1>Model Comparison</h1>
            <p>
              Compare evaluation results from your machine learning
              experiments.
            </p>
          </div>

          <div className="comparison-header-icon">
            <ChartNoAxesCombined size={25} />
          </div>
        </div>

        <div className="comparison-note">
          <Info size={17} />
          <p>
            No saved experiments found. Run an experiment in
            Experiment Studio to start comparing models.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="model-comparison">

      {/* Page Header */}
      <div className="comparison-header">
        <div>
          <span className="section-eyebrow">
            ANALYSIS WORKSPACE
          </span>

          <h1>Model Comparison</h1>

          <p>
            Compare actual machine learning results and identify
            the strongest performing algorithm.
          </p>
        </div>

        <div className="comparison-header-icon">
          <ChartNoAxesCombined size={25} />
        </div>
      </div>

      {/* Dataset Context */}
      <div className="comparison-context">

        <div className="context-item">
          <span className="context-label">
            <Database size={14} />
            Selected Dataset
          </span>

          <strong>
            {datasets.length === 1
              ? datasets[0]
              : "Multiple Datasets"}
          </strong>

          <small>Materials science dataset</small>
        </div>

        <div className="context-item">
          <span className="context-label">
            <Layers3 size={14} />
            Models Evaluated
          </span>

          <strong>{models.length} Models</strong>

          <small>Latest saved run per algorithm</small>
        </div>

        <div className="context-item">
          <span className="context-label">
            <Activity size={14} />
            Evaluation Metric
          </span>

          <strong>{activeMetric.label}</strong>

          <small>
            {activeMetric.direction === "lower"
              ? "Lower values are better"
              : "Higher values are better"}
          </small>
        </div>

      </div>

      {/* KPI Cards */}
      <div className="comparison-kpi-grid">

        <div className="comparison-kpi">
          <div className="kpi-top">
            <span>Best Model</span>

            <div className="kpi-icon green">
              <Trophy size={18} />
            </div>
          </div>

          <strong className="kpi-metric-name">
            {bestModel ? bestModel.name : "—"}
          </strong>

          <small>
            {bestModel
              ? `${activeMetric.label}: ${formatMetric(
                  bestModel[selectedMetric]
                )}`
              : "No valid metric available"}
          </small>
        </div>

        <div className="comparison-kpi">
          <div className="kpi-top">
            <span>Average Metric</span>

            <div className="kpi-icon blue">
              <Gauge size={18} />
            </div>
          </div>

          <strong>
            {formatMetric(averageScore)}
          </strong>

          <small>Average {activeMetric.label}</small>
        </div>

        <div className="comparison-kpi">
          <div className="kpi-top">
            <span>Models Compared</span>

            <div className="kpi-icon purple">
              <Layers3 size={18} />
            </div>
          </div>

          <strong>{models.length}</strong>

          <small>Unique algorithms</small>
        </div>

        <div className="comparison-kpi">
          <div className="kpi-top">
            <span>Current Metric</span>

            <div className="kpi-icon orange">
              <Target size={18} />
            </div>
          </div>

          <strong className="kpi-metric-name">
            {activeMetric.label}
          </strong>

          <small>
            {activeMetric.direction === "lower"
              ? "Lower is better"
              : "Higher is better"}
          </small>
        </div>

      </div>

      {/* Main Performance Chart */}
      <div className="comparison-panel">

        <div className="panel-heading">
          <div>
            <h2>Model Performance</h2>

            <p>
              Compare actual experiment results using the
              selected evaluation metric.
            </p>
          </div>

          <span className="panel-tag">
            {activeMetric.label}
          </span>
        </div>

        <div className="metric-selector">
          {metrics.map((metric) => (
            <button
              key={metric.key}
              className={
                selectedMetric === metric.key ? "active" : ""
              }
              onClick={() => setSelectedMetric(metric.key)}
            >
              {metric.label}
            </button>
          ))}
        </div>

        <div className="main-chart-container">

          {mainChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mainChartData}
                layout="vertical"
                margin={{
                  top: 8,
                  right: 40,
                  left: 15,
                  bottom: 8,
                }}
                barCategoryGap="30%"
              >
                <CartesianGrid
                  stroke="#edf0eb"
                  horizontal={false}
                  strokeDasharray="3 3"
                />

                <XAxis
                  type="number"
                  domain={["auto", "auto"]}
                  tick={{ fill: "#849087", fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  type="category"
                  dataKey="name"
                  width={145}
                  tick={{ fill: "#526158", fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />

                <Tooltip
                  formatter={(value) => [
                    formatMetric(value),
                    activeMetric.label,
                  ]}
                  contentStyle={{
                    borderRadius: "10px",
                    border: "1px solid #e5ebe4",
                    fontSize: "12px",
                  }}
                />

                <Bar
                  dataKey="score"
                  fill="#73977d"
                  radius={[0, 7, 7, 0]}
                  barSize={25}
                  label={{
                    position: "right",
                    fill: "#40564a",
                    fontSize: 12,
                    formatter: (value) => formatMetric(value),
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p>No valid values for this metric.</p>
          )}

        </div>

        <div className="chart-caption">
          <Info size={15} />

          <span>
            {activeMetric.direction === "lower"
              ? "Lower values indicate better performance."
              : "Higher values indicate better performance."}
          </span>
        </div>

      </div>

      {/* Additional Charts */}
      <div className="comparison-chart-grid">

        {/* MAE and RMSE */}
        <div className="comparison-panel secondary-panel">

          <div className="panel-heading">
            <div>
              <h2>Error Metrics</h2>

              <p>
                Compare MAE and RMSE across trained models.
                Lower values are better.
              </p>
            </div>

            <div className="mini-panel-icon blue">
              <ChartNoAxesCombined size={18} />
            </div>
          </div>

          <div className="secondary-chart-container">

            {errorChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={errorChartData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: -15,
                    bottom: 5,
                  }}
                  barGap={5}
                >
                  <CartesianGrid
                    stroke="#edf0eb"
                    vertical={false}
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#718078", fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                    interval={0}
                  />

                  <YAxis
                    tick={{ fill: "#849087", fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                  />

                  <Tooltip
                    formatter={(value) => formatMetric(value)}
                    contentStyle={{
                      borderRadius: "10px",
                      border: "1px solid #e5ebe4",
                      fontSize: "11px",
                    }}
                  />

                  <Legend
                    wrapperStyle={{
                      fontSize: "11px",
                      paddingTop: "12px",
                    }}
                  />

                  <Bar
                    dataKey="MAE"
                    fill="#72977c"
                    radius={[4, 4, 0, 0]}
                  />

                  <Bar
                    dataKey="RMSE"
                    fill="#7d9fc0"
                    radius={[4, 4, 0, 0]}
                  />

                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p>Error metric data unavailable.</p>
            )}

          </div>
        </div>

        {/* R2 Chart */}
        <div className="comparison-panel secondary-panel">

          <div className="panel-heading">
            <div>
              <h2>R² Score Comparison</h2>

              <p>
                Compare how well each model explains
                the variance in the target variable.
              </p>
            </div>

            <div className="mini-panel-icon green">
              <Activity size={18} />
            </div>
          </div>

          <div className="secondary-chart-container">

            {r2ChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={r2ChartData}
                  margin={{
                    top: 10,
                    right: 15,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid
                    stroke="#edf0eb"
                    vertical={false}
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#718078", fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                    interval={0}
                  />

                  <YAxis
                    domain={["auto", "auto"]}
                    tick={{ fill: "#849087", fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                  />

                  <Tooltip
                    formatter={(value) => formatMetric(value)}
                    contentStyle={{
                      borderRadius: "10px",
                      border: "1px solid #e5ebe4",
                      fontSize: "11px",
                    }}
                  />

                  <Bar
                    dataKey="R² Score"
                    fill="#d5a76c"
                    radius={[5, 5, 0, 0]}
                  />

                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p>R² score data unavailable.</p>
            )}

          </div>
        </div>

      </div>

      {/* Best Model Highlight */}
      {bestModel && (
        <div className="comparison-highlight">

          <div className="highlight-icon">
            <Trophy size={22} />
          </div>

          <div className="highlight-content">

            <span>
              TOP PERFORMER · {activeMetric.label.toUpperCase()}
            </span>

            <h3>{bestModel.name}</h3>

            <p>
              Achieved {formatMetric(bestModel[selectedMetric])}
              {" "}on the selected evaluation metric.
            </p>

          </div>

          <div className="highlight-score">
            <strong>
              {formatMetric(bestModel[selectedMetric])}
            </strong>

            <small>Best result</small>
          </div>

        </div>
      )}

      {/* Detailed Results Table */}
      <div className="comparison-panel">

        <div className="panel-heading">
          <div>
            <h2>Detailed Model Results</h2>

            <p>
              Latest saved experiment for each algorithm.
            </p>
          </div>

          <div className="mini-panel-icon blue">
            <TrendingUp size={18} />
          </div>
        </div>

        <div className="comparison-table-wrapper">

          <table className="comparison-table">

            <thead>
              <tr>
                <th>Model</th>
                <th>Dataset</th>
                <th>MAE</th>
                <th>RMSE</th>
                <th>R² Score</th>
                <th>Experiment ID</th>
              </tr>
            </thead>

            <tbody>
              {models.map((model) => (
                <tr key={model.id}>

                  <td className="table-model-name">
                    {model.name}
                  </td>

                  <td>{model.dataset}</td>

                  <td>{formatMetric(model.mae)}</td>

                  <td>{formatMetric(model.rmse)}</td>

                  <td>{formatMetric(model.r2_score)}</td>

                  <td>
                    EXP-{model.id.slice(-6)}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>

      {/* Comparability Notice */}
      <div className="comparison-note">
        <Info size={17} />

        <p>
          {isComparable
            ? "Results are retrieved from actual saved experiments in MongoDB. The latest experiment for each model is used in this comparison."
            : "Warning: The latest experiments use different datasets or target columns. Their metrics may not be directly comparable. Run both models using the same dataset and target for a fair comparison."}
        </p>
      </div>

    </section>
  );
};

export default ModelComparison;
