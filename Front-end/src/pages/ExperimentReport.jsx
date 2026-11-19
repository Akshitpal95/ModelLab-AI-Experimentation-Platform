
import React from "react";
import {
  FileText,
  Database,
  BrainCircuit,
  Settings2,
  Target,
  ClipboardList,
  Lightbulb,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import "./ExperimentReport.css";

const ExperimentReport = () => {
  // Temporary report configuration.
  // These values will eventually come from a completed ML experiment.
  const report = {
    title: "Iris Classification Experiment",
    experimentId: "EXP-001",
    dataset: "Iris Dataset",
    task: "Classification",
    algorithms: [
      "Logistic Regression",
      "Decision Tree",
      "Random Forest",
      "K-Nearest Neighbors",
    ],
    testSize: "20%",
    randomState: 42,
    status: "Awaiting model execution",
  };

  const reportSections = [
    {
      number: "01",
      title: "Research Objective",
      icon: Target,
      content:
        "The objective of this experiment is to evaluate and compare different machine learning classification algorithms using the Iris dataset. The experiment will examine how effectively each algorithm predicts flower species.",
    },
    {
      number: "02",
      title: "Dataset Description",
      icon: Database,
      content:
        "The Iris dataset contains measurements of iris flowers, including sepal length, sepal width, petal length and petal width. These features are used to classify flowers into three species: Setosa, Versicolor and Virginica.",
    },
    {
      number: "03",
      title: "Experimental Methodology",
      icon: Settings2,
      content:
        "The dataset will be divided into training and testing subsets. Selected classification algorithms will be trained on the training data and evaluated using the same test data to support a fair comparison.",
    },
  ];

  return (
    <main className="experiment-report">
      <header className="report-header">
        <div>
          <span className="report-eyebrow">RESEARCH WORKSPACE</span>
          <h1>Experiment Report</h1>
          <p>
            Review the methodology, configuration and findings
            of your machine learning experiment.
          </p>
        </div>

        <div className="report-header-icon">
          <FileText size={24} />
        </div>
      </header>

      <section className="report-title-card">
        <div>
          <span className="report-label">EXPERIMENT REPORT</span>
          <h2>{report.title}</h2>
          <p>
            Experiment ID: {report.experimentId}
          </p>
        </div>

        <span className="report-status">
          <AlertCircle size={14} />
          {report.status}
        </span>
      </section>

      <section className="report-overview-grid">
        <div className="report-info-card">
          <div className="report-info-icon">
            <Database size={18} />
          </div>
          <span>Dataset</span>
          <strong>{report.dataset}</strong>
          <small>{report.task}</small>
        </div>

        <div className="report-info-card">
          <div className="report-info-icon blue">
            <BrainCircuit size={18} />
          </div>
          <span>Algorithms selected</span>
          <strong>{report.algorithms.length} Models</strong>
          <small>Classification algorithms</small>
        </div>

        <div className="report-info-card">
          <div className="report-info-icon gold">
            <Settings2 size={18} />
          </div>
          <span>Test size</span>
          <strong>{report.testSize}</strong>
          <small>Reserved for evaluation</small>
        </div>
      </section>

      <section className="report-section">
        <div className="report-section-heading">
          <ClipboardList size={19} />
          <div>
            <h3>Experiment Configuration</h3>
            <p>Settings used to define this experiment.</p>
          </div>
        </div>

        <div className="report-configuration">
          <div>
            <span>Dataset</span>
            <strong>{report.dataset}</strong>
          </div>

          <div>
            <span>Task type</span>
            <strong>{report.task}</strong>
          </div>

          <div>
            <span>Training split</span>
            <strong>80%</strong>
          </div>

          <div>
            <span>Testing split</span>
            <strong>{report.testSize}</strong>
          </div>

          <div>
            <span>Random state</span>
            <strong>{report.randomState}</strong>
          </div>
        </div>

        <div className="report-algorithms">
          <span>Selected algorithms</span>
          <div className="report-algorithm-list">
            {report.algorithms.map((algorithm) => (
              <span key={algorithm}>{algorithm}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="report-section">
        <div className="report-section-heading">
          <Target size={19} />
          <div>
            <h3>Research Methodology</h3>
            <p>Purpose and approach of the experiment.</p>
          </div>
        </div>

        <div className="report-methodology-list">
          {reportSections.map((section) => {
            const Icon = section.icon;

            return (
              <article
                className="report-methodology-item"
                key={section.number}
              >
                <div className="report-methodology-icon">
                  <Icon size={18} />
                </div>

                <div>
                  <span>SECTION {section.number}</span>
                  <h4>{section.title}</h4>
                  <p>{section.content}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="report-section">
        <div className="report-section-heading">
          <BrainCircuit size={19} />
          <div>
            <h3>Evaluation Results</h3>
            <p>
              Performance metrics generated after model training.
            </p>
          </div>
        </div>

        <div className="report-pending">
          <div className="report-pending-icon">
            <AlertCircle size={21} />
          </div>

          <div>
            <strong>Model execution is not connected yet</strong>
            <p>
              Accuracy, precision, recall, F1-score and other
              evaluation results will appear here after the
              Python machine-learning backend is implemented.
            </p>
          </div>
        </div>
      </section>

      <section className="report-section report-findings-grid">
        <article>
          <div className="report-section-heading">
            <Lightbulb size={19} />
            <div>
              <h3>Observations</h3>
              <p>Insights identified from experimental results.</p>
            </div>
          </div>

          <p className="report-placeholder">
            Observations will be added after evaluating the
            trained models and examining their performance.
          </p>
        </article>

        <article>
          <div className="report-section-heading">
            <AlertCircle size={19} />
            <div>
              <h3>Limitations</h3>
              <p>Factors that may affect the experiment.</p>
            </div>
          </div>

          <p className="report-placeholder">
            Potential limitations, such as dataset size,
            feature selection and model assumptions, will be
            reviewed during the actual experiment.
          </p>
        </article>
      </section>

      <section className="report-conclusion">
        <div className="report-conclusion-icon">
          <CheckCircle2 size={20} />
        </div>

        <div>
          <h3>Conclusion</h3>
          <p>
            A final conclusion will be written after model
            training, evaluation and comparison. It will be
            based on observed results rather than assumptions.
          </p>
        </div>
      </section>

      <p className="report-disclaimer">
        This is a report template with illustrative configuration
        details. No machine-learning models have been trained
        for this report yet.
      </p>
    </main>
  );
};

export default ExperimentReport;
