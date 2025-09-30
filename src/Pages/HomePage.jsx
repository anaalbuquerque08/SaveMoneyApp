import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { calculateGoalTotals } from "../utils/goalCalculations";
import { useTranslation } from 'react-i18next';
import { getCurrencyDataByLanguage } from "../utils/currencyUtils";  

//* Components
import Header from "../Components/General/Header";
import SubtitleContainer from "../Components/States/SubtitleState";
import AcquisitionCard from "../Components/Home/AcquisitionCard";
import DepositBox from "../Components/States/DepositBox";
import EmptyState from "../Components/States/EmptyState";

//* Constants
import emptyStates from "../Constants/emptyStates";
import subtitleStates from "../Constants/subtitleStates";

//* Animations
import HomeFadeIn from "../Components/General/AnimatedPage/HomeFadeIn";

//* Styles
import "../styles/general/variables.css";

const getInitialVisibility = () => {
    const saved = localStorage.getItem('valuesVisible');
    return saved === null ? true : JSON.parse(saved);
};


export default function HomePage() {
    const { i18n } = useTranslation();
    const [goals, setGoals] = useState([]);
    const navigate = useNavigate();

    const [totalCurrent, setTotalCurrent] = useState(0);
    const [lastDeposits, setLastDeposits] = useState([]);

    const [valuesVisible, setValuesVisible] = useState(getInitialVisibility);

    const toggleValues = (isVisible) => {
        setValuesVisible(isVisible);
    };

    useEffect(() => {
        localStorage.setItem('valuesVisible', JSON.stringify(valuesVisible));
    }, [valuesVisible]);


    useEffect(() => {
        const savedGoals = JSON.parse(localStorage.getItem("goals") || "[]");
        setGoals(savedGoals);

        const { totalCurrent } = calculateGoalTotals(savedGoals);
        setTotalCurrent(totalCurrent);

        const allDeposits = savedGoals
            .filter((goal) => goal.completedDeposits && goal.completedDeposits.length > 0)
            .flatMap((goal) =>
                goal.completedDeposits.map((deposito) => {
                    return {
                        title: goal.title,
                        value: deposito.value,
                        timestamp: deposito.timestamp,
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
 

    const formatDepositValue = (value) => { 
        const { symbol: currencyPrefix, locale: currentLocale } = getCurrencyDataByLanguage(i18n.language);

        if (valuesVisible) {
            const formattedValue = value.toLocaleString(currentLocale, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
            return `+ ${currencyPrefix} ${formattedValue}`; 
        }
        return `+ ${currencyPrefix} •••••`;  
    }

    const getMaskClass = () => {
        return !valuesVisible ? 'masked-text' : '';
    };

    return (
        <div className="home-page">
            <Header
                type="home"
                showButton={false}
                onToggle={toggleValues}
                valuesVisible={valuesVisible}
            />
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

                        <AcquisitionCard goals={goals} valuesVisible={valuesVisible} />

                        <SubtitleContainer text={subtitleStates.deposit.text} showButton={false} />
                        <DepositBox>
                            {lastDeposits.length > 0 ? (
                                lastDeposits.map((deposit, index) => (
                                    <div key={index} className="last-deposit-item">
                                        <span>{deposit.title}</span>
                                        <span className={getMaskClass()}>
                                            {formatDepositValue(deposit.value)}
                                        </span>
                                    </div>
                                ))
                            ) : (
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