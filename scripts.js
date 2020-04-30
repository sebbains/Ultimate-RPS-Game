let aiGuess = "";
let aiGuessName = "?";
let myGuess = "";
let myGuessName ="?";
let result = "";
let myScore = 0;
let aiScore = 0;
let previousRounds = [];
const fighters ={
    Rock:{
        "name":"The Rock!",
        "health":90,
        "maxHealth":90,
        "speed":10,
        "damage":20,
        "attack":["att1","att2","att3","att4"]
    },
    Paper:{
        "name":"Paper Cut!",
        "health":30,
        "maxHealth":30,
        "speed":20,
        "damage":30,
        "attack":["att1","att2","att3","att4"]
    },
    Scissors:{
        "name":"Mr Snips!",
        "health":60,
        "maxHealth":60,
        "speed":30,
        "damage":10,
        "attack":["att1","att2","att3","att4"]
    }
}
let myFighter = {};
let aiFighter = {};

var RockIMG = document.getElementById("rockSVG");
RockIMG.addEventListener("animationend", rockListener, false);
var PaperIMG = document.getElementById("paperSVG");
PaperIMG.addEventListener("animationend", paperListener, false);
var ScissorsIMG = document.getElementById("scissorsSVG");
ScissorsIMG.addEventListener("animationend", scissorListener, false);
var aiRockIMG = document.getElementById("aiRockSVG");
aiRockIMG.addEventListener("animationend", aiRockListener, false);
var aiPaperIMG = document.getElementById("aiPaperSVG");
aiPaperIMG.addEventListener("animationend", aiPaperListener, false);
var aiScissorsIMG = document.getElementById("aiScissorsSVG");
aiScissorsIMG.addEventListener("animationend", aiScissorsListener, false);
var fighterAni = document.getElementById("fighterSelect");
fighterAni.addEventListener("animationend", fighterListener, false);
var aiFighterAni = document.getElementById("aiFighterSelect");
aiFighterAni.addEventListener("animationend", aiFighterListener, false);
var fighterIMGs = document.getElementsByClassName("fighter");
var selectFighterModal = document.querySelector("#selectYourFighterModal");
var resultModal = document.querySelector("#resultModal");
var modalOverlay = document.querySelector("#modalOverlay");

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

function fightRound(){
    fight();
    aiFight();
    calcFight();
}

function fighterChosen(fighter){
    clearChoices();
    myGuess = fighter;
    assignmyGuess();
    createaiGuess();
    toggleModals(selectFighterModal);
}

function assignmyGuess(){
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

    //set healthbar
    setHealthbar ("me");
}

function setHealthbar(who){
    if(who==="me"){
        let healthbar = '<progress value="'+myFighter.health+'" max="'+myFighter.maxHealth+'"></progress>'
        document.getElementById("myHealthbar").innerHTML = healthbar;
    }else{
        let healthbar = '<progress value="'+aiFighter.health+'" max="'+aiFighter.maxHealth+'"></progress>'
        document.getElementById("aiHealthbar").innerHTML = healthbar;
    };
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

    //set healthbar
    setHealthbar ("ai");
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

function aiFight(){
    switch(aiGuess){
        case "Rock":
            aiRockIMG.classList.add("aiFight1");
        break;
        case "Paper": 
            aiPaperIMG.classList.add("aiFight1");
        break;
        case "Scissors": 
            aiScissorsIMG.classList.add("aiFight1");
        break;
    }
    aiFighterAni.classList.add("aiAttack");
}

//reset classes post animation finish
function aiFighterListener(event) {
    aiFighterAni.classList.remove("aiAttack");
}

function aiRockListener(event) {
    aiRockIMG.classList.remove("aiFight1");
}

function aiPaperListener(event) {
    aiPaperIMG.classList.remove("aiFight1");
}

function aiScissorsListener(event) {
    aiScissorsIMG.classList.remove("aiFight1");
}

function calcFight(){
    if (myFighter.speed > aiFighter.speed){
        aiFighter.health -= myFighter.damage;
        if(aiFighter.health<=0){
            result="Congratulations, you win!!!";
            updateFront("result",result);
            toggleModals(resultModal);

        }
        setHealthbar ("ai");
        myFighter.health -= aiFighter.damage;
        if(myFighter.health<=0){
            result="Oh no, you lost!";
            updateFront("result",result);
            toggleModals(resultModal);
        }
        setHealthbar ("me");
    }else if (myFighter.speed < aiFighter.speed){
        myFighter.health -= aiFighter.damage;
        if(myFighter.health<=0){
            result="Oh no, you lost!";
            updateFront("result",result);
            toggleModals(resultModal);
        }
        setHealthbar ("me");
        aiFighter.health -= myFighter.damage;
        if(aiFighter.health<=0){
            result="Congratulations, you win!!!";
            updateFront("result",result);
            toggleModals(resultModal);
        }
        setHealthbar ("ai");
    } else{
        myFighter.health -= aiFighter.damage;
        setHealthbar ("me");
        aiFighter.health -= myFighter.damage;
        setHealthbar ("ai");
        if(myFighter.health<=0){
            result="How did you manage that? It was a draw!";
            updateFront("result",result);
            toggleModals(resultModal);
        }        
    }
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
    previousRounds = [];
    updateFront("previousRounds",previousRounds);
    toggleModals(resultModal);
    toggleModals(selectFighterModal);
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

function toggleModals(modalOption){
    modalOption.classList.toggle("closed");
    modalOverlay.classList.toggle("closed");
}