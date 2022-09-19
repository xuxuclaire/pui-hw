const basePrice = 2.49;
let glazingPrice = 0.0;
let packPrice = 1;

let element = document.querySelector("#final");
const element1 = document.querySelector("#glazing");
const element2 = document.querySelector("#pack-size");

function glazingChange(num){
    const priceChange = num.value;
    if (priceChange == "vanilla milk") {
        glazingPrice = 0.5;
    }
    else if (priceChange == "double chocolate") {
        glazingPrice = 1.5;
    }
    else {
        glazingPrice = 0.0;
    }
    element.innerHTML = "$" + ((basePrice + glazingPrice) * packPrice).toFixed(2);
}

function packSizeChange(num){
    const sizeChange = num.value;
    if (sizeChange == "1"){
        packPrice = 1;
    }
    else if (sizeChange == "3"){
        packPrice = 3;
    }
    else if (sizeChange == "6"){
        packPrice = 5;
    }
    else {
        packPrice = 10;
    }
    element.innerHTML = "$" + ((basePrice + glazingPrice) * packPrice).toFixed(2);
}

console.log(glazingPrice);
console.log(packPrice);
