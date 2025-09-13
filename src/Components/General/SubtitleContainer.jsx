import React from "react";
import { useNavigate } from "react-router-dom";
import { TfiMoreAlt } from "react-icons/tfi";
import "../../styles/general/subtitleContainer.css";  

export default function SubtitleContainer({ text, showButton = true }) {
  const navigate = useNavigate();

  return (
    <div className="subtitle-container">
      <p className="subtitle">{text}</p>
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
