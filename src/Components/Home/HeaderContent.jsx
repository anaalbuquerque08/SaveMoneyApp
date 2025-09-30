import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import "../../styles/general/header.css";
import ShowUp from "../General/AnimatedPage/ShowUp";
import { useTranslation } from 'react-i18next';  

export default function HeaderContent({ showContent = true }) {

    const navigate = useNavigate();
    const { t } = useTranslation();  

    return (
        <div className="headerContainer">
            {showContent && (
                <>
                    
                    <div className="text">{t('header.start_saving_question')}</div> 
                    
                    <ShowUp>
                        <button className="bttnHeader" onClick={() => navigate("/create-goal")}>
                            <div>
                                <FaPlus size={14} />
                            </div> 
                            <p>{t('header.create_goal_button')}</p>
                        </button>
                    </ShowUp>
                </>
            )}
        </div>
    );
}