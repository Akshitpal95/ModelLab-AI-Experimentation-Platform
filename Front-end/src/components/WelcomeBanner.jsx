
import React from "react";
import {
  ArrowUpRight,
  BrainCircuit,
  Database,
  ChartNoAxesCombined,
} from "lucide-react";

import "./WelcomeBanner.css";

const WelcomeBanner = () => {
  return (
    <section className="welcome-banner">

      {/* Left Content */}
      <div className="welcome-content">

        <span className="welcome-label">
          YOUR EXPERIMENTATION WORKSPACE
        </span>

        <h1>
          Welcome back User!
        </h1>

        <p>
          Explore your datasets, experiment with machine
          learning models, and discover what the data reveals.
        </p>

        <div className="welcome-footer">
          <span className="welcome-status">
            <span className="status-dot"></span>
            Ready to experiment
          </span>

          <span className="welcome-divider"></span>

          <span className="welcome-caption">
            Learn. Experiment. Compare.
          </span>
        </div>

      </div>

      {/* Right Illustration */}
      <div className="welcome-visual">

        <div className="visual-glow"></div>

        <div className="visual-card visual-card-back">
          <Database size={19} />
          <span>Dataset</span>
          <div className="visual-lines">
            <i></i>
            <i></i>
            <i></i>
          </div>
        </div>

        <div className="visual-card visual-card-middle">
          <ChartNoAxesCombined size={20} />
          <span>Performance</span>
          <div className="visual-bars">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </div>
        </div>

        <div className="visual-card visual-card-front">
          <div className="visual-brain-icon">
            <BrainCircuit size={25} />
          </div>

          <div>
            <strong>ModelLab</strong>
            <small>AI Experimentation</small>
          </div>

          <ArrowUpRight size={17} />
        </div>

      </div>

    </section>
  );
};

export default WelcomeBanner;
