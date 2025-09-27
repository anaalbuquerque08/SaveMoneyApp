import React from "react";
import { useNavigate } from "react-router-dom";
import { calculateGoalTotals } from "../../utils/goalCalculations";
import CircularProgress from "../Home/CircularProgress";
import "../../styles/home/cardAcquisition.css";

// 1. Recebe a prop valuesVisible
export default function AcquisitionCard({ goals = [], valuesVisible = true }) { 
    const navigate = useNavigate();

    const { totalCurrent, totalTarget } = calculateGoalTotals(goals);

    // ✅ Calcula a porcentagem e o valor restante
    const progressPercentage = totalTarget > 0 ? ((totalCurrent / totalTarget) * 100).toFixed(0) : 0;
    const remainingValue = totalTarget - totalCurrent;

    // 2. Define o valor mascarado para quando estiver oculto
    const MASKED_VALUE = "R$ •••••••";

    // 3. Função auxiliar para formatar condicionalmente
    const formatConditional = (value) => {
        if (valuesVisible) {
            return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        }
        return MASKED_VALUE;
    };
    
    // 4. Função auxiliar para aplicar a classe de máscara
    const getMaskClass = () => {
        return !valuesVisible ? 'masked-text' : '';
    };

    // Formatações condicionais que serão usadas no JSX
    const displayCurrent = formatConditional(totalCurrent);
    const displayTarget = formatConditional(totalTarget);
    const displayRemaining = formatConditional(remainingValue);

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
                        
                        {/* APLICAÇÃO 1: Saldo Atual */}
                        <p className={`card-subtitle ${getMaskClass()}`}>{displayCurrent}</p>
                        
                        {/* APLICAÇÃO 2: Meta */}
                        <p className={`card-meta ${getMaskClass()}`}>Meta: {displayTarget}</p>
                    </div>
                </div>
            </div>
            
            
            {/* Card - Porcentagem */}
            <div className="card-shadow">
                <div className="card-acquisition">
                    <div className="card-left"> 
                        {/* NOTA: A porcentagem em si não precisa de máscara, mas se a tag <p> fosse um número, precisaria. */}
                        <CircularProgress percentage={progressPercentage} size={90} strokeWidth={8} />
                    </div>
                    <div className="card-divider"></div>

                    <div className="card-right">
                        <p className="card-title">do total de metas</p>
                        
                        {/* APLICAÇÃO 3: Valor Faltante */}
                        <p className={`card-meta ${getMaskClass()}`}>Falta {displayRemaining} para atingir sua meta</p>
                    </div>
                </div>
            </div>
        </div>
    );
}