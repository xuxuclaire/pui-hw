let practiceAmount = localStorage.getItem("amount");
let practiceProfession = localStorage.getItem("userProfession");
console.log(practiceAmount);
console.log(practiceProfession);


let hintBubble = document.querySelector('#hint-bubble');
hintBubble.style.visibility = 'hidden' ;

let practiceDisplay = document.querySelector('.practice-content');

let currentQuestionCount = 1;
//edit h2 on top to show question count and profession
let currentQuestion = document.querySelector('#current-qnumber');
currentQuestion.innerText = currentQuestionCount;

let totalQuestionsNumber = document.querySelector('#total-qnumber');
totalQuestionsNumber.innerText = practiceAmount;

let selectedProfession = document.querySelector('#selected-profession');
selectedProfession.innerText = practiceProfession;

//buttons
let homeButton = document.querySelector('#home-icon');
let cameraButton = document.querySelector('#camera-icon');
let savedButton = document.querySelector('#saved-icon');
let hintButton = document.querySelector('#hint-icon');


//get questions list
let practiceList = [];
let tempList = professionsData[practiceProfession];
console.log(tempList);


for (let i = 0; i < practiceAmount; i += 1){
    let tempNum = Math.abs(((Math.random() * 12) - 1).toFixed());
    console.log(tempNum);

    practiceList[i] = (tempList["question"][tempNum]);
    tempList["question"].splice(tempNum, 1);
}
console.log(practiceList);

//display questions
let practiceQuestion = document.querySelector('h1');
console.log(practiceList[0][0]);
practiceQuestion.innerText = practiceList[currentQuestionCount-1][0];

//set sample answer
let sampleAnswerButton = document.getElementById('sample-answer-button');
let sampleAnswerBox = document.getElementById('sample-answer-box');

let sampleAnswerContent = document.getElementById('sample-answer-content');
sampleAnswerBox.style.visibility = 'hidden';


sampleAnswerContent.innerText = '"' + practiceList[currentQuestionCount-1][1] + '"';


//reveal sample answer on click
sampleAnswerButton.addEventListener('click', showSampleAnswer);

function showSampleAnswer(){
    console.log('clicked');
    console.log(sampleAnswerButton.innerText);
    if(sampleAnswerBox.style.visibility == 'hidden'){
        sampleAnswerBox.classList.add('animate__animated', 'animate__slideInUp');
        sampleAnswerBox.style.visibility = 'visible';
        sampleAnswerButton.innerText = 'Hide answer';
        sampleAnswerBox.addEventListener('animationend', () => {
            sampleAnswerBox.classList.remove('animate__animated', 'animate__slideInUp');
        });

    } else if(sampleAnswerBox.style.visibility == 'visible'){
        sampleAnswerBox.classList.add('animate__animated', 'animate__slideOutDown');
        sampleAnswerBox.style.visibility = 'hidden';
        sampleAnswerButton.innerText = 'Show answer';
        sampleAnswerBox.addEventListener('animationend', () => {
            sampleAnswerBox.classList.remove('animate__animated', 'animate__slideOutDown');
        });
    }
}



//get hint list
function getHints(){
    let hintList = [];
    for (let i = 0; i < tempList["hint"].length; i+=1){
        hintList[i] = tempList["hint"][i];
    }
    return hintList;
}

//move practiceContent in
practiceDisplay.classList.add('animate__animated', 'animate__fadeInDown');

//move right side buttons in
cameraButton.classList.add('animate__animated', 'animate__slideInRight');
savedButton.classList.add('animate__animated', 'animate__slideInRight');
hintButton.classList.add('animate__animated', 'animate__slideInRight');


//show hint if hint button is clicked
hintButton.addEventListener('click', showHint);
let hintContent = document.querySelector("h3");

function showHint(){
    hintBubble.classList.add('animate__animated', 'animate__slideInRight');
    hintBubble.style.visibility = 'visible';
    //insert random hint
    let tempHintList = getHints();
    console.log(tempHintList);
    let randomHintNum = Math.abs(((Math.random() * tempHintList.length) - 1).toFixed());
    hintContent.innerText = "Hint: " + tempHintList[randomHintNum];

    hintBubble.classList.remove('animate__animated', 'animate__slideInRight');
    
    //hide hint after 5 secs
    setTimeout(() => {
        hintBubble.classList.add('animate__animated', 'animate__slideOutRight');
      }, "5000")
    
    hintBubble.classList.remove('animate__animated', 'animate__slideOutRight');
}

homeButton.addEventListener('click', clearStorage);

function clearStorage(){
    localStorage.removeItem('amount');
    localStorage.removeItem('userProfession');
}


//move to next question on click
let nextQuestionButton = document.getElementById('next-question-button');
nextQuestionButton.addEventListener('click', goToNextQuestion);

