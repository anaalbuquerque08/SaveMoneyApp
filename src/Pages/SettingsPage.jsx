import React, { useState, useEffect } from "react";
import GeneralFadeIn from "../Components/General/AnimatedPage/GeneralFadeIn";
import Header from '../Components/General/Header';
import { useTranslation } from 'react-i18next';
import LanguageSettingsModal from "../Components/Settings/LanguageSettingsModal";
// 2. Importa o novo modal de Moeda
import CurrencySettingsModal from "../Components/Settings/CurrencySettingsModal"; 

import translation from "../assets/icons/translation.png";
import notification from "../assets/icons/notification.png";
import suport from "../assets/icons/suport.png";
import information from "../assets/icons/information.png"; 
import moneyIcon from "../assets/icons/coin.png"; 

import "../styles/settingsPage/settingsPage.css";
 
const getInitialCurrency = () => {
    return localStorage.getItem('currencyPreference') || 'BRL';
};

const settingsData = [
    { titleKey: "settings.language_label", icon: translation, iconType: "image", type: "modal" }, 
    { titleKey: "settings.currency_label", icon: moneyIcon, iconType: "image", type: "currency_modal" },
    { titleKey: "settings.notifications", icon: notification, iconType: "image", type: "toggle" },
    { titleKey: "settings.support_label", icon: suport, iconType: "image", type: "action" },
    { titleKey: "settings.about_label", icon: information, iconType: "image", type: "navigation" },
];


export default function SettingsPage() {
    const { t, i18n } = useTranslation();
    const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false); 
    const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false); 
     
    const [currentCurrency, setCurrentCurrency] = useState(getInitialCurrency);
 
    useEffect(() => {
        localStorage.setItem('currencyPreference', currentCurrency);
    }, [currentCurrency]);

    const currentLang = i18n.language.startsWith('es') ? 'es' : (i18n.language.startsWith('en') ? 'en' : 'pt');

    const handleLanguageChange = (newLang) => {
        i18n.changeLanguage(newLang);
        setIsLanguageModalOpen(false);
        alert(t('settings.language_changed'));
    };
     
    const handleCurrencyChange = (newCurrencyCode) => {
        setCurrentCurrency(newCurrencyCode);
        setIsCurrencyModalOpen(false); 
    };

    const handleSettingClick = (type) => {
        if (type === 'modal') {
            setIsLanguageModalOpen(true);
        } else if (type === 'currency_modal')  
            setIsCurrencyModalOpen(true); 
    }

    return (
        <div className="page">
            <Header type="settings" showButton={true} showContent={false} showEyeButton={false} />
            <GeneralFadeIn>

                <div className="settings-page">

                    <div className="settings-grid-container">
                        {settingsData.map((setting, index) => (
                            <div key={setting.titleKey} className="setting-item-box-container">
                                <div
                                    className="setting-item-box"
                                    onClick={() => handleSettingClick(setting.type)}
                                >
                                    {setting.iconType === "image" ? (
                                        <img
                                            src={setting.icon}
                                            alt={t(setting.titleKey)}
                                            className="setting-icon-img"
                                        />
                                    ) : (
                                        <setting.icon size={30} className="setting-icon" />
                                    )}

                                    <p>{t(setting.titleKey)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <LanguageSettingsModal
                    isOpen={isLanguageModalOpen}
                    onClose={() => setIsLanguageModalOpen(false)}
                    onSelect={handleLanguageChange}
                    lang={currentLang}
                />
                
                {/* 9. Renderiza o novo modal de Moeda */}
                <CurrencySettingsModal
                    isOpen={isCurrencyModalOpen}
                    onClose={() => setIsCurrencyModalOpen(false)}
                    currentCurrency={currentCurrency}
                    onSelectCurrency={handleCurrencyChange}
                />
            </GeneralFadeIn>
        </div>
    );
}