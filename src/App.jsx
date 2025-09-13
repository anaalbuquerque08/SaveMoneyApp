import React from "react";
import "./App.css"; 
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./Pages/HomePage";
import GoalsPage from "./Pages/GoalsPage";
import CreateGoalPage from "./Pages/CreateGoalPage";
import InformationPage from "./Pages/InformationPage";
import SettingsPage from "./Pages/SettingsPage";

import AppBar from "./Components/General/AppBar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path="/create-goal" element={<CreateGoalPage />} />
        <Route path="/information" element={<InformationPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
      <AppBar />
    </BrowserRouter>
  );
}

export default App;
