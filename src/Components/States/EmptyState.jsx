// src/Components/States/EmptyState.jsx
import React from "react";
import "../../styles/general/emptyState.css";  
import { FaPlus } from "react-icons/fa6"; 

export default function EmptyState({ img, text, buttonLabel, onClick, icon: Icon }) {
  return (
    <div className="empty-state">  
      {img && <img src={img} alt="empty" className="empty-state__img" />}
      {Icon && <Icon size={32} />}
      <p className="empty-state__text">{text}</p>
      <button className="empty-state__button" onClick={onClick}>
        <FaPlus size={14} /> {buttonLabel}
      </button>
    </div>
  );
}
