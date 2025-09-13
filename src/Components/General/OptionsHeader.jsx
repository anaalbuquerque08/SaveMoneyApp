import React from "react";
import { useNavigate } from "react-router-dom"; 
import "../../styles/home/header.css";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoChevronBack } from "react-icons/io5"; 

export default function OptionsHeader({ showButton = true }) {
  const navigate = useNavigate();

  return ( 
    <div className="options">
      {showButton && (
        <button className="bttnheader" onClick={() => navigate(-1)}>
          <IoChevronBack size={22} />
        </button>
      )} 
      <button className="bttnheader">
        <MdOutlineRemoveRedEye size={22} />
      </button>
    </div>
  );
}
