// src/Components/Challenge/ChallengeGrid.js
import React from "react";
import "../../styles/goalDetailsPage/challengeGrid.css";

const ChallengeGrid = ({ challengeItems, completedItems, onDepositClick, goalType }) => {
  const getProgressColor = (shade = 100) => {
    switch ((goalType || "").toLowerCase().trim()) {
      case "sequencial":
        return `var(--pink-${shade})`;
      case "blocos":
        return `var(--green-${shade})`;
      case "fixo":
        return `var(--purple-${shade})`;
      default:
        return `var(--grey-${shade})`;
    }
  };

  return (
    <div className="challenge-grid-container">
      <div className="challenge-grid">
        {challengeItems.map((item) => {
          const isCompleted = completedItems.includes(item.id);

          return (
            <button
              key={item.id}
              className="deposit-item-box"
              onClick={() => onDepositClick(item.value, item.id)}
              style={{
                backgroundColor: isCompleted ? getProgressColor(200) : getProgressColor(100),
                color: isCompleted ? "var(--white)" : "var(--black)",
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ChallengeGrid;
