import DatasetCard from "../components/DatasetCard";
import DatasetPreview from "../components/DatasetPreview.jsx";
import React, { useState } from "react";
import {
  Database,
  FileSpreadsheet,
  Layers3,
  ArrowUpRight,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import "./DatasetExplorer.css";

const DatasetExplorer = () => {
  const [selectedDataset, setSelectedDataset] = useState(null);
  const datasets = [
  
{
  id: 1,
  name: "Iris Dataset",
  category: "Flower Classification",
  description: "Explore flower measurements and classify three different iris species.",
  taskType: "Classification",
  rows: 150,
  columns: 5,
  size: "4.5 KB",

  sampleColumns: [
    "Sepal Length",
    "Sepal Width",
    "Petal Length",
    "Petal Width",
    "Species",
  ],

  sampleData: [
    [5.1, 3.5, 1.4, 0.2, "Setosa"],
    [4.9, 3.0, 1.4, 0.2, "Setosa"],
    [4.7, 3.2, 1.3, 0.2, "Setosa"],
    [6.4, 3.2, 4.5, 1.5, "Versicolor"],
    [5.9, 3.0, 5.1, 1.8, "Virginica"],
  ],
},

  
{
  id: 2,
  name: "Titanic Dataset",
  category: "Passenger Analysis",
  description: "Analyze passenger information and predict survival outcomes.",
  taskType: "Classification",
  rows: 891,
  columns: 12,
  size: "60 KB",

  sampleColumns: [
    "Passenger ID",
    "Age",
    "Sex",
    "Class",
    "Fare",
    "Survived",
  ],

  sampleData: [
    [1, 22, "Male", 3, 7.25, "No"],
    [2, 38, "Female", 1, 71.28, "Yes"],
    [3, 26, "Female", 3, 7.92, "Yes"],
    [4, 35, "Female", 1, 53.10, "Yes"],
    [5, 28, "Male", 3, 8.05, "No"],
  ],
},

  
{
  id: 3,
  name: "Wine Quality",
  category: "Quality Prediction",
  description: "Study chemical properties of wine and predict its quality.",
  taskType: "Classification",
  rows: 1599,
  columns: 12,
  size: "85 KB",

  sampleColumns: [
    "Fixed Acidity",
    "Volatile Acidity",
    "Citric Acid",
    "Residual Sugar",
    "Alcohol",
    "Quality",
  ],

  sampleData: [
    [7.4, 0.70, 0.00, 1.9, 9.4, 5],
    [7.8, 0.88, 0.00, 2.6, 9.8, 5],
    [7.8, 0.76, 0.04, 2.3, 9.8, 5],
    [11.2, 0.28, 0.56, 1.9, 9.8, 6],
    [7.4, 0.70, 0.00, 1.9, 9.4, 5],
  ],
},

  
{
  id: 4,
  name: "Breast Cancer",
  category: "Medical Classification",
  description: "Use cell measurements to classify tumors as benign or malignant.",
  taskType: "Classification",
  rows: 569,
  columns: 31,
  size: "125 KB",

  sampleColumns: [
    "Mean Radius",
    "Mean Texture",
    "Mean Perimeter",
    "Mean Area",
    "Mean Smoothness",
    "Diagnosis",
  ],

  sampleData: [
    [17.99, 10.38, 122.80, 1001.0, 0.1184, "Malignant"],
    [20.57, 17.77, 132.90, 1326.0, 0.0847, "Malignant"],
    [19.69, 21.25, 130.00, 1203.0, 0.1096, "Malignant"],
    [11.42, 20.38, 77.58, 386.1, 0.1425, "Benign"],
    [20.29, 14.34, 135.10, 1297.0, 0.1003, "Malignant"],
  ],
},

  
{
  id: 5,
  name: "Diabetes Dataset",
  category: "Health Prediction",
  description: "Explore health indicators and predict disease progression.",
  taskType: "Regression",
  rows: 442,
  columns: 10,
  size: "23 KB",

  sampleColumns: [
    "Age",
    "BMI",
    "Blood Pressure",
    "Serum S1",
    "Serum S2",
    "Disease Progression",
  ],

  sampleData: [
    [59, 32.1, 101, 157, 93, 151],
    [48, 21.6, 87, 183, 103, 75],
    [72, 30.5, 93, 156, 93, 141],
    [24, 25.3, 84, 198, 131, 206],
    [50, 23.0, 101, 192, 125, 135],
  ],
},

  
{
  id: 6,
  name: "California Housing",
  category: "Housing Prediction",
  description: "Analyze housing data and estimate median property values.",
  taskType: "Regression",
  rows: 20640,
  columns: 8,
  size: "1.4 MB",

  sampleColumns: [
    "Median Income",
    "House Age",
    "Average Rooms",
    "Average Bedrooms",
    "Population",
    "Median House Value",
  ],

  sampleData: [
    [8.3252, 41, 6.98, 1.02, 322, 452600],
    [8.3014, 21, 6.24, 0.97, 2401, 358500],
    [7.2574, 52, 8.29, 1.07, 496, 352100],
    [5.6431, 52, 5.82, 1.07, 558, 341300],
    [3.8462, 52, 6.28, 1.08, 565, 342200],
  ],
},

];
const [searchTerm, setSearchTerm] = useState("");
const [selectedTask, setSelectedTask] = useState("All");

const filteredDatasets = datasets.filter((dataset) => {
  const search = searchTerm.toLowerCase();

  // Check whether the dataset matches the search
  const matchesSearch =
    dataset.name.toLowerCase().includes(search) ||
    dataset.category.toLowerCase().includes(search) ||
    dataset.description.toLowerCase().includes(search);

  // Check whether the dataset matches the selected task type
  const matchesTask =
    selectedTask === "All" || dataset.taskType === selectedTask;

  return matchesSearch && matchesTask;
});
if (selectedDataset) {
  return (
    <DatasetPreview
      dataset={selectedDataset}
      onBack={() => setSelectedDataset(null)}
    />
  );
}

  return (
    <section className="dataset-explorer">
      

      {/* Page Heading */}
      <div className="dataset-page-header">
        <div className="dataset-heading">
          <span className="section-eyebrow">
            DATA WORKSPACE
          </span>

          <h1>Dataset Explorer</h1>

          <p>
            Explore, inspect and prepare datasets
            for your machine learning experiments.
          </p>
        </div>

        <div className="dataset-header-info">
          <Database size={16} />
          <span>Dataset Library</span>
        </div>
      </div>


      {/* Dataset Overview */}
      <div className="dataset-overview">

        <div className="overview-card">
          <div className="overview-icon green">
            <Database size={19} />
          </div>

          <div>
            <span>Available Datasets</span>
            <h3>06</h3>
            <p>Public datasets</p>
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-icon blue">
            <FileSpreadsheet size={19} />
          </div>

          <div>
            <span>Supported Formats</span>
            <h3>02</h3>
            <p>CSV and Excel</p>
          </div>
        </div>

        <div className="overview-card">
          <div className="overview-icon gold">
            <Layers3 size={19} />
          </div>

          <div>
            <span>ML Task Types</span>
            <h3>02</h3>
            <p>Classification and regression</p>
          </div>
        </div>

      </div>


      {/* Dataset Library Section */}
      <div className="dataset-library">

        <div className="library-header">
          <div>
            <h2>Available Datasets</h2>
            <p>
              Select a dataset to explore its structure
              and contents.
            </p>
          </div>

          <span className="dataset-count">
            6 datasets
          </span>
        </div>


        {/* Search and Filters */}
        <div className="dataset-toolbar">

          <div className="dataset-search">
            <Search size={17} />

            <input
  type="text"
  placeholder="Search datasets..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
          </div>

          <button className="dataset-filter-btn">
            <SlidersHorizontal size={16} />
           <SlidersHorizontal size={16} />

  <select
    value={selectedTask}
    onChange={(e) => setSelectedTask(e.target.value)}
  >
    <option value="All">All Types</option>
    <option value="Classification">Classification</option>
    <option value="Regression">Regression</option>
  </select>
          </button>

          </div>


        {/* Dataset Cards will be added here */}

        <div className="dataset-grid">
  {filteredDatasets.map((dataset) => (
    <DatasetCard
      key={dataset.id}
      dataset={dataset}
      onSelect={setSelectedDataset}
    />
  ))}
</div>

      </div>

 

    </section>
  );
};

export default DatasetExplorer;
