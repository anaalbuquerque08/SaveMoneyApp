// src/Components/Goals/GoalCard.jsx

import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "../../styles/general/goalsCard.css";
 
export default function GoalCard({ goal }) {
  const navigate = useNavigate();
 
  const { id, title, goalType, currentValue, targetValue, icon, description } = goal;

  const current = Number(currentValue) || 0;
  const target = Number(targetValue) || 1;
  const progress = Math.min(((current / target) * 100).toFixed(0), 100);

  return (
    <div className="goalCard-container">
      <div className="goalCard-shadow">
        <div className="goalCard-item">
          {/* Ícone */}
          <div className="goalCard-left">
            <div className="goalCard-icon">
              {icon && <img src={icon} alt="ícone da meta" />}
            </div>
          </div>

          {/* Divisor */}
          <div className="goalCard-divider"></div>

          {/* Conteúdo */}
          <div className="goalCard-right">
            <div className="goalCard-contentStart">
              <p className="goalCard-title">{title}</p>
              <p className="goalCard-progress">
                R${current.toLocaleString()} de R${target.toLocaleString()}
              </p>
            </div>

            <div className="goalCard-contentEnd">
              <div className={`goalCard-typeBox ${goalType}`}>
                <p className="goalCard-typeText">{goalType}</p>
              </div> 
              <div
                className="goalCard-boxEnd"
                onClick={() => navigate(`/goals/${id}`, { state: goal })}
                style={{ cursor: "pointer" }}
              >
                <div>
                  <p className="goalCard-title">{progress}%</p>
                </div>
                <div>
                  <IoIosArrowForward size={22} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}