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

function playGame(){
    assignmyGuess();
    createaiGuess();
    compareGuess(myGuess, aiGuess);
    calcScores(result);
    previousRounds.push(result);
    updateFront("previousRounds",previousRounds);
};

function assignmyGuess(){
    myGuess = document.getElementById("myGuess").value;
    rockIMG = document.getElementById("rockSVG");
    paperIMG = document.getElementById("paperSVG");
    scissorsIMG = document.getElementById("scissorsSVG");

    //copy fighter object to myFighter
    myFighter = Object.assign({}, fighters[myGuess]);

    //hide all Fighter SVGs
    rockIMG.style.display="none";
    paperIMG.style.display="none";
    scissorsIMG.style.display="none";

    //show inline Fighter SVG
    switch(myGuess){
        case "Rock":
            rockIMG.style.display="block";
        break;
        case "Paper": 
            paperIMG.style.display="block";
        break;
        case "Scissors": 
            scissorsIMG.style.display="block";
        break;
    }

    //assign front name
    myGuessName = myFighter.name;
    updateFront("myFighterText",myGuessName);
    //console.log(myGuessName);
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

    //assign front name
    aiGuessName = fighters[aiGuess].name;
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
    aiGuess="";
    aiFighterName = "?";
    updateFront("aiFighterText",aiFighterName);
    result = "";
    updateFront("result",result);
    myScore = 0;
    updateFront("myScore",myScore);
    aiScore = 0;
    updateFront("aiScore",aiScore);
    previousRounds = [];
    updateFront("previousRounds",previousRounds);
}