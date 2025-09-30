import React from 'react';
import { useTranslation } from 'react-i18next';
 
const currencyOptions = [
    { code: 'BRL', symbol: 'R$', name: 'Real Brasileiro' },
    { code: 'USD', symbol: '$', name: 'Dólar Americano' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
];

export default function CurrencySettingsModal({ isOpen, onClose, currentCurrency, onSelectCurrency }) {
    const { t } = useTranslation();

    if (!isOpen) return null;

    return ( 
        <div className="currency-modal-overlay" onClick={onClose}>
            <div className="currency-modal-content" onClick={e => e.stopPropagation()}>
                <h3>{t('settings.currency_label', 'Moeda')}</h3> 

                {currencyOptions.map((option) => (
                    <button
                        key={option.code}
                        className={`currency-option ${currentCurrency === option.code ? 'selected' : ''}`}
                        onClick={() => onSelectCurrency(option.code)}
                    >
                        {option.symbol} - {option.name}
                    </button>
                ))}

                <button className="modal-close-btn" onClick={onClose}>
                    {t('common.close_button', 'Fechar')}
                </button>
            </div>
        </div>
    );
}