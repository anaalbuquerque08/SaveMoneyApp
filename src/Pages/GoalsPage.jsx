import React, { useEffect, useState } from "react"; 
import GeneralFadeIn from "../Components/General/AnimatedPage/GeneralFadeIn";
import SubtitleContainer from "../Components/States/SubtitleState";
import Header from "../Components/General/Header"; 
import subtitleStates from "../Constants/subtitleStates"; 
import GoalsList from "../Components/General/GoalsList"; 
import "../styles/goalsPage/goalsPage.css";
 
const getInitialVisibility = () => {
    const saved = localStorage.getItem('valuesVisible'); 
    return saved === null ? true : JSON.parse(saved); 
};

export default function GoalsPage() {
    const [goals, setGoals] = useState([]);
     
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
    }, []);

    return ( 
        <div className="page">    
            <Header 
                type="home" 
                showButton={true} 
                showContent={false} 
                onToggle={toggleValues} 
                valuesVisible={valuesVisible}
            />
            
            <GeneralFadeIn>
                <SubtitleContainer text={subtitleStates.goals.text} showButton={true} /> 
                <GoalsList goals={goals} className="goals-list" valuesVisible={valuesVisible} /> 
        
            </GeneralFadeIn>
        </div>
    );
}