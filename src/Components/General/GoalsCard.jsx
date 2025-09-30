import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next'; 
import "../../styles/general/goalsCard.css"; 

export default function GoalCard({ goal, valuesVisible = true }) {
    const { t, i18n } = useTranslation(); 
    const navigate = useNavigate();
    
    const { id, title, goalType, currentValue, targetValue, icon, description } = goal;

    const current = Number(currentValue) || 0;
    const target = Number(targetValue) || 1;
    const progress = Math.min(((current / target) * 100).toFixed(0), 100);
    
    const MASKED_VALUE = "••••••";
     
    const getCurrencyPrefix = (language) => {
        return language === 'en' ? '$' : 'R$';
    };
 
    const currencyPrefix = getCurrencyPrefix(i18n.language); 

    const formatConditional = (value) => {
        if (valuesVisible) {   
            const currentLocale = i18n.language === 'en' ? 'en-US' : 'pt-BR';
            return value.toLocaleString(currentLocale); 
        }
        return MASKED_VALUE;
    };
      
    const getMaskClass = () => { 
        return !valuesVisible ? 'masked-text' : '';
    };
    
    const getTranslatedGoalType = (type) => { 
        switch (type) {
            case 'blocos':
                return t('goals.type.blocks');
            case 'sequencial':
                return t('goals.type.sequential');
            case 'fixo':
                return t('goals.type.fixed');
            default:
                return type;
        }
    };


    return (
        <div className="goalCard-container">
            <div className="goalCard-shadow">
                <div className="goalCard-item"> 
                    <div className="goalCard-left">
                        <div className="goalCard-icon"> 
                            {icon && <img src={icon} alt={t("goals.alt.goal_icon")} />}
                        </div>
                    </div>
                    <div className="goalCard-divider"></div>

                    <div className="goalCard-right">
                        <div className="goalCard-contentStart">
                            <p className="goalCard-title">{title}</p>
                            
                            <p className={`goalCard-progress ${getMaskClass()}`}> 
                                {currencyPrefix} {formatConditional(current)} {t("common.of")} {currencyPrefix} {formatConditional(target)}
                            </p>
                        </div>

                        <div className="goalCard-contentEnd">
                            <div className={`goalCard-typeBox ${goalType}`}> 
                                <p className="goalCard-typeText">{getTranslatedGoalType(goalType)}</p>
                            </div> 
                            <div
                                className="goalCard-boxEnd"
                                onClick={() => navigate(`/goals/${id}`, { state: goal })}
                                style={{ cursor: "pointer" }}
                            >
                                <div> 
                                    <p className={`goalCard-title  `}>{progress}% </p> 
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