// src/Components/General/GoalsList.jsx

import React from "react";
import GoalCard from "./GoalsCard";
import EmptyState from "../States/EmptyState";
import { useNavigate } from "react-router-dom";

export default function GoalsList({ goals = [] }) {
  const navigate = useNavigate();

  if (goals.length === 0) {
    return (
      <EmptyState
        text="Você ainda não tem metas cadastradas."
        buttonLabel="Criar Meta"
        onClick={() => navigate("/goals/create")}
      />
    );
  }

  return (
    <div className="goals-list">
      {goals.map(goal => (
        <GoalCard
          key={goal.id}
          goal={goal}  
        />
      ))}
    </div>
  );
}