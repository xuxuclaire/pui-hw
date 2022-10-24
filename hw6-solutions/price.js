
//all update detail page related codes

//get query string from URL
const queryString = window.location.search;

console.log(queryString);

//use queryString to create a URLSearchParam object
const params = new URLSearchParams(queryString);

console.log(params);

//acccess parameter we want using "get" method:
const rollType = params.get('roll');

console.log(rollType);

//use URL parameter to update page

const headerElement = document.querySelector('#detail-header');
let rollName = rollType + ' Cinnamon Roll';
headerElement.innerText = rollName;

const rollImage = document.querySelector('.product-imgs');
rollImage.src = './assets/products/' + rolls[String(rollType)].imageFile;

let basePrice = rolls[String(rollType)].basePrice;



//all price related codes

let glazingExtra = 0.0;
let packExtra = 1;
let currentGlaze = "Keep Original";
let currentSize = "1";

let priceOutput = document.querySelector("#final");
let glazeInput = document.querySelector("#glazing");
let sizeInput = document.querySelector("#pack-size");

priceOutput.innerHTML = "$" + basePrice;

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
    currentGlaze = glazeInput.options[glazeInput.selectedIndex].text;
    console.log(currentGlaze);
    glazingExtra = parseFloat(this.value);
    priceOutput.innerHTML = "$" + ((basePrice + glazingExtra) * packExtra).toFixed(2);
    return currentGlaze;
}

function onSelectSizeChange(){
    currentSize = sizeInput.options[sizeInput.selectedIndex].text;
    //console.log(currentSize);
    packExtra = parseFloat(this.value);
    priceOutput.innerHTML = "$" + ((basePrice + glazingExtra) * packExtra).toFixed(2);
    return currentSize;
}


glazeInput.addEventListener('change', onSelectGlazeChange);
sizeInput.addEventListener('change', onSelectSizeChange);

//for cart
class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glaze = rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

