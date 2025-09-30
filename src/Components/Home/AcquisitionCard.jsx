import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { calculateGoalTotals } from "../../utils/goalCalculations";
// 1. Importa a função centralizada de formatação
import { formatCurrencyValue } from "../../utils/currencyUtils"; 

import CircularProgress from "../Home/CircularProgress";
import "../../styles/home/cardAcquisition.css";

export default function AcquisitionCard({ goals = [], valuesVisible = true }) { 
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const { totalCurrent, totalTarget } = calculateGoalTotals(goals);

    const progressPercentage = totalTarget > 0 ? ((totalCurrent / totalTarget) * 100).toFixed(0) : 0;
    const remainingValue = totalTarget - totalCurrent;
    
    const MASKED_VALUE = "•••••••"; 
    
    // 2. REMOVE as funções getCurrencyPrefix e formatConditional locais.
    // 3. Define a função formatConditional para usar a utilidade importada.
    const formatConditional = (value) => {
        if (valuesVisible) { 
            // Usa a função centralizada para formatar o valor
            return formatCurrencyValue(value, i18n.language);
        } 
        
        // No modo mascarado, usamos um prefixo genérico.
        // O ideal é pegar o prefixo do idioma atual (usando getCurrencyDataByLanguage, se necessário)
        // Mas mantendo o padrão simples de máscara:
        const currentPrefix = i18n.language.startsWith('en') ? '$' : 'R$'; 
        
        return `${currentPrefix} ${MASKED_VALUE}`; 
    };
    
    const getMaskClass = () => {
        return !valuesVisible ? 'masked-text' : '';
    };

    const displayCurrent = formatConditional(totalCurrent);
    const displayTarget = formatConditional(totalTarget);
    const displayRemaining = formatConditional(remainingValue);

    return (
        <div className="card-container"> 
            <div className="card-shadow">
                <div className="card-acquisition">
                    <div className="card-left"> 
                        <div className="card-icon money" role="img" aria-label={t("acquisitions.money_icon_alt")}></div>
                    </div>
                    <div className="card-divider"></div>

                    <div className="card-right"> 
                        <p className="card-title">{t("acquisitions.total_collected_title")}</p>
                        
                        <p className={`card-subtitle ${getMaskClass()}`}>{displayCurrent}</p>
                        
                        <p className={`card-meta ${getMaskClass()}`}>
                            {t("acquisitions.target_label")}: {displayTarget}
                        </p>
                    </div>
                </div>
            </div>
            
            
            <div className="card-shadow">
                <div className="card-acquisition">
                    <div className="card-left"> 
                        <CircularProgress percentage={progressPercentage} size={90} strokeWidth={8} />
                    </div>
                    <div className="card-divider"></div>

                    <div className="card-right"> 
                        <p className="card-title">{t("acquisitions.of_total_goals")}</p>
                        
                        <p className={`card-meta ${getMaskClass()}`}> 
                            {t("acquisitions.remaining_value", { value: displayRemaining })}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}