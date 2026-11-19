
import React from "react";
import {
  Database,
  ArrowUpRight,
  Table2,
} from "lucide-react";

import "./DatasetCard.css";

const DatasetCard = ({ dataset, onSelect }) => {
  return (
    <article className="dataset-card">

      {/* Card Header */}
      <div className="dataset-card-top">
        <div className="dataset-card-icon">
          <Database size={20} />
        </div>

        <span className={`dataset-task-badge ${dataset.taskType.toLowerCase()}`}>
          {dataset.taskType}
        </span>
      </div>

      {/* Dataset Information */}
      <div className="dataset-card-content">
        <span className="dataset-category">
          {dataset.category}
        </span>

        <h3>{dataset.name}</h3>

        <p>{dataset.description}</p>
      </div>

      {/* Dataset Statistics */}
      <div className="dataset-card-stats">

        <div className="dataset-stat">
          <Table2 size={15} />
          <span>{dataset.rows} rows</span>
        </div>

        <div className="dataset-stat">
          <Database size={15} />
          <span>{dataset.columns} columns</span>
        </div>

      </div>

      {/* Card Footer */}
      <div className="dataset-card-footer">
        <span>{dataset.size}</span>

        <button
          className="dataset-view-btn"
          onClick={() => onSelect?.(dataset)}
        >
          Explore
          <ArrowUpRight size={15} />
        </button>
      </div>

    </article>
  );
};

export default DatasetCard;
