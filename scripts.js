let aiGuess = "";
let aiGuessName = "?";
let myGuess = "";
let myGuessName ="?";
let result = "";
//let myScore = 0;
//let aiScore = 0;
//let myDecision = "";
//let round = 1;
//let move1 = "";
//let move2 = "";
//let previousRounds = [];
let aiChoice = 0;
//let continueBattle = "Y";
const fighters ={
    Rock:{
        "name":"The Rock!",
        "health":80,
        "maxHealth":80,
        "speed":15,
        "damage":20,
        "attack":["att1","att2","att3","att4"]
    },
    Paper:{
        "name":"Paper Cut!",
        "health":30,
        "maxHealth":30,
        "speed":20,
        "damage":25,
        "attack":["att1","att2","att3","att4"]
    },
    Scissors:{
        "name":"Mr Snips!",
        "health":70,
        "maxHealth":70,
        "speed":25,
        "damage":15,
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

function fight(myAttackClass){
    switch(myGuess){
        case "Rock":
            RockIMG.classList.add(myAttackClass);
        break;
        case "Paper": 
            PaperIMG.classList.add(myAttackClass);
        break;
        case "Scissors": 
            ScissorsIMG.classList.add(myAttackClass);
        break;
    }
    if(myAttackClass==="fight1"){
        fighterAni.classList.add("myAttack");
    }
}

//reset classes post animation finish
function fighterListener(event) {
    fighterAni.classList.remove("myAttack");
    console.log("myFighter listener fired");
    if (myCounter>=1){
        console.log("but no action taken");
    }else{
        console.log("actually calling myAttackB")
        myAttackB();
        myCounter++;
    }
}

function rockListener(event) {
    RockIMG.classList.remove(myAttackClass);
}

function paperListener(event) {
    PaperIMG.classList.remove(myAttackClass);
}

function scissorListener(event) {
    ScissorsIMG.classList.remove(myAttackClass);
}

function aiFight(aiAttackClass){
    //console.log("ai attack class is "+aiAttackClass);
    switch(aiGuess){
        case "Rock":
            aiRockIMG.classList.add(aiAttackClass);
        break;
        case "Paper": 
            aiPaperIMG.classList.add(aiAttackClass);
        break;
        case "Scissors": 
            aiScissorsIMG.classList.add(aiAttackClass);
        break;
    }
    if(aiAttackClass==="aiFight1"){
        aiFighterAni.classList.add("aiAttack");
    }   
}

//reset classes post animation finish
function aiFighterListener(event) {
    aiFighterAni.classList.remove("aiAttack");
    console.log("aiFighter listener fired");
    if (aiCounter>=1){
        console.log("but no action taken");
    }else{
        console.log("actually calling aiAttackB")
        aiAttackB();
        aiCounter++;
    }
}

function aiRockListener(event) {
    aiRockIMG.classList.remove(aiAttackClass);
}

function aiPaperListener(event) {
    aiPaperIMG.classList.remove(aiAttackClass);
}

function aiScissorsListener(event) {
    aiScissorsIMG.classList.remove(aiAttackClass);
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

function loadStats(){
    //Rock Stats
    var rockHealthLoaded = document.getElementById("rockHealth");
    rockHealthLoaded.setAttribute("value", fighters.Rock.health);
    var rockSpeedLoaded = document.getElementById("rockSpeed");
    rockSpeedLoaded.setAttribute("value", fighters.Rock.speed);
    var rockDamageLoaded = document.getElementById("rockDamage");
    rockDamageLoaded.setAttribute("value", fighters.Rock.damage);
    
    //Scissor Stats
    var scissorsHealthLoaded = document.getElementById("scissorsHealth");
    scissorsHealthLoaded.setAttribute("value", fighters.Scissors.health);
    var scissorsSpeedLoaded = document.getElementById("scissorsSpeed");
    scissorsSpeedLoaded.setAttribute("value", fighters.Scissors.speed);
    var scissorsDamageLoaded = document.getElementById("scissorsDamage");
    scissorsDamageLoaded.setAttribute("value", fighters.Scissors.damage);

    //Paper Stats
    var paperHealthLoaded = document.getElementById("paperHealth");
    paperHealthLoaded.setAttribute("value", fighters.Paper.health);
    var paperSpeedLoaded = document.getElementById("paperSpeed");
    paperSpeedLoaded.setAttribute("value", fighters.Paper.speed);
    var paperDamageLoaded = document.getElementById("paperDamage");
    paperDamageLoaded.setAttribute("value", fighters.Paper.damage);
}