BASE_URL = 'https://v6.exchangerate-api.com/v6/af069b0c10166010974333f2/pair';
let addCurrency = document.querySelectorAll('select');
let flagURL1 = document.querySelector('.fromImg');
let flagURL2 = document.querySelector('.toImg');
let calc = document.querySelector('button');
let fromAm = document.querySelector('#from');
let toAm = document.querySelector('#to');
let res = document.querySelector('.msg h3');
let exchange = document.querySelector('i');
console.log(exchange);

for (let addCurrencys of addCurrency) {
    for (code in countryList) {
        let ele = document.createElement('option');
        ele.innerText = countryList[code];
        ele.value = code;
        if (addCurrencys.id == 'from' && code == 'USD') {
            ele.selected = 'selected';
        }
        if (addCurrencys.id == 'to' && code == 'INR') {
            ele.selected = 'selected';
        }
        addCurrencys.append(ele);
    }
    addCurrencys.addEventListener('change', (e) => {
        updateFlag(e.target);
    });
}

const updateFlag = (e) => {
    if (e.id == 'from') {
        flagURL1.src = `https://flagsapi.com/${
            countryList[e.value]
        }/flat/64.png`;
    } else {
        flagURL2.src = `https://flagsapi.com/${
            countryList[e.value]
        }/flat/64.png`;
    }
};

calc.addEventListener('click', (e) => {
    e.preventDefault();
    updateAmount();
});

const updateAmount = async () => {
    let amount = document.querySelector('input').valueAsNumber;
    console.log(fromAm.value);
    console.log(toAm.value);
    const URL = BASE_URL + '/' + fromAm.value + '/' + toAm.value;
    let response = await fetch(URL);
    let data = await response.json();
    let final = data.conversion_rate;
    res.innerText = `${amount} ${fromAm.value} = ${final * amount} ${
        toAm.value
    }`;
};

exchange.addEventListener('click', () => {
    [flagURL1.src, flagURL2.src] = [flagURL2.src, flagURL1.src];
    [fromAm.value, toAm.value] = [toAm.value, fromAm.value];
});
