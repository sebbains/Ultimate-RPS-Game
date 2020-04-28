let aiGuess = "";
let aiGuessName = "?";
let myGuess = "";
let myGuessName ="?";
let result = "";
let myScore = 0;
let aiScore = 0;
let previousRounds = [];
let previousGuess = "";
const fighters ={
    Rock:{
        "name":"The Rock!",
        "health":100,
        "speed":1,
        "attack":["att1","att2","att3"]
    },
    Paper:{
        "name":"Paper Cut!",
        "health":50,
        "speed":3,
        "attack":["att1","att2","att3"]
    },
    Scissors:{
        "name":"Mr Snips!",
        "health":75,
        "speed":2,
        "attack":["att1","att2","att3"]
    }
}
let myFighter = {};
let aiFighter = {};
let RockIMG = document.getElementById("rockSVG");
RockIMG.addEventListener("animationend", rockListener, false);
let PaperIMG = document.getElementById("paperSVG");
PaperIMG.addEventListener("animationend", paperListener, false);
let ScissorsIMG = document.getElementById("scissorsSVG");
ScissorsIMG.addEventListener("animationend", scissorListener, false);
let aiRockIMG = document.getElementById("aiRockSVG");
//aiRockIMG.addEventListener("animationend", aiRockListener, false);
let aiPaperIMG = document.getElementById("aiPaperSVG");
//aiPaperIMG.addEventListener("animationend", aiPaperListener, false);
let aiScissorsIMG = document.getElementById("aiScissorsSVG");
//aiScissorsIMG.addEventListener("animationend", aiScissorListener, false);
let fighterIMGs = document.getElementsByClassName("fighter");
let fighterAni = document.getElementById("fighterSelect");
fighterAni.addEventListener("animationend", fighterListener, false);

/*
function listener(event) {
    switch(event.type) {
      case "animationstart":
        console.log("fighterSelect animation started");
        break;
      case "animationend":
        console.log("fighterSelect animation ended");
        break;
      case "animationiteration":
        console.log("fighterSelect animation repeated");
        break;
    }
}*/

function playGame(){
    clearChoices();
    assignmyGuess();
    createaiGuess();
    fight();
    compareGuess(myGuess, aiGuess);
    calcScores(result);
    previousRounds.push(result);
    updateFront("previousRounds",previousRounds);
};

function assignmyGuess(){
    myGuess = document.getElementById("myGuess").value;

    //copy fighter object to myFighter
    myFighter = Object.assign({}, fighters[myGuess]);

    //show inline Fighter SVG
    switch(myGuess){
        case "Rock":
            RockIMG.style.display="block";
        break;
        case "Paper": 
            PaperIMG.style.display="block";
        break;
        case "Scissors": 
            ScissorsIMG.style.display="block";
        break;
    }

    //assign front name
    myGuessName = myFighter.name;
    updateFront("myFighterText",myGuessName);
    //console.log(myGuessName);

    //update previous guess
    previousGuess = myGuess;
    console.log(previousGuess);
}

function createaiGuess(){
    let randomNumber = Math.floor(Math.random()*3);
    //console.log(randomNumber);
    switch(randomNumber){
        case 0 : 
            aiGuess = "Rock";
            break;
        case 1 : 
            aiGuess = "Paper";
            break;
        case 2: 
            aiGuess = "Scissors";
            break;
    }

    //copy fighter object to aiFighter
    aiFighter = Object.assign({}, fighters[aiGuess]);

    //show inline Fighter SVG
    switch(aiGuess){
        case "Rock":
            aiRockIMG.style.display="block";
        break;
        case "Paper": 
            aiPaperIMG.style.display="block";
        break;
        case "Scissors": 
            aiScissorsIMG.style.display="block";
        break;
    }

    //assign front name
    aiGuessName = aiFighter.name;
    updateFront("aiFighterText",aiGuessName);
}

function compareGuess(me,ai){
    if (me===ai){
        result = "Draw";
    }else{
        switch(me){
            case "Rock" : if (ai==="Scissors"){
                            result="Win";
                        }else{
                            result="Lose";
                        }
                break;
            case "Paper" : if (ai==="Rock"){
                            result="Win";
                        }else{
                            result="Lose";
                        }
                break;
            case "Scissors" : if(ai==="Paper"){
                            result="Win";
                        }else{
                            result="Lose";
                        }
                break;
        }
    }
    updateFront("result",result);
}

function fight(){
    switch(myGuess){
        case "Rock":
            RockIMG.classList.add("fight1");
        break;
        case "Paper": 
            PaperIMG.classList.add("fight1");
        break;
        case "Scissors": 
            ScissorsIMG.classList.add("fight1");
        break;
    }
    fighterAni.classList.add("myAttack");
}

//reset classes post animation finish
function fighterListener(event) {
    fighterAni.classList.remove("myAttack");
}

function rockListener(event) {
    RockIMG.classList.remove("fight1");
}

function paperListener(event) {
    PaperIMG.classList.remove("fight1");
}

function scissorListener(event) {
    ScissorsIMG.classList.remove("fight1");
}

function calcScores(res){
    if(res==="Win"){
        myScore++;
    }else if(res==="Lose"){
        aiScore++;
    }else{
        myScore++;
        aiScore++;
    }
    updateFront("myScore",myScore);
    updateFront("aiScore",aiScore);
}

function updateFront(item, result){
    let resultMap = document.getElementById(item);
    resultMap.innerHTML = result;
}

function resetGame(){
    clearChoices();
    myScore = 0;
    updateFront("myScore",myScore);
    aiScore = 0;
    updateFront("aiScore",aiScore);
    previousRounds = [];
    updateFront("previousRounds",previousRounds);
}

function clearChoices(){
    hideIMGS();
    aiGuess="";
    aiFighterName = "?";
    updateFront("aiFighterText",aiFighterName);
    myGuess = "";
    myGuessName ="?";
    updateFront("myFighterText",myGuessName);
    result = "";
    updateFront("result",result);
}

function hideIMGS(){
    for (i = 0; i < fighterIMGs.length; i++) {
    fighterIMGs[i].style.display = "none";
    }
}