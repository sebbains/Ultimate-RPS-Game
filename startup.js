//Selected choices
let aiGuess = "";
let aiGuessName = "?";
let myGuess = "";
let myGuessName ="?";
let result = "";
let aiChoice = 0;

//base fighters
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

//our fighters
let myFighter = {};
let aiFighter = {};

//event listeners needed for showing selected fighter
const RockIMG = document.getElementById("rockSVG");
RockIMG.addEventListener("animationend", rockListener, false);
const PaperIMG = document.getElementById("paperSVG");
PaperIMG.addEventListener("animationend", paperListener, false);
const ScissorsIMG = document.getElementById("scissorsSVG");
ScissorsIMG.addEventListener("animationend", scissorListener, false);
const aiRockIMG = document.getElementById("aiRockSVG");
aiRockIMG.addEventListener("animationend", aiRockListener, false);
const aiPaperIMG = document.getElementById("aiPaperSVG");
aiPaperIMG.addEventListener("animationend", aiPaperListener, false);
const aiScissorsIMG = document.getElementById("aiScissorsSVG");
aiScissorsIMG.addEventListener("animationend", aiScissorsListener, false);

//event listeners needed for runnning AttackBs
const fighterAni = document.getElementById("fighterSelect");
fighterAni.addEventListener("animationend", fighterListener, false);
const aiFighterAni = document.getElementById("aiFighterSelect");
aiFighterAni.addEventListener("animationend", aiFighterListener, false);

//event listener for hiding images
const fighterIMGs = document.getElementsByClassName("fighter");

//modal event listeners
const selectFighterModal = document.querySelector("#selectYourFighterModal");
const resultModal = document.querySelector("#resultModal");
const modalOverlay = document.querySelector("#modalOverlay");

function loadStats(){
    //Rock Stats
    const rockHealthLoaded = document.getElementById("rockHealth");
    rockHealthLoaded.setAttribute("value", fighters.Rock.health);
    const rockSpeedLoaded = document.getElementById("rockSpeed");
    rockSpeedLoaded.setAttribute("value", fighters.Rock.speed);
    const rockDamageLoaded = document.getElementById("rockDamage");
    rockDamageLoaded.setAttribute("value", fighters.Rock.damage);
    
    //Scissor Stats
    const scissorsHealthLoaded = document.getElementById("scissorsHealth");
    scissorsHealthLoaded.setAttribute("value", fighters.Scissors.health);
    const scissorsSpeedLoaded = document.getElementById("scissorsSpeed");
    scissorsSpeedLoaded.setAttribute("value", fighters.Scissors.speed);
    const scissorsDamageLoaded = document.getElementById("scissorsDamage");
    scissorsDamageLoaded.setAttribute("value", fighters.Scissors.damage);

    //Paper Stats
    const paperHealthLoaded = document.getElementById("paperHealth");
    paperHealthLoaded.setAttribute("value", fighters.Paper.health);
    const paperSpeedLoaded = document.getElementById("paperSpeed");
    paperSpeedLoaded.setAttribute("value", fighters.Paper.speed);
    const paperDamageLoaded = document.getElementById("paperDamage");
    paperDamageLoaded.setAttribute("value", fighters.Paper.damage);
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

//utilities/ cleanup actions
function updateFront(item, result){
    let resultMap = document.getElementById(item);
    resultMap.innerHTML = result;
}

function resetGame(){
    clearChoices();
    previousRounds = [];
    endGame = false;
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

//reset my classes post animation finish
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

//reset ai classes post animation finish
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