 
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