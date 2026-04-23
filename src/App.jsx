import { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./Pages/HomePage";
import GoalsPage from "./Pages/GoalsPage";
import CreateGoalPage from "./Pages/CreateGoalPage";
import InformationPage from "./Pages/InformationPage";
import SettingsPage from "./Pages/SettingsPage";
import GoalDetailsPage from "./Pages/GoalDetailsPage";
import AppBar from "./Components/General/AppBar";

import "./i18n/config";
import "./App.css";

import { useClickSound } from "./hooks/useSound";

function App() {
  const [loading, setLoading] = useState(true);
  const playSound = useClickSound();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Usamos useCallback para evitar que a função seja recriada sem necessidade
  const handleGlobalClick = useCallback(
    (event) => {
      const isButton =
        event.target.closest("button") ||
        event.target.closest(".update-btn") ||
        event.target.closest(".clickable-element");

      if (isButton) {
        playSound();
      }
    },
    [playSound],
  );

  useEffect(() => {
    if (loading) return;

    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, [loading, handleGlobalClick]);

  if (loading) {
    return (
      <div className="splash-screen">
        <img src="/icons/coin.png" alt="Depozy Logo" className="splash-logo" />
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
