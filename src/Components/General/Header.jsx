import React from "react"; 
import "../../styles/general/header.css"; 
import OptionsHeader from "./OptionsHeader"; 
import HeaderContent from "../Home/HeaderContent";

export default function Header({ showButton = true ,showContent = true  }) {
  return (
    <div className="header">
      <OptionsHeader showButton={showButton} />
      <HeaderContent showContent={showContent}/>
    </div>
  );
}
