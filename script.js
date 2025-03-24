const apiKey = '18c80f421cf841e0ac5cb7357a6a7e21';

const fetchRate =  async (targetCurrency) => {

    const url = `http://data.fixer.io/api/latest?access_key=${apiKey}`;

    const response = await fetch(url);
        const data = await response.json();

        if (!data.success) {
            throw new Error('Chyba při načítání');
        }

        const rate = data.rates[targetCurrency];
       

        return rate;
};

const convertCurrency = async () => {
    const amount = parseFloat(document.getElementById('amount').value);
    const targetCurrency = document.getElementById('currency').value;
    
    if (isNaN(amount) || amount <= 0) {
        alert('Zadejte kladnou sumu.');
        return;
    }

    const rate = await fetchRate(targetCurrency);
    if (rate) {
        const convertedAmount = amount * rate;
        document.getElementById('result').textContent = `${amount} EUR = ${convertedAmount.toFixed(2)} ${targetCurrency}`;
    }
};

async function fetchCurrencies() {
    
        const response = await fetch(`https://api.exchangerate.host/symbols?access_key=${apiKey}`);
        const data = await response.json();
        const currencySelect = document.getElementById('currency');
        
        for (const currency in data.symbols) {
            let option = document.createElement('option');
            option.value = currency;
            option.textContent = `${currency} - ${data.symbols[currency]}`;
            currencySelect.appendChild(option);
        }
    
}

fetchCurrencies();

