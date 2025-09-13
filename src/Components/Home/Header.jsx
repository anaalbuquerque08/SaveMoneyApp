import React from "react";
import { motion } from "framer-motion";
import "../../styles/home/header.css";
import { FaPlus } from "react-icons/fa6";
import OptionsHeader from "../General/OptionsHeader";
import ShowUp from "../General/AnimatedPage/ShowUp";

export default function Header({ showButton = true }) {
  return (
    <div className="header">
      <OptionsHeader showButton={showButton} />
      <div className="headerContainer">
        <div className="text">Quer começar a juntar?</div>
      <ShowUp>
          <button className="bttnHeader">
            <div>
              <FaPlus size={14} />
            </div>
            <p>Criar meta</p>
          </button> 
      </ShowUp>
      </div>
    </div>
  );
}
