import React from "react"; 
import "../../styles/general/depositeBox.css"; 

export default function DepositBox({ children }) {
  return (
    <div className="deposit-box"> 
      <div className="deposit-box__content">
        {children}
      </div> 
    </div>
  );
}
