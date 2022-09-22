const basePrice = 2.49;
let glazingExtra = 0.0;
let packExtra = 1;

let priceOutput = document.querySelector("#final");
let glazeInput = document.querySelector("#glazing");
let sizeInput = document.querySelector("#pack-size");

let glazeOptions = [
    {
        glaze: 'Keep original',
        price: 0.00,
    },
    {
        glaze: 'Sugar milk',
        price: 0.00,
    },
    {
        glaze: 'Vanilla milk',
        price: 0.50,
    },
    {
        glaze: 'Double chocolate',
        price: 1.50,
    },
]

let sizeOptions = [
    {
        size: 1,
        price: 1,
    },
    {
        size: 3,
        price: 3,
    },
    {
        size: 6,
        price: 5,
    },
    {
        size: 12,
        price: 10,
    },
]

for (let i = 0; i < glazeOptions.length; i += 1){
    var option = document.createElement('option');
    option.text = glazeOptions[i].glaze;
    option.value = glazeOptions[i].price;
    glazeInput.add(option);
}

for (let i = 0; i < sizeOptions.length; i += 1){
    var option = document.createElement('option');
    option.text = sizeOptions[i].size;
    option.value = sizeOptions[i].price;
    sizeInput.add(option);
}

function onSelectGlazeChange(){
    glazingExtra = parseFloat(this.value);
    priceOutput.innerHTML = "$" + ((basePrice + glazingExtra) * packExtra).toFixed(2);
}

function onSelectSizeChange(){
    packExtra = parseFloat(this.value);
    priceOutput.innerHTML = "$" + ((basePrice + glazingExtra) * packExtra).toFixed(2);
}

glazeInput.addEventListener('change', onSelectGlazeChange);
sizeInput.addEventListener('change', onSelectSizeChange);
