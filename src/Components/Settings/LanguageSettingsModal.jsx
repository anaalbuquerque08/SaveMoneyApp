import React from 'react';
import { useTranslation } from 'react-i18next'; 
export default function LanguageSettingsModal({ isOpen, onClose, onSelect, lang }) {
    const { t } = useTranslation();

    if (!isOpen) return null;
 
    const handleSelectLanguage = (newLang) => {
        onSelect(newLang);
    };

    return ( 
        <div className="language-modal-overlay" onClick={onClose}>
            <div className="language-modal-content" onClick={e => e.stopPropagation()}>
                <h3>{t('settings.language_label')}</h3>

                {/* Opção Português */}
                <button
                    className={`lang-option ${lang === 'pt' ? 'selected' : ''}`}
                    onClick={() => handleSelectLanguage('pt')}
                >
                    Português
                </button>

                {/* Opção Inglês */}
                <button
                    className={`lang-option ${lang === 'en' ? 'selected' : ''}`}
                    onClick={() => handleSelectLanguage('en')}
                >
                    English
                </button>
                
                {/* Opção Espanhol */}
                <button
                    className={`lang-option ${lang === 'es' ? 'selected' : ''}`}
                    onClick={() => handleSelectLanguage('es')}
                >
                    Español
                </button>

                <button className="modal-close-btn" onClick={onClose}>
                    {t('common.close_button', 'Fechar')}
                </button>
            </div>
        </div>
    );
}