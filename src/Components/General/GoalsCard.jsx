import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "../../styles/general/goalsCard.css"; 
export default function GoalCard({ goal, valuesVisible = true }) {
    const navigate = useNavigate();
    
    const { id, title, goalType, currentValue, targetValue, icon, description } = goal;

    const current = Number(currentValue) || 0;
    const target = Number(targetValue) || 1;
    const progress = Math.min(((current / target) * 100).toFixed(0), 100);
 
    const MASKED_VALUE = "••••••";
 
    const formatConditional = (value) => {
        if (valuesVisible) { 
            return value.toLocaleString('pt-BR'); 
        }
        return MASKED_VALUE;
    };
     
    const getMaskClass = () => { 
        return !valuesVisible ? 'masked-text' : '';
    };


    return (
        <div className="goalCard-container">
            <div className="goalCard-shadow">
                <div className="goalCard-item"> 
                    <div className="goalCard-left">
                        <div className="goalCard-icon">
                            {icon && <img src={icon} alt="ícone da meta" />}
                        </div>
                    </div>
                    <div className="goalCard-divider"></div>

                    <div className="goalCard-right">
                        <div className="goalCard-contentStart">
                            <p className="goalCard-title">{title}</p>
                             
                            <p className={`goalCard-progress ${getMaskClass()}`}>
                                R${formatConditional(current)} de R${formatConditional(target)}
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
                                    <p className={`goalCard-title  `}>{progress}% </p> 
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