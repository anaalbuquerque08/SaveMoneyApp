import React from "react"; 
import GeneralFadeIn from "../Components/General/AnimatedPage/GeneralFadeIn";
import cone from "../assets/icons/cone.png";
 

export default function InformationPage() {
  return (
  <GeneralFadeIn>  
    <div className="em-obra">
      <img src={cone}  alt="Cone de aviso" />
       <h4>Em obra</h4> 

 <p>Estamos construindo o app...</p> 
    </div>
 
  </GeneralFadeIn>



  );
}
