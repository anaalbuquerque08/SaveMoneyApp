import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useTranslation } from 'react-i18next';  

//* Components
import Header from "../Components/General/Header";
import GeneralFadeIn from "../Components/General/AnimatedPage/GeneralFadeIn";
import SubtitleContainer from "../Components/States/SubtitleState";
import GoalProgressCard from "../Components/Goals/GoalProgressCard";
import ChallengeGrid from "../Components/Challenge/ChallengeGrid";

import "../styles/goalDetailsPage/goalDetailsPage.css";

export default function GoalDetailsPage() {
    const { t } = useTranslation();  
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
    
    if (!id) {
        navigate("/goals");
        return null;
    }

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
        if (!window.confirm(t("goals.details.delete_confirm", { title }))) {
            return;
        }

        const savedGoals = JSON.parse(localStorage.getItem("goals") || "[]");
        const updatedGoals = savedGoals.filter(goal => goal.id !== id);
        localStorage.setItem("goals", JSON.stringify(updatedGoals));
        navigate("/goals");
    };

    const totalDeposits = challengeInfo?.totalDeposits || 0;
        
    const getChallengeSubtitle = (type) => {
        let challengeTitleKey;
        let subtitleClass;

        switch (type) {
            case "sequencial":
                challengeTitleKey = "goals.details.sequential_challenge_title";
                subtitleClass = "sequencial";
                break;
            case "blocos":
                challengeTitleKey = "goals.details.block_challenge_title";
                subtitleClass = "bloco"; // Note: A classe deve ser 'bloco'
                break;
            case "fixo":
                challengeTitleKey = "goals.details.fixed_challenge_title";
                subtitleClass = "fixo";
                break;
            default:
                return null;
        }
        
        // Retorna o JSX completo, com a tradução e a estilização no span
        return (
            <>
                {t(challengeTitleKey)}{" "}
                <span className={`subtitle-count ${subtitleClass}`}>
                    {/* Chama a tradução para o contador com os valores numéricos */}
                    {t("goals.details.deposit_count", {
                        current: completedDeposits.length,
                        total: totalDeposits,
                    })}
                </span>
            </>
        );
    };
    
    const sequentialItems = Array.from({ length: totalDeposits }, (_, i) => ({
        id: i,
        label: `${i + 1}`,
        value: i + 1,
    }));
    
    const blockItems = (challengeInfo?.depositsList || []).map((depositValue, index) => ({
        id: index,
        label: `${depositValue}`,
        value: depositValue,
    }));
        
    const fixedItems = Array.from({ length: totalDeposits }, (_, i) => ({
        id: i,
        label: `R$ ${challengeInfo.fixedDepositValue}`,
        value: challengeInfo.fixedDepositValue,
    }));

    return (
        <div className="page">
            <Header type="home" showButton={true} showContent={false} showEyeButton={false}/>
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
                            // CORRIGIDO: Passa o JSX como children
                            children={getChallengeSubtitle("sequencial")}
                            showButton={false}
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
                            // CORRIGIDO: Passa o JSX como children
                            children={getChallengeSubtitle("blocos")}
                            showButton={false}
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
                            // CORRIGIDO: Passa o JSX como children
                            children={getChallengeSubtitle("fixo")}
                            showButton={false}
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