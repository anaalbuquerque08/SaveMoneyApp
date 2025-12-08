 
export const formatCurrencyValue = (value) => { 
    const numberValue = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(numberValue)) {
        return 'R$ 0,00';
    }
 
    return numberValue.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
};
 
export const getCurrencyDataByLanguage = (language) => {  
    const lang = language.split('-')[0]; 

    switch (lang) {
        case 'en':
            return { symbol: '$', locale: 'en-US' };
        case 'es': 
            return { symbol: '$', locale: 'es-ES' }; 
        case 'pt':
        default: 
            return { symbol: 'R$', locale: 'pt-BR' };
    }
};