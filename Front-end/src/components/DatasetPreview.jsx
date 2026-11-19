
import React from "react";
import { ArrowLeft, Database } from "lucide-react";
import DatasetStats from "./DatasetStats";
import "./DatasetPreview.css";

const DatasetPreview = ({ dataset, onBack }) => {
  if (!dataset) return null;

  return (
    <section className="dataset-preview">

      <button className="preview-back-btn" onClick={onBack}>
        <ArrowLeft size={17} />
        Back to Datasets
      </button>

      <div className="preview-heading">
        <div className="preview-title-icon">
          <Database size={24} />
        </div>

        <div>
          <span>{dataset.category}</span>
          <h2>{dataset.name}</h2>
          <p>{dataset.description}</p>
        </div>
      </div>

      <DatasetStats dataset={dataset} />

      <div className="preview-information">
        <h3>Dataset Information</h3>

        <div className="preview-info-row">
          <span>Task Type</span>
          <strong>{dataset.taskType}</strong>
        </div>

        <div className="preview-info-row">
          <span>Number of Features</span>
          <strong>{dataset.columns - 1}</strong>
        </div>

        <div className="preview-info-row">
          <span>Target Column</span>
          <strong>To be identified</strong>
        </div>
      </div>

{dataset.sampleData && (
  <div className="preview-table-section">
    <h3>Dataset Sample</h3>
    <p>A small preview of the available records.</p>

    <div className="preview-table-wrapper">
      <table className="preview-table">
        <thead>
          <tr>
            {dataset.sampleColumns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {dataset.sampleData.map((record, index) => (
            <tr key={index}>
              {record.map((value, cellIndex) => (
                <td key={cellIndex}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}


    </section>
  );
};

export default DatasetPreview;
