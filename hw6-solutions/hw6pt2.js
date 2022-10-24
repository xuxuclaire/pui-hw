
let total = 0.0;
let totalCartPrice = document.querySelector('#total-price');

//for cart
class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glaze = rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

let cartSetCartPage = new Set();

function addNewItem(type, glazing, size, basePrice){
    /*
    let itemGlaze = 0.0;
    let itemSize = 0;
    //find glaze extra
    for (let j = 0; j < glazeOptions.length; j += 1){
        if (glazing == glazeOptions[j].glaze) {
            itemGlaze = glazeOptions[j].price;
            //console.log(itemGlaze);
        }
    }
    //find size extra
    for (let k = 0; k < sizeOptions.length; k += 1){
        if (size === sizeOptions[k].size) {
            itemSize = sizeOptions[k].price;
            console.log(itemSize);
        }
    }
    //calculate price
    let calculatedPrice = ((basePrice + itemGlaze) * itemSize).toFixed(2);
    */
    let cartItem = new Roll(type, glazing, size, basePrice);
    cartSetCartPage.add(cartItem);
    console.log(cartSetCartPage);
    return cartItem;
}

function createElement(item){
    let template = document.querySelector('#cart-item-template');
    let clone = template.content.cloneNode(true);
    item.element = clone.querySelector('.cart-item');


    const btnDelete = item.element.querySelector('.remove');
    btnDelete.addEventListener('click', () => {
      deleteItem(item);
    });
    
    const itemListElement = document.querySelector('#cart');
    itemListElement.prepend(item.element);
  
    updateElement(item);
}

function updateElement(item) {
    const itemImageElement = item.element.querySelector('.item-img');
    const itemNameElement = item.element.querySelector('.item-name');
    const itemGlazeElement = item.element.querySelector('.item-glaze');
    const itemSizeElement = item.element.querySelector('.item-size');
    const itemPriceElement = item.element.querySelector('h2');
    console.log(String(item.type));

  
    itemImageElement.src = './assets/products/' + rolls[String(item.type)].imageFile;
    itemNameElement.innerText = item.type + ' Cinnamon Roll';
    itemGlazeElement.innerText = 'Glazing: ' + item.glaze;
    itemSizeElement.innerText = 'Pack Size: ' + item.size;
    itemPriceElement.innerText = item.basePrice;
    total += parseFloat(item.basePrice.substring(1));
    updateTotalPrice();
}
  
function deleteItem(item) {
    item.element.remove();
    let result = cartSetCartPage.delete(item);
    console.log(result);
    console.log(item);
    total -= parseFloat(item.basePrice.substring(1));
    //console.log(total);
    updateTotalPrice();
    const rollCartArrayDeleted = Array.from(cartSetCartPage);
    const rollCartArrayStringDeleted = JSON.stringify(rollCartArrayDeleted);
    localStorage.setItem('storedItems', rollCartArrayStringDeleted);
    console.log(cartSetCartPage);
}

for (const item of cartSetCartPage) {
    console.log(item);
    createElement(item);
}

//update total price
function updateTotalPrice(){
    totalCartPrice.innerText = '$' + total.toFixed(2);
}
console.log(total);

//HW 6

function retrieveFromLocalStorage() {
    const rollCartArrayString = localStorage.getItem('storedItems');
    console.log(rollCartArrayString);
    const rollCartArray = JSON.parse(rollCartArrayString);
    for (let itemData of rollCartArray){
        let rollItem = addNewItem(itemData.type, itemData.glaze, itemData.size, itemData.basePrice);
        console.log(rollItem);
        createElement(rollItem);
    }
}

if (localStorage.getItem('storedItems') != null){
    retrieveFromLocalStorage();
}