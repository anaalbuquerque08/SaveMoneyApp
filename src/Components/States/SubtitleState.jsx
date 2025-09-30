import React from "react";
import { useNavigate } from "react-router-dom";
import { TfiMoreAlt } from "react-icons/tfi";
import "../../styles/general/subtitleContainer.css";
import { useTranslation } from 'react-i18next'; 
export default function SubtitleContainer({ children, showButton = true }) {
  const navigate = useNavigate();
  const { t } = useTranslation(); 
  const content = typeof children === 'string' ? t(children) : children;

  return (
    <div className="subtitle-container"> 
      <p className="subtitle">{content}</p>
      {showButton && (
        <button
          className="setting-bttn"
          onClick={() => navigate("/settings")}
        >
          <TfiMoreAlt />
        </button>
      )}
    </div>
  );
}