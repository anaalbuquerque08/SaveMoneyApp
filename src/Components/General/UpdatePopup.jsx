import React, { useState, useEffect } from "react";
import "../../styles/updatePopup.css";  

const CURRENT_VERSION = "1.2.0"; // Mude isso para o popup aparecer de novo no futuro

export default function UpdatePopup() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const lastSeen = localStorage.getItem("app_version");
        if (lastSeen !== CURRENT_VERSION) {
            setIsOpen(true);
        }
    }, []);

    const closePopup = () => {
        localStorage.setItem("app_version", CURRENT_VERSION);
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="update-overlay">
            <div className="update-modal">
                <div className="update-header">
                    <h3>{t("updates.title", "Novidades!")} 🚀</h3>
                </div>
                
                <ul className="update-list">
                    <li><strong>{t("updates.new", "Novo:")}</strong> {t("updates.desc1", "Desafios Sequenciais e em Blocos.")}</li>
                    <li><strong>{t("updates.ui", "Visual:")}</strong> {t("updates.desc2", "Cards mais bonitos e novos ícones.")}</li>
                </ul>

                <button className="update-btn" onClick={closePopup}>
                    {t("updates.button", "Vamo juntar!")}
                </button>
            </div>
        </div>
    );
}