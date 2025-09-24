import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import "../../styles/general/header.css";
import ShowUp from "../General/AnimatedPage/ShowUp";

export default function HeaderContent({ showContent = true }) {

  const navigate = useNavigate();
  return (
    <div className="headerContainer">
      {showContent && (
        <>
          <div className="text">Quer começar a juntar?</div>
          <ShowUp>
            <button className="bttnHeader" onClick={() => navigate("/create-goal")}>
              <div>
                <FaPlus size={14} />
              </div>
              <p>Criar meta</p>
            </button>
          </ShowUp>
        </>
      )}
    </div>
  );
}
