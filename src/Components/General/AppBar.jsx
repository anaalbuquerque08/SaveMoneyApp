import React from "react";
import { useNavigate, useLocation } from "react-router-dom";  
import "../../styles/general/variables.css";
import "../../styles/general/appbar.css";  

import { FaListUl } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { BiHomeAlt } from "react-icons/bi";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";

export default function AppBar() {
  const navigate = useNavigate();
  const location = useLocation();  

  const routes = [
    { path: "/goals", icon: <FaListUl size={24} /> },
    { path: "/create-goal", icon: <FiPlusCircle size={28} /> },
    { path: "/", icon: <BiHomeAlt size={28} /> },
    { path: "/information", icon: <IoMdInformationCircleOutline size={28} /> },
    { path: "/settings", icon: <IoSettingsOutline size={28} /> },
  ];

  return (
    <div className="appbar">
      <div className="appbarContainer">
        {routes.map((route, index) => {
          const isActive = location.pathname === route.path;
          return (
            <button
              key={index}
              className={`appbar-btn ${isActive ? "active" : ""}`}
              onClick={() => navigate(route.path)}
            >
              {route.icon}
            </button>
          );
        })}
      </div>
    </div>
  ); 
}
