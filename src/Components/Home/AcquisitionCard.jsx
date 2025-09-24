 

import React from "react";
import { useNavigate } from "react-router-dom";
import { calculateGoalTotals } from "../../utils/goalCalculations";
import CircularProgress from "../Home/CircularProgress"; // ✅ Importa o novo componente
import "../../styles/home/cardAcquisition.css";

export default function AcquisitionCard({ goals = [] }) {
  const navigate = useNavigate();

  const { totalCurrent, totalTarget } = calculateGoalTotals(goals);

  // ✅ Calcula a porcentagem e o valor restante
  const progressPercentage = totalTarget > 0 ? ((totalCurrent / totalTarget) * 100).toFixed(0) : 0;
  const remainingValue = totalTarget - totalCurrent;
  
  const formattedCurrent = totalCurrent.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const formattedTarget = totalTarget.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const formattedRemaining = remainingValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div className="card-container">
      {/* Card - Dinheiro */}
      <div className="card-shadow">
        <div className="card-acquisition">
          <div className="card-left">
            <div className="card-icon money"></div>
          </div>
          <div className="card-divider"></div>

          <div className="card-right">
            <p className="card-title">Você juntou o total de</p>
            <p className="card-subtitle">{formattedCurrent}</p>
            <p className="card-meta">Meta: {formattedTarget}</p>
          </div>
        </div>
      </div>
      
      {/* Card - Porcentagem */}
      <div className="card-shadow">
        <div className="card-acquisition">
          <div className="card-left"> 
            <CircularProgress percentage={progressPercentage} size={90} strokeWidth={8} />
          </div>
          <div className="card-divider"></div>

          <div className="card-right">
            <p className="card-title">do total de metas</p>
            <p className="card-meta">Falta {formattedRemaining} para atingir sua meta</p>
          </div>
        </div>
      </div>
    </div>
  );
}