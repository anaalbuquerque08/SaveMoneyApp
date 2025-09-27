import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/general/header.css";
import { MdOutlineRemoveRedEye } from "react-icons/md";  
import { IoChevronBack } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6"; 

export default function OptionsHeader({ showButton = true, onToggle, valuesVisible }) {
  const navigate = useNavigate();

  const toggleValues = () => {
    if (onToggle) {
      onToggle(!valuesVisible);
    }
  };

  return (
    <div className="options">
      {showButton && (
        <button className="bttnheader" onClick={() => navigate(-1)}>
          <IoChevronBack size={22} />
        </button>
      )}
      <button
        className="bttnheader"
        onClick={toggleValues} 
        style={{ background: valuesVisible ? 'var(--yellow-100)' : 'var(--yellow-200)' }}
      > 
        {valuesVisible ? (
          <MdOutlineRemoveRedEye size={22} /> 
        ) : (
          <FaRegEyeSlash size={22} />  
        )}
      </button>
    </div>
  );
}