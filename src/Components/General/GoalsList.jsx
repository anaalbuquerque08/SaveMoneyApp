import React from "react";
import GoalCard from "./GoalsCard";
import EmptyState from "../States/EmptyState";
import { useNavigate } from "react-router-dom";
import sadPig from "../../assets/pig/sad-pig.png";  

export default function GoalsList({ goals = [] }) {
  const navigate = useNavigate();

  if (goals.length === 0) {
    return (
      <EmptyState
        img={sadPig}  
        text="Você ainda não tem metas cadastradas."
        buttonLabel="Criar Meta"
        onClick={() => navigate("/create-goal")}
      />
    );
  }

  return (
    <div className="goals-list">
      {goals.map((goal) => (
        <GoalCard key={goal.id} goal={goal} />
      ))}
    </div>
  );
}
