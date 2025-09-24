import React from 'react';
import '../../styles/goalDetailsPage/challengeGrid.css';

const SequentialChallengeGrid = ({ totalDeposits, completedDeposits, onDepositClick }) => { 
  const deposits = Array.from({ length: totalDeposits }, (_, i) => i + 1);

  return (
    <div className="sequential-grid-container">
      <div className="sequential-grid">
        {deposits.map((depositNumber) => { 
          const isCompleted = completedDeposits.includes(depositNumber);
          
          return (
            <button
              key={depositNumber}
              className={`deposit-number-box ${isCompleted ? 'completed' : ''}`}
              onClick={() => onDepositClick(depositNumber)}
            >
              {depositNumber}
            </button>
          );
        })}
      </div>
    </div> 
  );
};

export default SequentialChallengeGrid;