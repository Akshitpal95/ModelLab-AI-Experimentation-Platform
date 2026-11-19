
import React, { useState } from "react";
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
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

import "./ModelComparison.css";

const ModelComparison = () => {
  const [selectedMetric, setSelectedMetric] = useState("accuracy");

  // Temporary sample data.
  // These values will later come from the Python ML backend.
  const models = [
    {
      name: "Logistic Regression",
      accuracy: 96.7,
      precision: 96.2,
      recall: 96.0,
      f1: 96.1,
    },
    {
      name: "Decision Tree",
      accuracy: 93.3,
      precision: 92.8,
      recall: 93.0,
      f1: 92.9,
    },
    {
      name: "Random Forest",
      accuracy: 96.7,
      precision: 96.5,
      recall: 96.4,
      f1: 96.4,
    },
    {
      name: "K-Nearest Neighbors",
      accuracy: 95.0,
      precision: 94.8,
      recall: 94.6,
      f1: 94.7,
    },
  ];

  const metrics = [
    { key: "accuracy", label: "Accuracy" },
    { key: "precision", label: "Precision" },
    { key: "recall", label: "Recall" },
    { key: "f1", label: "F1 Score" },
  ];

  const bestModel = [...models].sort(
    (a, b) => b[selectedMetric] - a[selectedMetric]
  )[0];

  const averageScore =
    models.reduce((total, model) => total + model[selectedMetric], 0) /
    models.length;

  const chartData = models.map((model) => ({
    name: model.name,
    Accuracy: model.accuracy,
    Precision: model.precision,
    Recall: model.recall,
    "F1 Score": model.f1,
  }));

  const metricLabel =
    metrics.find((metric) => metric.key === selectedMetric)?.label;

  return (
    <section className="model-comparison">
      {/* Page Header */}
      <div className="comparison-header">
        <div>
          <span className="section-eyebrow">ANALYSIS WORKSPACE</span>
          <h1>Model Comparison</h1>
          <p>
            Understand model performance, compare evaluation metrics,
            and identify the strongest algorithm.
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
          <strong>Iris Dataset</strong>
          <small>Classification task</small>
        </div>

        <div className="context-item">
          <span className="context-label">
            <Layers3 size={14} />
            Models Evaluated
          </span>
          <strong>{models.length} Models</strong>
          <small>Algorithms in this comparison</small>
        </div>

        <div className="context-item">
          <span className="context-label">
            <Activity size={14} />
            Evaluation Metric
          </span>
          <strong>{metricLabel}</strong>
          <small>Currently selected metric</small>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="comparison-kpi-grid">
        <div className="comparison-kpi">
          <div className="kpi-top">
            <span>Best Model Score</span>
            <div className="kpi-icon green">
              <Trophy size={18} />
            </div>
          </div>
          <strong>{bestModel[selectedMetric].toFixed(1)}%</strong>
          <small>{bestModel.name}</small>
        </div>

        <div className="comparison-kpi">
          <div className="kpi-top">
            <span>Average Score</span>
            <div className="kpi-icon blue">
              <Gauge size={18} />
            </div>
          </div>
          <strong>{averageScore.toFixed(1)}%</strong>
          <small>Across all evaluated models</small>
        </div>

        <div className="comparison-kpi">
          <div className="kpi-top">
            <span>Models Compared</span>
            <div className="kpi-icon purple">
              <Layers3 size={18} />
            </div>
          </div>
          <strong>{models.length}</strong>
          <small>Machine learning algorithms</small>
        </div>

        <div className="comparison-kpi">
          <div className="kpi-top">
            <span>Current Metric</span>
            <div className="kpi-icon orange">
              <Target size={18} />
            </div>
          </div>
          <strong className="kpi-metric-name">{metricLabel}</strong>
          <small>Used for ranking models</small>
        </div>
      </div>

      {/* Main Performance Chart */}
      <div className="comparison-panel">
        <div className="panel-heading">
          <div>
            <h2>Model Performance</h2>
            <p>Compare individual model scores using the selected metric.</p>
          </div>
          <span className="panel-tag">Score · %</span>
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
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={models.map((model) => ({
                name: model.name,
                score: model[selectedMetric],
              }))}
              layout="vertical"
              margin={{ top: 8, right: 35, left: 15, bottom: 8 }}
              barCategoryGap="30%"
            >
              <CartesianGrid
                stroke="#edf0eb"
                horizontal={false}
                strokeDasharray="3 3"
              />

              <XAxis
                type="number"
                domain={[0, 100]}
                tick={{ fill: "#849087", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}%`}
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
                formatter={(value) => [`${value}%`, metricLabel]}
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
                  formatter: (value) => `${value}%`,
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-caption">
          <Info size={15} />
          <span>
            Higher scores indicate better performance for this metric.
          </span>
        </div>
      </div>

      {/* Two Additional Charts */}
      <div className="comparison-chart-grid">
        <div className="comparison-panel secondary-panel">
          <div className="panel-heading">
            <div>
              <h2>Metric Breakdown</h2>
              <p>Compare all evaluation metrics across models.</p>
            </div>
            <div className="mini-panel-icon blue">
              <ChartNoAxesCombined size={18} />
            </div>
          </div>

          <div className="secondary-chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -15, bottom: 5 }}
                barGap={3}
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
                  angle={-12}
                  textAnchor="end"
                  height={65}
                />

                <YAxis
                  domain={[85, 100]}
                  tick={{ fill: "#849087", fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}%`}
                />

                <Tooltip
                  formatter={(value) => `${value}%`}
                  contentStyle={{
                    borderRadius: "10px",
                    border: "1px solid #e5ebe4",
                    fontSize: "11px",
                  }}
                />

                <Legend
                  wrapperStyle={{ fontSize: "11px", paddingTop: "12px" }}
                />

                <Bar dataKey="Accuracy" fill="#72977c" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Precision" fill="#7d9fc0" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Recall" fill="#d5a76c" radius={[4, 4, 0, 0]} />
                <Bar dataKey="F1 Score" fill="#9b8ab8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="comparison-panel secondary-panel">
          <div className="panel-heading">
            <div>
              <h2>Model Performance Profile</h2>
              <p>Visualise the balance between evaluation metrics.</p>
            </div>
            <div className="mini-panel-icon green">
              <Activity size={18} />
            </div>
          </div>

          <div className="secondary-chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                data={metrics.map((metric) => ({
                  metric: metric.label,
                  ...Object.fromEntries(
                    models.map((model) => [
                      model.name,
                      model[metric.key],
                    ])
                  ),
                }))}
                outerRadius="72%"
              >
                <PolarGrid stroke="#e8ede7" />

                <PolarAngleAxis
                  dataKey="metric"
                  tick={{ fill: "#718078", fontSize: 11 }}
                />

                <PolarRadiusAxis
                  angle={30}
                  domain={[85, 100]}
                  tick={{ fill: "#9aa49c", fontSize: 9 }}
                  axisLine={false}
                />

                <Tooltip
                  formatter={(value) => `${value}%`}
                  contentStyle={{
                    borderRadius: "10px",
                    border: "1px solid #e5ebe4",
                    fontSize: "11px",
                  }}
                />

                <Radar
                  name="Logistic Regression"
                  dataKey="Logistic Regression"
                  stroke="#72977c"
                  fill="#72977c"
                  fillOpacity={0.10}
                />

                <Radar
                  name="Decision Tree"
                  dataKey="Decision Tree"
                  stroke="#7d9fc0"
                  fill="#7d9fc0"
                  fillOpacity={0.08}
                />

                <Radar
                  name="Random Forest"
                  dataKey="Random Forest"
                  stroke="#d5a76c"
                  fill="#d5a76c"
                  fillOpacity={0.08}
                />

                <Radar
                  name="K-Nearest Neighbors"
                  dataKey="K-Nearest Neighbors"
                  stroke="#9b8ab8"
                  fill="#9b8ab8"
                  fillOpacity={0.07}
                />

                <Legend
                  wrapperStyle={{ fontSize: "10px", paddingTop: "8px" }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Best Model Highlight */}
      <div className="comparison-highlight">
        <div className="highlight-icon">
          <Trophy size={22} />
        </div>

        <div className="highlight-content">
          <span>TOP PERFORMER · {metricLabel.toUpperCase()}</span>
          <h3>{bestModel.name}</h3>
          <p>
            Achieved {bestModel[selectedMetric].toFixed(1)}% on the selected
            evaluation metric.
          </p>
        </div>

        <div className="highlight-score">
          <strong>{bestModel[selectedMetric].toFixed(1)}%</strong>
          <small>Best score</small>
        </div>
      </div>

      {/* Detailed Metrics Table */}
      <div className="comparison-panel">
        <div className="panel-heading">
          <div>
            <h2>Detailed Model Results</h2>
            <p>Side-by-side comparison of all evaluation metrics.</p>
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
                <th>Accuracy</th>
                <th>Precision</th>
                <th>Recall</th>
                <th>F1 Score</th>
              </tr>
            </thead>

            <tbody>
              {models.map((model) => (
                <tr key={model.name}>
                  <td className="table-model-name">{model.name}</td>
                  <td>{model.accuracy}%</td>
                  <td>{model.precision}%</td>
                  <td>{model.recall}%</td>
                  <td>{model.f1}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sample Data Notice */}
      <div className="comparison-note">
        <Info size={17} />
        <p>
          Demonstration data only: these scores are illustrative and are not
          results from trained models. Actual evaluation results will be
          generated by the Python machine-learning backend.
        </p>
      </div>
    </section>
  );
};

export default ModelComparison;
