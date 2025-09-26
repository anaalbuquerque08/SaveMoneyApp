import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import {
  generateSequentialChallenge,
  calculateSequentialSum,
  generateBlockChallenge,
  generateFixedChallenge,
} from "../utils/goalCalculations";

import GeneralFadeIn from "../Components/General/AnimatedPage/GeneralFadeIn";
import SubtitleContainer from "../Components/States/SubtitleState";
import Header from "../Components/General/Header";
import subtitleStates from "../Constants/subtitleStates";
import availableIcons from "../Constants/goalIcons";
import "../styles/createGoalPage/createGoalPage.css";

const MAX_DEPOSITS_SEQUENTIAL = 447;
const MIN_FIXED_DEPOSIT = 1;

export default function CreateGoalsPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goalType, setGoalType] = useState("blocos");
  const [targetValue, setTargetValue] = useState("");
  const [fixedDepositValue, setFixedDepositValue] = useState("");
  const [icon, setIcon] = useState(availableIcons[0]);
  const [dropdown, setDropdown] = useState(false);
  const [challengeInfo, setChallengeInfo] = useState(null);
  const [challengeDisplay, setChallengeDisplay] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (goalType === "sequencial") {
      const maxChallengeValue = calculateSequentialSum(MAX_DEPOSITS_SEQUENTIAL);
      setChallengeDisplay({
        description:
          "Neste desafio, você fará depósitos com valores em sequência (1, 2, 3, ...).",
        maxInfo: `O valor máximo que o app suporta é de R$ ${maxChallengeValue},00.`,
      });
    } else if (goalType === "blocos") {
      setChallengeDisplay({
        description:
          "Neste desafio, o app irá gerar uma lista de valores aleatórios que somados chegam ao seu valor alvo.",
        maxInfo: "O valor máximo recomendado para este desafio é de R$10.000,00.",
      });
    } else if (goalType === "fixo") {
      setChallengeDisplay({
        description: "Neste desafio, você definirá um valor fixo de depósito.",
        maxInfo: `O valor mínimo por depósito é de R$${MIN_FIXED_DEPOSIT},00.`,
      });
    } else {
      setChallengeDisplay(null);
    }
    setTargetValue("");
    setFixedDepositValue("");
    setChallengeInfo(null);
  }, [goalType]);

  // recalcula sempre que target ou fixed mudar
  useEffect(() => {
    const numericTarget = Number(targetValue);
    const numericFixed = Number(fixedDepositValue);

    if (goalType === "sequencial") {
      if (numericTarget > 0) {
        const maxChallengeValue = calculateSequentialSum(MAX_DEPOSITS_SEQUENTIAL);
        if (numericTarget <= maxChallengeValue) {
          const result = generateSequentialChallenge(numericTarget);
          setChallengeInfo(result);
        } else {
          setChallengeInfo(null);
        }
      }
    }

    if (goalType === "blocos") {
      if (numericTarget > 0) {
        const result = generateBlockChallenge(numericTarget);
        setChallengeInfo(result);
      }
    }

    if (goalType === "fixo") {
      if (
        numericTarget >= MIN_FIXED_DEPOSIT &&
        numericFixed >= MIN_FIXED_DEPOSIT
      ) {
        const result = generateFixedChallenge(numericTarget, numericFixed);
        setChallengeInfo(result);
      } else {
        setChallengeInfo(null);
      }
    }
  }, [goalType, targetValue, fixedDepositValue]);

  const addGoal = () => {
    if (!title || !targetValue || !challengeInfo) return;

    const newGoal = {
      id: Date.now(),
      title,
      description,
      goalType,
      currentValue: 0,
      targetValue:
        goalType === "sequencial"
          ? challengeInfo.finalValue
          : goalType === "fixo"
          ? challengeInfo.finalValue
          : Number(targetValue),
      challengeInfo,
      completedDeposits: [],
      icon,
    };

    const savedGoals = JSON.parse(localStorage.getItem("goals") || "[]");
    savedGoals.push(newGoal);
    localStorage.setItem("goals", JSON.stringify(savedGoals));

    navigate("/goals");
  };

  return (
    <div className="page">
      <Header type="home" showButton={true} showContent={false} />
      <GeneralFadeIn>
        <SubtitleContainer text={subtitleStates.goals.text} showButton={true} />

        <div className="goal-form">
          <section className="icon-and-input-row">
            <div className="icon-selector-container">
              <div
                className="selected-icon-box"
                onClick={() => setDropdown(!dropdown)}
              >
                <img src={icon} alt="Selecionado" />
                <FaChevronDown size={16} />
              </div>

              <div
                className={`icon-options-dropdown ${dropdown ? "active" : ""}`}
              >
                {availableIcons.map((img) => (
                  <button
                    key={img}
                    type="button"
                    className={icon === img ? "selected" : ""}
                    onClick={() => {
                      setIcon(img);
                      setDropdown(false);
                    }}
                  >
                    <img src={img} alt="ícone" />
                  </button>
                ))}
              </div>
            </div>
            <input
              type="text"
              placeholder="Título da meta"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={15}
            />
          </section>

          <input
            type="text"
            placeholder="Descrição (máx. 70 caracteres)"
            value={description}
            onChange={(e) => setDescription(e.target.value.substring(0, 70))}
            maxLength={120}
          />

          <select value={goalType} onChange={(e) => setGoalType(e.target.value)}>
            <option value="blocos">Bloco</option>
            <option value="sequencial">Sequencial</option>
            <option value="fixo">Fixo</option>
          </select>

          {challengeDisplay && (
            <div className="challenge-info">
              <p className="challenge-description">
                {challengeDisplay.description}
              </p>
              <p className="challenge-max-info">{challengeDisplay.maxInfo}</p>
            </div>
          )}

          <input
            type="number"
            placeholder="Valor alvo"
            value={targetValue}
            onChange={(e) => setTargetValue(e.target.value)}
            max={100000}
          />

          {goalType === "fixo" && (
            <input
              type="number"
              placeholder="Valor do depósito (R$)"
              value={fixedDepositValue}
              onChange={(e) => setFixedDepositValue(e.target.value)}
            />
          )}

          {challengeInfo && goalType === "sequencial" && (
            <div className="challenge-info-result">
              <p>
                O valor de R$ {targetValue} será atingido em{" "}
                {challengeInfo.totalDeposits} depósitos.
              </p>
              <p>O valor final será de R$ {challengeInfo.finalValue},00.</p>
            </div>
          )}

          {challengeInfo && goalType === "blocos" && (
            <div className="challenge-info-result">
              <p>
                O valor de R$ {targetValue} será atingido em{" "}
                {challengeInfo.totalDeposits} depósitos.
              </p>
            </div>
          )}

          {challengeInfo && goalType === "fixo" && (
            <div className="challenge-info-result">
              <p>
                O valor de R$ {targetValue} será atingido em{" "}
                {challengeInfo.totalDeposits} depósitos de R${" "}
                {fixedDepositValue},00.
              </p>
              <p>O valor final será de R$ {challengeInfo.finalValue},00.</p>
            </div>
          )}

          <button
            onClick={addGoal}
            className={`goal-btn ${goalType}`}
            disabled={!title || !targetValue || !challengeInfo}
          >
            Adicionar Meta
          </button>
        </div>
      </GeneralFadeIn>
    </div>
  );
}
