const som = document.querySelector('#som');
const usd = document.querySelector('#usd');
const eur = document.querySelector('#eur');

const fetchData = async () => {
    try {
        const response = await fetch('../data/converter.json');
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        return await response.json();
    } catch (error) {
        console.error('There was a problem fetching data:', error);
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
            targetElement.value = ''; // Очистка значения, если ввод пустой
        }
    } catch (error) {
        console.error('Conversion error:', error);
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