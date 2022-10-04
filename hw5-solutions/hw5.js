let total = 0.0;
let totalCartPrice = document.querySelector('#total-price');


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
//for cart
class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glaze = rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;

        this.element = null;
    }
}

let initialCart = [
    {
        type: 'Original',
        glazing: 'Sugar milk',
        size: 1,
        basePrice: rolls['Original'].basePrice,
    },
    {
        type: 'Walnut',
        glazing: 'Vanilla milk',
        size: 12,
        basePrice: rolls['Walnut'].basePrice,
    },
    {
        type: 'Raisin',
        glazing: 'Sugar milk',
        size: 3,
        basePrice: rolls['Raisin'].basePrice,
    },
    {
        type: 'Apple',
        glazing: 'Keep original',
        size: 3,
        basePrice: rolls['Apple'].basePrice,
    },
]

let cart = new Set();

//hw5 initialize cart
function addNewItem(item){
    let itemGlaze = 0.0;
    let itemSize = 0;
    //find glaze extra
    for (let j = 0; j < glazeOptions.length; j += 1){
        if (item.glazing == glazeOptions[j].glaze) {
            itemGlaze = glazeOptions[j].price;
            console.log(itemGlaze);
        }
    }
    //find size extra
    for (let k = 0; k < sizeOptions.length; k += 1){
        if (item.size === sizeOptions[k].size) {
            itemSize = sizeOptions[k].price;
            console.log(itemSize);
        }
    }
    //calculate price
    let calculatedPrice = ((item.basePrice + itemGlaze) * itemSize).toFixed(2);
    let cartItem = new Roll(item.type, item.glazing, item.size, calculatedPrice);
    cart.add(cartItem);
}

console.log(cart);


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
  
    itemImageElement.src = './assets/products/' + rolls[String(item.type)].imageFile;
    itemNameElement.innerText = item.type + ' Cinnamon Roll';
    itemGlazeElement.innerText = 'Glazing: ' + item.glaze;
    itemSizeElement.innerText = 'Pack Size: ' + item.size;
    itemPriceElement.innerText = '$' + item.basePrice;
    total += parseFloat(item.basePrice);
    updateTotalPrice();
}
  
function deleteItem(item) {
    item.element.remove();
    cart.delete(item);
    total -= parseFloat(item.basePrice);
    updateTotalPrice();
}

for (let i = initialCart.length-1; i > -1 ; i -= 1) {
    let item = addNewItem(initialCart[i]);
}

for (const item of cart) {
    console.log(item);
    createElement(item);
}

//update total price
function updateTotalPrice(){
    totalCartPrice.innerText = '$' + total.toFixed(2);
}
console.log(total);

