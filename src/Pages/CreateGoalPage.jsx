// src/pages/CreateGoalsPage.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

import { generateSequentialChallenge, calculateSequentialSum } from "../utils/goalCalculations";

import GeneralFadeIn from "../Components/General/AnimatedPage/GeneralFadeIn";
import SubtitleContainer from "../Components/States/SubtitleState";
import Header from "../Components/General/Header";
import subtitleStates from "../Constants/subtitleStates";

import "../styles/createGoalPage/createGoalPage.css";

import car from "../assets/icons/car.png";
import cart from "../assets/icons/cart.png";
import clothes from "../assets/icons/clothes.png";
import food from "../assets/icons/food.png";
import house from "../assets/icons/house.png";
import money from "../assets/icons/moneybag.png";
import selfCare from "../assets/icons/self-care.png";

const availableIcons = [car, cart, clothes, food, house, money, selfCare];
 
const MAX_DEPOSITS_SEQUENTIAL = 447;

export default function CreateGoalsPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goalType, setGoalType] = useState("bloco");
  const [targetValue, setTargetValue] = useState("");
  const [icon, setIcon] = useState(availableIcons[0]);
  const [dropdown, setDropdown] = useState(false);
  const [challengeInfo, setChallengeInfo] = useState(null);
  const [challengeDisplay, setChallengeDisplay] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (goalType === "sequencial") {
      const maxChallengeValue = calculateSequentialSum(MAX_DEPOSITS_SEQUENTIAL);
      setChallengeDisplay({
        description: "Neste desafio, você fará depósitos com valores em sequência (1, 2, 3, ...).",
        maxInfo: `O valor máximo que o app suporta é de R$100.000,00.`,
      });
    } else {
      setChallengeDisplay(null);
    }
    setTargetValue("");
    setChallengeInfo(null);
  }, [goalType]);

  const addGoal = () => {
    if (!title || !targetValue) return;

    const newGoal = {
      id: Date.now(),
      title,
      description,
      goalType,
      currentValue: 0,
      targetValue: goalType === "sequencial" ? challengeInfo.finalValue : Number(targetValue),
      challengeInfo: goalType === "sequencial" ? challengeInfo : null,
      icon,
    };

    const savedGoals = JSON.parse(localStorage.getItem("goals") || "[]");
    savedGoals.push(newGoal);
    localStorage.setItem("goals", JSON.stringify(savedGoals));

    navigate("/goals");
  };

  const handleTargetValueChange = (e) => {
    const value = e.target.value;
    setTargetValue(value);

    if (goalType === "sequencial") {
      const numericValue = Number(value);
      const maxChallengeValue = calculateSequentialSum(MAX_DEPOSITS_SEQUENTIAL);
      if (numericValue > maxChallengeValue) {
        alert(`O valor que você quer juntar é muito alto para este desafio. O valor máximo é R$ ${maxChallengeValue},00.`);
        return;
      }

      if (numericValue > 0) {
        const result = generateSequentialChallenge(numericValue);
        setChallengeInfo(result);
      } else {
        setChallengeInfo(null);
      }
    }
  };

  return (
    <div className="page">
      <Header type="home" showButton={true} showContent={false} />
      <GeneralFadeIn>
        <SubtitleContainer text={subtitleStates.goals.text} showButton={true} />

        <div className="goal-form">
          <section>
            <div className="icon-selector-container">
              <div
                className="selected-icon-box"
                onClick={() => setDropdown(!dropdown)}
              >
                <img src={icon} alt="Selecionado" />
                <IoIosArrowDown size={20} />
              </div>

              <div className={`icon-options-dropdown ${dropdown ? "active" : ""}`}>
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
            />

            <input
              type="text"
              placeholder="Descrição (máx. 70 caracteres)"
              value={description}
              onChange={(e) => setDescription(e.target.value.substring(0, 70))}
              maxLength={120}
            />
          </section>

          <select value={goalType} onChange={(e) => setGoalType(e.target.value)}>
            <option value="bloco">Bloco</option>
            <option value="sequencial">Sequencial</option>
            <option value="fixo">Fixo</option>
          </select>

          {challengeDisplay && (
            <div className="challenge-info">
              <p className="challenge-description">{challengeDisplay.description}</p>
              <p className="challenge-max-info">{challengeDisplay.maxInfo}</p>
            </div>
          )}

          <input
            type="number"
            placeholder="Valor alvo"
            value={targetValue}
            onChange={handleTargetValueChange}
            max={100000}  
          />

          {challengeInfo && (
            <div className="challenge-info-result">
              <p>O valor de R$ {targetValue} será atingido em {challengeInfo.totalDeposits} depósitos.</p>
              <p>O valor final será de R$ {challengeInfo.finalValue},00.</p>
            </div>
          )}

          <button
            onClick={addGoal}
            className={`goal-btn ${goalType}`}
          >
            Adicionar Meta
          </button>
        </div>
      </GeneralFadeIn>
    </div>
  );
}