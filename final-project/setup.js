//page load animations
let setUpDisplay = document.querySelector('.set-up-content');
setUpDisplay.classList.add('animate__animated', 'animate__fadeInDown');
setUpDisplay.addEventListener('animationend', () => {
    setUpDisplay.classList.remove('animate__animated', 'animate__fadeInDown');
});

let jobInput = document.querySelector("#profession-input");
jobInput.addEventListener('click', checkJob);

let numberInput = document.querySelector("#number-input");
numberInput.addEventListener('click', checkQuestions);


let professions = ["Product Designer", "Data Scientist", "Software Developer", "Product Manager", "UX Designer", "UI Designer", "UX Researcher", "Machine Learning Engineer" ]

function checkJob(){
    jobInput.focus();
}

function checkQuestions(){
    numberInput.focus();
}

/* 
autocomplete dropdown, code referenced from w3schools and modified to fit with my library
link cited here: https://www.w3schools.com/howto/howto_js_autocomplete.asp
*/

function autocomplete (inp,jobList){
    let currentFocus;
    /*when someone writes in the test field*/
    inp.addEventListener("input", function(e){
        /*close any list of autocomplete values*/
        let jobName, suggestedJob, i, val = this.value;
        closeAllLists(inp);
        if (!val){
            return false;
        }
        currentFocus = -1;
        /*create DIV element with autofill items*/
        jobName = document.createElement("DIV");
        jobName.setAttribute("id", this.id + "autocomplete-list");
        jobName.setAttribute("class", "autocomplete-items");
        /*append "profession-name" element to container*/ 
        this.parentNode.appendChild(jobName);

        if (inp.length == 0){
            closeAllLists();
        }

        for (let i = 0; i < jobList.length; i++){
            /*check item with same letters*/
            if (jobList[i].substr(0, val.length).toUpperCase() == val.toUpperCase()){
                suggestedJob = document.createElement("DIV");
                suggestedJob.innerHTML += jobList[i];
                suggestedJob.addEventListener("click", function(e) {
                    console.log(this);
                    inp.value = this.innerHTML;
                    closeAllLists();
                    return inp;
                });
                jobName.appendChild(suggestedJob);
            }
        }

    });
}

function closeAllLists(selectedJob){
    let x = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < x.length; i++){
        if (selectedJob != x[i] && selectedJob != jobInput){
            x[i].parentNode.removeChild(x[i]);
        }
    }
}

document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});

autocomplete(jobInput, professions);

//click link delay for animation to finish
function delay (URL) {
    setTimeout( function() { window.location = URL }, 5000 );
}

// if click start button, check profession and answers
let generateQs = document.querySelector("#start");
generateQs.addEventListener('click', startPracticing);

function startPracticing(){
    //check if user input is workable
    let inputAmount = document.getElementById('number-input').value;
    let inputProfession = document.getElementById('profession-input').value;
    let warningContainer = document.querySelector('#warning');

    if (professions.indexOf(inputProfession) == -1){
        let professionWarning = document.createElement('h2');
        professionWarning.innerText = "We can't find this profession in our database.";
        warningContainer.appendChild(professionWarning);

    }else if(inputAmount > 12 || inputAmount < 1){
        let amountWarning = document.createElement('h2');
        amountWarning.innerText = "Please enter a practice number from 1 to 12.";
        warningContainer.appendChild(amountWarning);
    }else{
                //store user input
                localStorage.setItem("amount", inputAmount);
                localStorage.setItem("userProfession", inputProfession);
        
                //move setup out
                setUpDisplay.classList.add('animate__animated', 'animate__fadeOutUp');
                setUpDisplay.addEventListener('animationend', () => {
                    setUpDisplay.style.visibility = 'hidden';
                    window.location.href = "practice.html";
                    setUpDisplay.classList.remove('animate__animated', 'animate__fadeOutUp');
                });
    }
}


