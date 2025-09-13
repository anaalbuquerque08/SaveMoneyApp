import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/home/cardAcquisition.css";

export default function AcquisitionCard() {
  const navigate = useNavigate();

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
            <p className="card-title">Voce juntou o total de</p>
            <p className="card-subtitle">R$11.600,00</p>
            <p className="card-meta">Meta: R$46.000</p>
          </div>
        </div>
      </div>
      {/* Card - Porcentagem */}
      <div className="card-shadow">

        <div className="card-acquisition">
          <div className="card-left">
            <div className="card-icon percentage"></div>
          </div>
          <div className="card-divider"></div>

          <div className="card-right">
            <p className="card-title">do total de metas</p>
            <p className="card-meta">falta R$34.400 para atingir sua meta</p>
          </div>
        </div>
      </div>
    </div>


  );
}
