import React from "react";
// Importar useTranslation
import { useTranslation } from 'react-i18next'; 

export default function GoalProgressCard({ title, icon, current, target, subtitle, goalType }) {
    // 1. Obtém a função de tradução e o objeto i18n
    const { t, i18n } = useTranslation();

    const percentage = Math.round((current / target) * 100);
    
    // NOVO: Função para determinar o prefixo da moeda baseado no idioma
    const getCurrencyPrefix = (language) => {
        return language === 'en' ? '$' : 'R$';
    };

    // NOVO: Função para formatar o valor com base no idioma
    const formatCurrencyValue = (value) => {
        const currentLocale = i18n.language === 'en' ? 'en-US' : 'pt-BR';
        const currencyPrefix = getCurrencyPrefix(i18n.language);

        // Formata o número (ex: 1000.50 -> 1.000,50 ou 1,000.50)
        const formattedValue = Number(value).toLocaleString(currentLocale, { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2,
        });

        return `${currencyPrefix} ${formattedValue}`;
    };

    const getProgressColor = () => {
        switch (goalType) {
            case "sequencial":
                return "var(--pink-100)";
            case "blocos":
            case "blocos": // Caso de segurança, caso haja repetição
                return "var(--green-100)";
            case "fixo":
                return "var(--purple-100)";
            default:
                return "var(--grey-200)";
        }
    };
    
    // Usa a nova função para formatar os valores
    const displayCurrent = formatCurrencyValue(current);
    const displayTarget = formatCurrencyValue(target);

    return (
        <div className="goal-progress-card-container">
            <div className="goal-progress-card-shadow">
                <div className="goal-progress-card-content">
                    <div className="goal-progress-card-header">
                        {icon && <img src={icon} alt={t("goals.alt.goal_icon")} className="goal-progress-card-icon" />}
                        <div className="goal-progress-card-text">
                            <h3 className="goal-progress-card-title">{title}</h3>
                            <p className="goal-progress-card-subtitle">{subtitle}</p>
                        </div>
                    </div>
                    <div className="goal-progress-card-progress-bar-container">
                        <div
                            className="goal-progress-card-progress-bar"
                            style={{
                                width: `${percentage}%`,
                                backgroundColor: getProgressColor(), 
                            }}
                        ></div>
                        <span className="goal-progress-card-percentage">{percentage}%</span>
                    </div>
                    {/* 2. CORRIGIDO: Usa a chave de tradução e os valores formatados */}
                    <p className="goal-progress-card-progress-value">
                         {t("common.current_of_target", { current: displayCurrent, target: displayTarget })}
                    </p>
                </div>
            </div>
        </div>
    );
}