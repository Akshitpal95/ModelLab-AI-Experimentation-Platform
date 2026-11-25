
import React, { useMemo } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "./ComparisonChart.css";

const ComparisonChart = ({ experiments = [] }) => {

  // Group experiment records by model and calculate average metrics.
  const modelResults = useMemo(() => {
    const groups = {};

    experiments.forEach((experiment) => {
      const model = experiment.model_name;

      if (!model) return;

      if (!groups[model]) {
        groups[model] = [];
      }

      groups[model].push(experiment);
    });

    return Object.entries(groups).map(([model, records]) => {

      const average = (key) => {
        const values = records
          .map((record) => record[key])
          .filter(
            (value) =>
              typeof value === "number" &&
              Number.isFinite(value)
          );

        if (values.length === 0) return null;

        return values.reduce((sum, value) => sum + value, 0) /
          values.length;
      };

      return {
        model,
        r2_score: average("r2_score"),
        mae: average("mae"),
        rmse: average("rmse"),
      };
    });

  }, [experiments]);


  // Metric chart configuration.
  const metrics = [
    {
      key: "r2_score",
      title: "R² Score",
      description: "Higher values indicate better model performance.",
      color: "#547B63",
      better: "Higher is better",
    },
    {
      key: "mae",
      title: "Mean Absolute Error (MAE)",
      description: "Average absolute difference between actual and predicted values.",
      color: "#A5B9D5",
      better: "Lower is better",
    },
    {
      key: "rmse",
      title: "Root Mean Squared Error (RMSE)",
      description: "Penalizes larger prediction errors more heavily.",
      color: "#D5B77A",
      better: "Lower is better",
    },
  ];


  const formatValue = (value) => {
    if (value === null || value === undefined) return "—";

    return Number(value).toFixed(4);
  };


  return (
    <div className="comparison-chart-card">

      {/* Main Header */}
      <div className="chart-header">
        <div>
          <h3>Model Performance</h3>
          <p>
            Compare actual evaluation metrics across trained models.
          </p>
        </div>
      </div>


      {/* Metric Charts */}
      <div
        className="chart-container"
        style={{
          height: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "28px",
        }}
      >

        {modelResults.length > 0 ? (

          metrics.map((metric) => {

            const chartData = modelResults
              .filter((model) => model[metric.key] !== null)
              .map((model) => ({
                model: model.model,
                value: model[metric.key],
              }));

            return (
              <div
                key={metric.key}
                style={{ width: "100%" }}
              >

                {/* Individual Metric Header */}
                <div style={{ marginBottom: "10px" }}>
                  <h4
                    style={{
                      margin: 0,
                      color: "#35483e",
                      fontSize: "14px",
                      fontWeight: 650,
                    }}
                  >
                    {metric.title}
                  </h4>

                  <p
                    style={{
                      margin: "5px 0 0",
                      color: "#89948d",
                      fontSize: "11px",
                    }}
                  >
                    {metric.description}
                  </p>

                  <span
                    style={{
                      display: "inline-block",
                      marginTop: "6px",
                      color: "#547B63",
                      fontSize: "10px",
                      fontWeight: 600,
                    }}
                  >
                    {metric.better}
                  </span>
                </div>


                {/* Individual Bar Chart */}
                {chartData.length > 0 ? (

                  <div style={{ width: "100%", height: "190px" }}>
                    <ResponsiveContainer width="100%" height="100%">

                      <BarChart
                        data={chartData}
                        margin={{
                          top: 10,
                          right: 15,
                          left: 5,
                          bottom: 5,
                        }}
                      >

                        <CartesianGrid
                          strokeDasharray="3 5"
                          vertical={false}
                          stroke="#E9EDE8"
                        />

                        <XAxis
                          dataKey="model"
                          tick={{ fontSize: 10, fill: "#89948d" }}
                          interval={0}
                        />

                        <YAxis
                          domain={
                            metric.key === "r2_score"
                              ? ["auto", "auto"]
                              : [0, "auto"]
                          }
                          tick={{ fontSize: 10, fill: "#89948d" }}
                          tickFormatter={(value) =>
                            Number(value).toFixed(2)
                          }
                        />

                        <Tooltip
                          formatter={(value) => [
                            formatValue(value),
                            metric.title,
                          ]}
                        />

                        <Bar
                          dataKey="value"
                          name={metric.title}
                          fill={metric.color}
                          radius={[5, 5, 0, 0]}
                          barSize={55}
                        />

                      </BarChart>

                    </ResponsiveContainer>
                  </div>

                ) : (
                  <p style={{ color: "#89948d", fontSize: "12px" }}>
                    No {metric.title} data available.
                  </p>
                )}

              </div>
            );
          })

        ) : (
          <p style={{ textAlign: "center", padding: "40px" }}>
            No experiment data available yet.
          </p>
        )}

      </div>

    </div>
  );
};

export default ComparisonChart;
