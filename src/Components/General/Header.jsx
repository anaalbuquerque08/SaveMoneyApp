import React from "react"; 
import "../../styles/general/header.css"; 
import OptionsHeader from "./OptionsHeader"; 
import HeaderContent from "../Home/HeaderContent";

export default function Header({ 
  showButton = true, 
  showContent = true, 
  onToggle,          
  valuesVisible      
}) {
  return (
    <div className="header"> 
      <OptionsHeader 
        showButton={showButton} 
        onToggle={onToggle}
        valuesVisible={valuesVisible}
      />
      <HeaderContent showContent={showContent}/>
    </div>
  );
}