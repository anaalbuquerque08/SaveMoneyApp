import React from "react";
import GoalCard from "./GoalsCard";
import EmptyState from "../States/EmptyState";
import { useNavigate } from "react-router-dom";
import sadPig from "../../assets/pig/sad-pig.png";
import emptyStates from "../../Constants/emptyStates";  

export default function GoalsList({ goals = [], valuesVisible = true }) {
    const navigate = useNavigate();
 
    const goalsEmptyState = emptyStates.goals;

    if (goals.length === 0) {
        return (
            <EmptyState
                img={sadPig} 
                text={goalsEmptyState.text} 
                buttonLabel={goalsEmptyState.buttonLabel} 
                onClick={() => navigate(goalsEmptyState.route)}
            />
        );
    }

    return (
        <div className="goals-list">
            {goals.map((goal) => (
                <GoalCard key={goal.id} goal={goal} valuesVisible={valuesVisible} />
            ))}
        </div>
    );
}