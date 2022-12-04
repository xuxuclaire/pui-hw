//for saved list
class Question {
    constructor(currentValue, totalValue, usedProfession, questionDisplayed) {
        this.current = currentValue;
        this.total = totalValue;
        this.profession = usedProfession;
        this.question = questionDisplayed;
    }
}


let savedSetSavedPage = new Set();

function addNewItem(current, total, profession, question){
    let questionItem = new Question(current, total, profession, question);
    savedSetSavedPage.add(questionItem);
    return questionItem;
}

function createElement(item){
    let template = document.querySelector('.saved-content-template');
    let clone = template.content.cloneNode(true);
    item.element = clone.querySelector('.saved-question-item');

    const btnDelete = item.element.querySelector('.delete-saved');
    btnDelete.addEventListener('click', () => {
        deleteItem(item);
    });

    const itemListElement = document.querySelector('#saved-drop-down-content');
    itemListElement.prepend(item.element);

    updateElement(item);
}

function updateElement(item){
    const currentQnumber = document.querySelector('.saved-current-qnumber');
    const totalQnumber = document.querySelector('.saved-total-qnumber');
    const selectedProfession = document.querySelector('.saved-selected-profession');
    const thisQuestion = document.querySelector('.saved-current-question');

    currentQnumber.innerText = item.current;
    totalQnumber.innerText = item.total;
    selectedProfession.innerText = item.profession;
    thisQuestion.innerText = item.question;
}

function deleteItem(item){
    item.element.remove();
    let result = savedSetSavedPage.delete(item);

    const questionArrayDeleted = Array.from(savedSetSavedPage);
    const questionArrayStringDeleted = JSON.stringify(questionArrayDeleted);
    localStorage.setItem('savedItems', questionArrayStringDeleted);
}

for (const item of savedSetSavedPage){
    createElement(item);
}

function retreieveFromLocalStorage(){
    const questionArrayString = localStorage.getItem('savedItems');
    const questionArray = JSON.parse(questionArrayString);
    for (let itemData of questionArray){
        let questionItem = addNewItem(itemData.current, itemData.total, itemData.profession, itemData.question);
        createElement(questionItem);
    }
}

if (localStorage.getItem('savedItems') != null){
    retreieveFromLocalStorage();
}


//if user clicks saved list button, go to saved list page
let savedButtonNew = document.querySelector('#saved-icon-clicked');
savedButtonNew.addEventListener('click', goToPracticeQuestion);

function goToPracticeQuestion(){
    window.location.href = "practice.html";
}

//clear local storage if click home

let homeButtonNew = document.querySelector('#home-icon');
homeButtonNew.addEventListener('click', clearStorage);

function clearStorage(){
    localStorage.clear();
}

