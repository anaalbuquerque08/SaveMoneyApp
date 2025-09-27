// src/Components/General/CircularProgress.jsx

import React from 'react';
import '../../styles/home/circularProgress.css';

const CircularProgress = ({ percentage = 24, size = 100, strokeWidth = 10 }) => {
  const radius = (size / 2) - (strokeWidth / 2);
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="circular-progress-container">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      > 
        <circle
          className="progress-circle-bg"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
 
        <circle
          className="progress-circle"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
          }}
        />
 
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="progress-text"
        >
          {`${percentage}%`}
        </text>
      </svg>
    </div>
  );
};

export default CircularProgress;