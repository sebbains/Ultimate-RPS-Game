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

//event listeners needed for runnning AttackBs
var fighterAni = document.getElementById("fighterSelect");
fighterAni.addEventListener("animationend", fighterListener, false);
var aiFighterAni = document.getElementById("aiFighterSelect");
aiFighterAni.addEventListener("animationend", aiFighterListener, false);

//event listener for hiding images
var fighterIMGs = document.getElementsByClassName("fighter");

//modal event listeners
var selectFighterModal = document.querySelector("#selectYourFighterModal");
var resultModal = document.querySelector("#resultModal");
var modalOverlay = document.querySelector("#modalOverlay");

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