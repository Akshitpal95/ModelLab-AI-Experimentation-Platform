
import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import "./ComparisonChart.css";

const ComparisonChart = ({ data }) => {
  return (
    <div className="comparison-chart-card">

      <div className="chart-header">
        <div>
          <h3>Model Performance</h3>
          <p>Compare evaluation metrics across models</p>
        </div>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>

            <CartesianGrid
              strokeDasharray="3 5"
              vertical={false}
              stroke="#E9EDE8"
            />

            <XAxis dataKey="metric" />
            <YAxis domain={[0, 100]} />

            <Tooltip />
            <Legend />

            <Bar
              dataKey="logisticRegression"
              name="Logistic Regression"
              fill="#547B63"
              radius={[5, 5, 0, 0]}
            />

            <Bar
              dataKey="decisionTree"
              name="Decision Tree"
              fill="#A5B9D5"
              radius={[5, 5, 0, 0]}
            />

          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default ComparisonChart;
