import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { calculateGoalTotals } from "../utils/goalCalculations";

//* Components
import Header from "../Components/General/Header";
import SubtitleContainer from "../Components/States/SubtitleState";
import AcquisitionCard from "../Components/Home/AcquisitionCard";
import DepositState from "../Components/States/DepositState"; // ✅ Nome do componente corrigido
import EmptyState from "../Components/States/EmptyState";

//* Constants
import emptyStates from "../Constants/emptyStates";
import subtitleStates from "../Constants/subtitleStates"; 

//* Animations
import HomeFadeIn from "../Components/General/AnimatedPage/HomeFadeIn";

//* Styles
import "../styles/general/variables.css";

export default function HomePage() {
  const [goals, setGoals] = useState([]);
  const navigate = useNavigate();

  const [totalCurrent, setTotalCurrent] = useState(0);
  const [lastDeposits, setLastDeposits] = useState([]);

  useEffect(() => {
    const savedGoals = JSON.parse(localStorage.getItem("goals") || "[]");
    setGoals(savedGoals);

    const { totalCurrent } = calculateGoalTotals(savedGoals);
    setTotalCurrent(totalCurrent);

    const allDeposits = savedGoals
      .filter((goal) => goal.goalType === "sequencial" && goal.completedDeposits)
      .flatMap((goal) =>
        goal.completedDeposits.map((deposito) => {
          const isObject = typeof deposito === 'object' && deposito.value !== undefined;
          const value = isObject ? deposito.value : deposito;
          const timestamp = isObject ? deposito.timestamp : 0;
          
          return {
            title: goal.title,
            value: value,
            timestamp: timestamp,
          };
        })
      );

    const sortedDeposits = allDeposits.sort((a, b) => b.timestamp - a.timestamp).slice(0, 3);
    setLastDeposits(sortedDeposits);
  }, []);

  let homeState = "empty";
  if (goals.length > 0 && totalCurrent === 0) {
    homeState = "goalNoDeposit";
  } else if (goals.length > 0 && totalCurrent > 0) {
    homeState = "complete";
  }

  return (
    <div className="home-page">
      <Header type="home" showButton={false} />
      <HomeFadeIn>
        {homeState === "empty" && (
          <EmptyState
            text={emptyStates.goals.text}
            buttonLabel={emptyStates.goals.buttonLabel}
            onClick={() => navigate(emptyStates.goals.route)}
          />
        )}
        {(homeState === "goalNoDeposit" || homeState === "complete") && (
          <>
            <SubtitleContainer text={subtitleStates.aquisitions.text} showButton={true} />
            <AcquisitionCard goals={goals} />
            <SubtitleContainer text={subtitleStates.deposit.text} showButton={false} />
            <DepositState>  
              <div className="last-deposit-item"></div>
              {lastDeposits.length > 0 ? (
                lastDeposits.map((deposit, index) => (
                  <div key={index} className="last-deposit-item">
                    <span>{deposit.title}</span>
                    <span>+ R${deposit.value},00</span>
                  </div>
                ))
              ) : (
                <EmptyState
                  text={emptyStates.deposit.text}
                  buttonLabel={emptyStates.deposit.buttonLabel}
                  onClick={() => navigate(emptyStates.deposit.route)}
                />
              )}
            </DepositState>
          </>
        )}
      </HomeFadeIn>
    </div>
  );
}