function goToNextQuestion(){
    currentQuestionCount += 1;
    currentQuestion.innerText = currentQuestionCount;
    practiceQuestion.innerText = practiceList[currentQuestionCount-1][0];
    sampleAnswerContent.innerText = '"' + practiceList[currentQuestionCount-1][1] + '"';
    console.log(currentQuestionCount-1);
    if((currentQuestionCount) == practiceAmount){
        console.log('last question');
        nextQuestionButton.style.visibility = 'hidden';
    }
}

//turn on camera when button clicked
cameraButton.addEventListener('click', cameraButtonPressed);
let cameraButtonIcon = document.querySelector('#camera-icon-content');

function cameraButtonPressed(){
    console.log(cameraButtonIcon.alt == 'camera-on');
    if(cameraButtonIcon.alt == 'camera-on'){
        //TURN ON VIDEO
        turnOnVideo();

        //change alt text to camera off
        cameraButtonIcon.alt = "camera-off";
    }else if (cameraButtonIcon.alt == "camera-off"){
        //TURN OFF VIDEO
        turnOffVideo();

        //change alt text to camera on
        cameraButtonIcon.alt = "camera-on";
    }
}

let videoContainer = document.querySelector('#video-box');
let questionDisplay = document.querySelector('#question-display');
let questionInfo = document.querySelector('#question-info');

/*
turn on and off video: used API getUserMedia, referenced stackoverflow on how to do it
link cited here: https://stackoverflow.com/questions/12024770/access-camera-from-a-browser (turn on)
https://stackoverflow.com/questions/28140147/turn-off-webcam-camera-after-using-getusermedia (turn off)
*/

function turnOnVideo(){
    let video = document.createElement('video');
    video.setAttribute('autoplay', 'true');
    
    //Setting up the constraint
    let constraints = {
      audio: false,
      video: {
        width: { min: 1024, ideal: 1280, max: 1920 },
        height: { min: 576, ideal: 720, max: 1080 }
      }
    };
    
    //Stream it to video element 
    navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
      video.srcObject = stream;
      console.log('video on');
    });   
    
    videoContainer.appendChild(video);

    //make questions part smaller
    questionDisplay.style.marginTop = "0px";
    questionDisplay.style.marginBottom = "0px";

    questionInfo.style.marginBottom = "0px";

    practiceQuestion.style.fontSize = "22px";
}

function turnOffVideo(){
    //stop video streaming
    let video = document.querySelector('video');
    let mediaStream = video.srcObject;
    let tracks = mediaStream.getTracks();
    tracks.forEach(track => track.stop())
    
    videoContainer.removeChild(video);

    //make questions part smaller
    questionDisplay.style.marginTop = "80px";
    questionDisplay.style.marginBottom = "80px";
  
    questionInfo.style.marginBottom = "30px";
  
    practiceQuestion.style.fontSize = "56px";
}


//if user clicks star icon, save current question + info to local storage

let addToSaved = document.querySelector("#star-icon");
addToSaved.addEventListener('click', submitQuestion);

let savedSetDetailPage = new Set();

//for saved list
class Question {
    constructor(currentValue, totalValue, usedProfession, questionDisplayed) {
        this.current = currentValue;
        this.total = totalValue;
        this.profession = usedProfession;
        this.question = questionDisplayed;
    }
}

/*
currentQuestion: current question number we're on
totalQuestionsNumber: total questions we have
selectedProfession: profession our questions are based on
*/
function submitQuestion(){
    console.log('yes');

    const currentQuestionValue = currentQuestion.innerText;
    const totalQuestionValue = totalQuestionsNumber.innerText;
    const selectedProfessionText = selectedProfession.innerText;
    const questionDisplayedText = practiceQuestion.innerText;

    const questionItem = new Question(currentQuestionValue,totalQuestionValue,selectedProfessionText, questionDisplayedText);
    savedSetDetailPage.add(questionItem);
    console.log(savedSetDetailPage);

    if(localStorage.getItem('savedItems')== null){
        saveToLocalStorage();
    } else {
        addToLocalStorage(questionItem);
    }
}

function saveToLocalStorage(){
    const questionArray = Array.from(savedSetDetailPage);
    console.log(questionArray);
    const questionArrayString = JSON.stringify(questionArray);
    localStorage.setItem('savedItems', questionArrayString);
}

function addToLocalStorage(newQuestion){
    const questionArrayString = localStorage.getItem('savedItems');
    let questionArrayNew = JSON.parse(questionArrayString);
    questionArrayNew.push(newQuestion);
    const questionArrayStringNew = JSON.stringify(questionArrayNew);
    localStorage.setItem('savedItems', questionArrayStringNew);
}

//if user clicks saved list button, go to saved list page
savedButton.addEventListener('click', goToSavedList);

function goToSavedList(){
    window.location.href = "saved.html";
}