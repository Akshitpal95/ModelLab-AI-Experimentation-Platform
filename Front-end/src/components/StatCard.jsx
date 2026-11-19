
import React from "react";
import "./StatCard.css";

const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  tone = "green",
}) => {
  return (
    <div className="stat-card">

      {/* Card Header */}
      <div className="stat-card-header">

        <div className={`stat-icon ${tone}`}>
          {Icon && <Icon size={19} strokeWidth={1.8} />}
        </div>

        {trend && (
          <span className="stat-trend">
            {trend}
          </span>
        )}

      </div>

      {/* Card Information */}
      <div className="stat-card-body">

        <p className="stat-title">
          {title}
        </p>

        <h2 className="stat-value">
          {value}
        </h2>

        <p className="stat-description">
          {description}
        </p>

      </div>

    </div>
  );
};

export default StatCard;
