let addToCart = document.querySelector("#add-to-cart");
addToCart.addEventListener('click', submitRoll);


let cartSetDetailPage = new Set();


function submitRoll(){
    const rollItemName = document.querySelector('#detail-header');
    const itemNameText = rollItemName.textContent;

    const rollItemGlaze = document.querySelector('#glazing');
    const itemGlazeText = rollItemGlaze.options[rollItemGlaze.selectedIndex].text;

    const rollItemSize = document.querySelector('#pack-size');
    const itemSizeValue = rollItemSize.options[rollItemSize.selectedIndex].value;

    const rollItemPrice = document.querySelector('#final');
    const itemPriceValue = rollItemPrice.textContent;

    //console.log(tempRoll.type);

    const tempTypeArray = itemNameText.split(" ");

    const rollItem = new Roll(tempTypeArray[0], itemGlazeText, itemSizeValue, itemPriceValue);
    cartSetDetailPage.add(rollItem);
    //console.log(cartSetDetailPage);
    if (localStorage.getItem('storedItems') == null){
        saveToLocalStorage;
    } else {
        addToLocalStorage(rollItem);
    }

}

function saveToLocalStorage(){
    const rollCartArray = Array.from(cartSetDetailPage);
    const rollCartArrayString = JSON.stringify(rollCartArray);
    localStorage.setItem('storedItems', rollCartArrayString);
    //console.log(rollCartArray);
    
}

function addToLocalStorage(newRoll){
    const rollCartArrayString = localStorage.getItem('storedItems');
    let rollCartArrayNew = JSON.parse(rollCartArrayString);
    rollCartArrayNew.push(newRoll);
    console.log(rollCartArrayNew);
    const rollCartArrayStringNew = JSON.stringify(rollCartArrayNew);
    localStorage.setItem('storedItems', rollCartArrayStringNew);
}