import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { calculateGoalTotals } from "../utils/goalCalculations";

//* Components
import Header from "../Components/General/Header";
import SubtitleContainer from "../Components/States/SubtitleState";
import AcquisitionCard from "../Components/Home/AcquisitionCard";
import DepositBox from "../Components/States/DepositState";
import EmptyState from "../Components/States/EmptyState";

//* Constants
import emptyStates from "../Constants/emptyStates";
import subtitleStates from "../Constants/subtitleStates";
import depositStates from "../Constants/depositStates";

//* Animations
import HomeFadeIn from "../Components/General/AnimatedPage/HomeFadeIn";

//* Styles
import "../styles/general/variables.css";

//? Para a Carol do futuro entender...
//? Eu fiz esse código para garantir que a página inicial ('HomePage') sempre mostre o estado certo,
//? dependendo das metas que o usuário tem salvas.
//? O que eu fiz aqui foi:
//? 1. Criei um estado (chamado 'goals') pra guardar a lista de metas.
//? 2. Usei o 'useEffect' pra que, assim que a página carregar, a gente pegue as metas do 'localStorage'.
//? 3. Importei e usei a função 'calculateGoalTotals' (que eu fiz em outro arquivo!)
//? para somar o valor de todos os depósitos que o usuário já fez.
//? 4. E a parte mais importante: em vez de definir o estado da página manualmente,
//? eu criei uma lógica automática. Agora a página se comporta assim:
//? - Se a lista de metas estiver vazia, o estado é 'empty'.
//? - Se tiver metas, mas o valor total dos depósitos for zero, o estado é 'goalNoDeposit'.
//? - Se tiver metas e o valor total for maior que zero, o estado é 'complete'.
//? Isso garante que os cartões e as mensagens de "caixa vazia" apareçam certinho,
//? de forma totalmente automática, sem eu precisar mudar o código a cada vez!
//? Além disso, eu passei a lista de metas como uma 'prop' para o 'AcquisitionCard',
//? pra que ele possa fazer os cálculos e mostrar os valores reais na tela.

export default function HomePage() {
  const [goals, setGoals] = useState([]);
  const navigate = useNavigate();

  const [totalCurrent, setTotalCurrent] = useState(0);
  const [lastDeposits, setLastDeposits] = useState([]); // ✅ Estado para os últimos depósitos

  useEffect(() => {
    const savedGoals = JSON.parse(localStorage.getItem("goals") || "[]");
    setGoals(savedGoals);

    const { totalCurrent } = calculateGoalTotals(savedGoals);
    setTotalCurrent(totalCurrent);

    // ✅ Nova lógica para extrair os últimos depósitos
    const allDeposits = savedGoals
      .filter((goal) => goal.goalType === "sequencial" && goal.completedDeposits)
      .flatMap((goal) =>
        goal.completedDeposits.map((depositNum) => ({
          title: goal.title,
          value: depositNum,
          date: new Date(), // Simulação de data
        }))
      );

    // Ordena por data e pega os últimos 3
    const sortedDeposits = allDeposits.sort((a, b) => b.date - a.date).slice(0, 3);
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
            <DepositBox> 
              {lastDeposits.length > 0 ? ( 
                lastDeposits.map((deposit, index) => (
                  <div key={index} className="last-deposit-item">
                    <span>{deposit.title}</span>
                    <span>+ R${deposit.value},00</span>
                  </div>
                ))
              ) : (
                // ✅ Mostra o EmptyState se não houver depósitos
                <EmptyState
                  text={emptyStates.deposit.text}
                  buttonLabel={emptyStates.deposit.buttonLabel}
                  onClick={() => navigate(emptyStates.deposit.route)}
                />
              )}
            </DepositBox>
          </>
        )}
      </HomeFadeIn>
    </div>
  );
}