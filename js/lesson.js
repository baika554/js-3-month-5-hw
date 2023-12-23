const som = document.querySelector('#som');
const usd = document.querySelector('#usd');
const eur = document.querySelector('#eur');

const fetchData = async () => {
    try {
        const response = await fetch('../data/converter.json');
    } catch (error) {
        console.error('Не удалось получить данные:', error);
        return null;
    }
};

const convertCurrency = async (element, targetElement, current, data) => {
    try {
        switch (current) {
            case 'som':
                targetElement.value = (element.value / data.usd).toFixed(2);
                break;
            case 'usd':
                targetElement.value = (element.value * data.usd).toFixed(2);
                break;
            case 'eur':
                if (targetElement === som) {
                    targetElement.value = (element.value * data.eur / data.usd).toFixed(2);
                } else if (targetElement === usd) {
                    targetElement.value = (element.value * data.eur).toFixed(2);
                }
                break;
            default:
                break;
        }
        if (element.value === '') {
            targetElement.value = ''; 
        }
    } catch (error) {
        console.error('Ошибка конвертации:', error);
    }
};

const handleInputChange = async (element, targetElement, current) => {
    const data = await fetchData();
    if (data) {
        convertCurrency(element, targetElement, current, data);
    }
};

som.addEventListener('input', () => {
    handleInputChange(som, usd, 'som');
});

usd.addEventListener('input', () => {
    handleInputChange(usd, som, 'usd');
});

eur.addEventListener('input', () => {
    handleInputChange(eur, som, 'eur');
    handleInputChange(eur, usd, 'eur');
});
