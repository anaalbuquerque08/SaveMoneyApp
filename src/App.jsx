import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./Pages/HomePage";
import GoalsPage from "./Pages/GoalsPage";
import CreateGoalPage from "./Pages/CreateGoalPage";
import InformationPage from "./Pages/InformationPage";
import SettingsPage from "./Pages/SettingsPage";
import GoalDetailsPage from "./Pages/GoalDetailsPage";

import AppBar from "./Components/General/AppBar";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula carregamento inicial (pode ser assets ou API)
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="splash-screen">
        <img src="/logo.png" alt="Depozy Logo" className="splash-logo" />
        {/* Pode colocar mascote ou animação aqui */}
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path="/goals/:id" element={<GoalDetailsPage />} />
        <Route path="/create-goal" element={<CreateGoalPage />} />
        <Route path="/information" element={<InformationPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
      <AppBar />
    </BrowserRouter>
  );
}

export default App;
