import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

//* Components
import Header from "../Components/General/Header";
import GeneralFadeIn from "../Components/General/AnimatedPage/GeneralFadeIn";
import SubtitleContainer from "../Components/States/SubtitleState";
import GoalProgressCard from "../Components/Goals/GoalProgressCard";
import ChallengeGrid from "../Components/Challenge/ChallengeGrid";

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

    const handleDepositClick = (depositValue, depositIndex = null) => {
        const existingDeposit = completedDeposits.find(dep => dep.index === depositIndex);

        const newCompletedDeposits = existingDeposit
            ? completedDeposits.filter(dep => dep.index !== depositIndex)
            : [...completedDeposits, {
                  value: depositValue,
                  timestamp: new Date().getTime(),
                  index: depositIndex
              }];

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

    // Prepara os dados para o Desafio Sequencial
    const sequentialItems = Array.from({ length: totalDeposits }, (_, i) => ({
        id: i,
        label: `${i + 1}`,
        value: i + 1,
    }));

    // Prepara os dados para o Desafio de Blocos
    const blockItems = (challengeInfo?.depositsList || []).map((depositValue, index) => ({
        id: index,
        label: `${depositValue}`,
        value: depositValue,
    }));

    // Prepara os dados para o Desafio Fixo
    const fixedItems = Array.from({ length: totalDeposits }, (_, i) => ({
        id: i,
        label: `  ${challengeInfo.fixedDepositValue}`,
        value: challengeInfo.fixedDepositValue,
    }));

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
                        goalType={goalType}
                    />

                </div>

                {goalType === "sequencial" && (
                    <>
                        <SubtitleContainer
                            text={
                                <>
                                    Desafio Sequencial {" "}
                                    <span className="subtitle-count sequencial">
                                        ({completedDeposits.length}/{totalDeposits} depósitos)
                                    </span>
                                </>
                            }
                            showButton={true}
                        />
                        <ChallengeGrid
                            challengeItems={sequentialItems}
                            completedItems={completedDeposits.map(dep => dep.index)}
                            onDepositClick={handleDepositClick}
                            goalType={goalType}
                        />
                    </>
                )}

                {goalType === "blocos" && (
                    <>
                        <SubtitleContainer
                            text={
                                <>
                                    Desafio em Blocos {" "}
                                    <span className="subtitle-count bloco">
                                        ({completedDeposits.length}/{challengeInfo.totalDeposits} depósitos)
                                    </span>
                                </>
                            }
                            showButton={true}
                        />
                        <ChallengeGrid
                            challengeItems={blockItems}
                            completedItems={completedDeposits.map(dep => dep.index)}
                            onDepositClick={handleDepositClick}
                            goalType={goalType}
                        />
                    </>
                )}

                {goalType === "fixo" && (
                    <>
                        <SubtitleContainer
                            text={
                                <>
                                    Desafio Fixo {" "}
                                    <span className="subtitle-count fixo">
                                        ({completedDeposits.length}/{totalDeposits} depósitos)
                                    </span>
                                </>
                            }
                            showButton={true}
                        />
                        <ChallengeGrid
                            challengeItems={fixedItems}
                            completedItems={completedDeposits.map(dep => dep.index)}
                            onDepositClick={handleDepositClick}
                            goalType={goalType}
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
