import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

//* Components
import Header from "../Components/General/Header";
import GeneralFadeIn from "../Components/General/AnimatedPage/GeneralFadeIn";
import SubtitleContainer from "../Components/States/SubtitleState";
import GoalProgressCard from "../Components/Goals/GoalProgressCard";
import SequentialChallengeGrid from "../Components/Challenge/SequentialChallengeGrid";

import "../styles/goalDetailsPage/goalDetailsPage.css";

export default function GoalDetailsPage() {
    const location = useLocation();
    const navigate = useNavigate();
 
    const {
        id, 
        title,
        icon,
        goalType,
        currentValue,
        targetValue,
        description,
        challengeInfo,
        completedDeposits: initialCompletedDeposits,  
    } = location.state || {};
     
    const [completedDeposits, setCompletedDeposits] = useState(initialCompletedDeposits || []);
    const [currentGoalValue, setCurrentGoalValue] = useState(currentValue || 0);
     
    const handleDepositClick = (depositNumber) => { 
        const newCompletedDeposits = completedDeposits.includes(depositNumber)
            ? completedDeposits.filter(num => num !== depositNumber)  
            : [...completedDeposits, depositNumber];  
             
        setCompletedDeposits(newCompletedDeposits);
         
        const newCurrentValue = newCompletedDeposits.reduce((sum, num) => sum + num, 0);
        setCurrentGoalValue(newCurrentValue);
         
        const savedGoals = JSON.parse(localStorage.getItem("goals") || "[]");
         
        const updatedGoals = savedGoals.map(goal => {
            if (goal.id === id) {
                return {
                    ...goal,
                    currentValue: newCurrentValue,
                    completedDeposits: newCompletedDeposits
                };
            }
            return goal;
        });
         
        localStorage.setItem("goals", JSON.stringify(updatedGoals));
    };
    
    const totalDeposits = challengeInfo?.totalDeposits || 0;

    return (
        <div className="page">
            <Header type="home" showButton={true} showContent={false} />
            <GeneralFadeIn>
                <GoalProgressCard
                    title={title}
                    subtitle={description}
                    icon={icon}
                    current={currentGoalValue}
                    target={targetValue}
                />

                {goalType === "sequencial" && (
                    <>
                        <SubtitleContainer
                            text={`Desafio Sequencial (${completedDeposits.length}/${totalDeposits} depósitos)`}
                            showButton={true}
                        />

                        <SequentialChallengeGrid
                            totalDeposits={totalDeposits}
                            completedDeposits={completedDeposits}
                            onDepositClick={handleDepositClick}
                        />
                    </>
                )}
            </GeneralFadeIn>
        </div>
    );
}