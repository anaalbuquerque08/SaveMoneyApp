 

import React from 'react';
import '../../styles/goalDetailsPage/challengeGrid.css';

const BlockChallengeGrid = ({ depositsList, completedDeposits, onDepositClick }) => {
    return (
        <div className="sequential-grid-container">
            <div className="sequential-grid">
                {depositsList.map((depositValue, index) => {
                    const isCompleted = completedDeposits.includes(index);

                    return (
                        <button
                            key={`${depositValue}-${index}`}
                            className={`deposit-number-box ${isCompleted ? 'completed' : ''}`}
                            onClick={() => onDepositClick(depositValue, index)}
                        >
                              {depositValue}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default BlockChallengeGrid; 