import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import happyPig from "/pig/happy-pig.svg";
import {
    generateSequentialChallenge,
    calculateSequentialSum,
    generateBlockChallenge,
    generateFixedChallenge,
} from "../utils/goalCalculations";

import GeneralFadeIn from "../Components/General/AnimatedPage/GeneralFadeIn";
import SubtitleContainer from "../Components/States/SubtitleState";
import Header from "../Components/General/Header";
import subtitleStates from "../constants/subtitleStates";
import availableIcons from "../constants/goalIcons";
import "../styles/createGoalPage/createGoalPage.css";

const MAX_DEPOSITS_SEQUENTIAL = 447;
const MIN_FIXED_DEPOSIT = 1;

export default function CreateGoalsPage() {
    const { t } = useTranslation();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [goalType, setGoalType] = useState("blocos");
    const [targetValue, setTargetValue] = useState("");
    const [fixedDepositValue, setFixedDepositValue] = useState("");
    const [dropdownType, setDropdownType] = useState(false);
    const [icon, setIcon] = useState(availableIcons[0].icons[0]);

    const [dropdown, setDropdown] = useState(false);
    const [challengeInfo, setChallengeInfo] = useState(null);
    const [challengeDisplay, setChallengeDisplay] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (goalType === "sequencial") {
            const maxChallengeValue = calculateSequentialSum(MAX_DEPOSITS_SEQUENTIAL);
            setChallengeDisplay({

                type: t("goals.details.sequential_challenge_title"),
                description: t("goals.challenge.sequential_description"),
                maxInfo: t("goals.challenge.sequential_max_info", { value: maxChallengeValue }),
            });
        } else if (goalType === "blocos") {
            setChallengeDisplay({
                type: t("goals.details.block_challenge_title"),
                description: t("goals.challenge.block_description"),
                maxInfo: t("goals.challenge.block_max_info"),
            });
        } else if (goalType === "fixo") {
            setChallengeDisplay({
                type: t("goals.details.fixed_challenge_title"),
                description: t("goals.challenge.fixed_description"),
                maxInfo: t("goals.challenge.fixed_min_info", { value: MIN_FIXED_DEPOSIT }),
            });
        } else {
            setChallengeDisplay(null);
        }
        setTargetValue("");
        setFixedDepositValue("");
        setChallengeInfo(null);
    }, [goalType, t]);

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
            <Header type="home" showButton={true} showContent={false} showEyeButton={false} />
            <GeneralFadeIn>
                <SubtitleContainer showButton={true}>
                    {subtitleStates.create.text}
                </SubtitleContainer>

                <div className="goal-form">
                    <section className="icon-and-input-row">

                        <div className={`icon-selector-container ${dropdown ? "is-open" : ""}`} style={{ zIndex: dropdown ? 100 : 1 }}>
                            <div
                                className={`selected-icon-box ${dropdown ? "active" : ""}`}
                                onClick={() => {
                                    setDropdown(!dropdown);
                                    setDropdownType(false);
                                }}
                            >
                                <img src={icon} alt={t("goals.alt.selected_icon")} />
                                <FaChevronDown size={16} />
                            </div>

                            <div className={`icon-options-dropdown ${dropdown ? "active" : ""}`}>
                                {availableIcons.map((category, index) => (
                                    <React.Fragment key={index}>
                                        <div className="icon-dropdown-container" >
                                            <div className="icon-category-title">{t(category.title)}</div>
                                            <div className="icon-category-icons">
                                                {category.icons.map((img) => (
                                                    <button
                                                        key={img}
                                                        type="button"
                                                        onClick={() => {
                                                            setIcon(img);
                                                            setDropdown(false);
                                                        }}
                                                    >
                                                        <img src={img} alt={t("goals.alt.icon")} />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        <div className="input-group">
                            <label className="input-label">{t("goals.input.title_placeholder")}</label>
                            <input
                                type="text"
                                placeholder="Celular Novo..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                maxLength={22}
                                className="custom-input"
                            />
                        </div>
                    </section>

                    <div className="input-group">
                        <label className="input-label">{t("goals.input.description_placeholder")}</label>
                        <input
                            type="text"
                            placeholder="Descreva o seu objetivo..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value.substring(0, 70))}
                            className="custom-input"
                        />
                    </div>

                    <div className={`type-selector-container ${dropdownType ? "is-open" : ""}`} style={{ zIndex: dropdownType ? 100 : 1 }}>
                        <div
                            className={`selected-type-box ${dropdownType ? "active" : ""} ${goalType}`}
                            onClick={() => {
                                setDropdownType(!dropdownType);
                                setDropdown(false);
                            }}
                        >
                            <span>{t(`goals.type.${goalType === 'blocos' ? 'blocks' : goalType === 'sequencial' ? 'sequential' : 'fixed'}`)}</span>
                            <FaChevronDown size={14} />
                        </div>

                        <div className={`type-options-dropdown ${dropdownType ? "active" : ""}`}>
                            <button type="button" onClick={() => { setGoalType("blocos"); setDropdownType(false); }}>
                                {t("goals.type.blocks")}
                            </button>
                            <button type="button" onClick={() => { setGoalType("sequencial"); setDropdownType(false); }}>
                                {t("goals.type.sequential")}
                            </button>
                            <button type="button" onClick={() => { setGoalType("fixo"); setDropdownType(false); }}>
                                {t("goals.type.fixed")}
                            </button>
                        </div>
                    </div>
                    {/* INFORMACOES*/}
                    {challengeDisplay && (
                        <div className="challenge-card-info">
                            <div className="challenge-card-text-container">

                                <h3 className="challenge-card-type-title">
                                    {challengeDisplay.type}
                                </h3>

                                <p className="challenge-card-description">
                                    {challengeDisplay.description}
                                </p>
                            </div>


                            <img src={happyPig} alt="Piggy" className="challenge-card-piggy" />
                        </div>
                    )}


                    <div className="input-group">
                        <label className="input-label">{t("goals.input.target_value_label")}
                        </label>

                        <input
                            type="number"
                            inputMode="numeric"
                            placeholder={
                                challengeDisplay?.maxInfo ||
                                t("goals.input.target_value_placeholder")
                            }
                            value={targetValue}
                            onChange={(e) => setTargetValue(e.target.value)}
                            max={100000}
                            className="custom-input"
                        />
                    </div>
                    {goalType === "fixo" && (
                        <input
                            type="number"
                            inputMode="numeric"
                            placeholder={t("goals.input.fixed_deposit_placeholder")}
                            value={fixedDepositValue}
                            onChange={(e) => setFixedDepositValue(e.target.value)}
                        />
                    )}


                    {challengeInfo && goalType === "sequencial" && (
                        <div className="challenge-info-result">
                            <p>{t("goals.result.sequential_deposits", { target: targetValue, deposits: challengeInfo.totalDeposits })}</p>
                            <p>{t("goals.result.final_value", { value: challengeInfo.finalValue })}</p>
                        </div>
                    )}

                    {challengeInfo && goalType === "blocos" && (
                        <div className="challenge-info-result">
                            <p>{t("goals.result.block_deposits", { target: targetValue, deposits: challengeInfo.totalDeposits })}</p>
                        </div>
                    )}

                    {challengeInfo && goalType === "fixo" && (
                        <div className="challenge-info-result">
                            <p>{t("goals.result.fixed_deposits", { target: targetValue, deposits: challengeInfo.totalDeposits, fixed: fixedDepositValue })}</p>
                            <p>{t("goals.result.final_value", { value: challengeInfo.finalValue })}</p>
                        </div>
                    )}



                    <div className="add-goal-button-container">
                       <button
                        onClick={addGoal}
                        className={`add-goal-btn `}
                        disabled={!title || !targetValue || !challengeInfo}
                    >
                        {t("goals.add_goal_button")}
                    </button>  
                    </div>
                   
 




                </div>
            </GeneralFadeIn>
        </div>
    );
}
