
import React from "react";
import { Table2, Columns3, HardDrive } from "lucide-react";

const DatasetStats = ({ dataset }) => {
  const stats = [
    {
      label: "Total Rows",
      value: dataset.rows.toLocaleString(),
      icon: Table2,
    },
    {
      label: "Total Columns",
      value: dataset.columns,
      icon: Columns3,
    },
    {
      label: "File Size",
      value: dataset.size,
      icon: HardDrive,
    },
  ];

  return (
    <div className="dataset-preview-stats">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div className="preview-stat-card" key={stat.label}>
            <div className="preview-stat-icon">
              <Icon size={19} />
            </div>

            <div>
              <p>{stat.label}</p>
              <h3>{stat.value}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DatasetStats;
