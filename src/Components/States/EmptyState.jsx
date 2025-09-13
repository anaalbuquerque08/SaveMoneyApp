import React from "react";
import "../../styles/general/emptyState.css";  
import { FaPlus } from "react-icons/fa6";

export default function EmptyState({ text, buttonLabel, onClick, icon: Icon }) {
  return (
    <div className="empty-state"> 
      <p className="empty-state__text">
        {text}
      </p>
      <button className="empty-state__button" onClick={onClick}>
       <FaPlus  size={14}  /> {buttonLabel}
      </button>
    </div>
  );
}
