import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

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
        const newDeposit = {
            value: depositNumber,
            timestamp: new Date().getTime(),
        };

        const existingDeposit = completedDeposits.find(dep => dep.value === depositNumber);

        const newCompletedDeposits = existingDeposit
            ? completedDeposits.filter(dep => dep.value !== depositNumber)
            : [...completedDeposits, newDeposit];

        setCompletedDeposits(newCompletedDeposits);

        const newCurrentValue = newCompletedDeposits.reduce((sum, dep) => sum + dep.value, 0);
        setCurrentGoalValue(newCurrentValue);

        const savedGoals = JSON.parse(localStorage.getItem("goals") || "[]");

        const updatedGoals = savedGoals.map(goal => {
            if (goal.id === id) {
                return {
                    ...goal,
                    currentValue: newCurrentValue,
                    completedDeposits: newCompletedDeposits,
                };
            }
            return goal;
        });

        localStorage.setItem("goals", JSON.stringify(updatedGoals));
    };

    const handleDeleteGoal = () => {
        const savedGoals = JSON.parse(localStorage.getItem("goals") || "[]");
        const updatedGoals = savedGoals.filter(goal => goal.id !== id);
        localStorage.setItem("goals", JSON.stringify(updatedGoals));
        navigate("/goals");
    };

    const totalDeposits = challengeInfo?.totalDeposits || 0;

    return (
        <div className="page">
            <Header type="home" showButton={true} showContent={false} />
            <GeneralFadeIn>
                <div className="goal-details-header-content">
                    <GoalProgressCard
                        title={title}
                        subtitle={description}
                        icon={icon}
                        current={currentGoalValue}
                        target={targetValue}
                    />

                </div>
                

                {goalType === "sequencial" && (
                    <>
                        <SubtitleContainer
                            text={
                                <>
                                    Desafio Sequencial {" "}
                                    <span className="subtitle-count">
                                        ({completedDeposits.length}/{totalDeposits} depósitos)
                                    </span>
                                </>
                            }
                            showButton={true}
                        />
                        <SequentialChallengeGrid
                            totalDeposits={totalDeposits}
                            completedDeposits={completedDeposits.map(dep => dep.value)}
                            onDepositClick={handleDepositClick}
                        />
 
                    </>

                )}
                
                        <div className="delete-goal-btn" onClick={handleDeleteGoal}>
                            <FaTrash className="delete-goal-btn-icon" size={24} />
                        </div>
            </GeneralFadeIn>
        </div>
    );
}