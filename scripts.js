let aiGuess = "";
let myGuess = "";
let result = "";
let myScore = 0;
let aScore = 0;
let previousRounds = [];

function assignmyGuess(){
    myGuess = document.getElementById("myGuess").value;
    //console.log(myGuess);
    createaiGuess();
}

function createaiGuess(){
    let randomNumber = Math.floor(Math.random()*3);
    //console.log(randomNumber);
    switch(randomNumber){
        case 0 : aiGuess = "Rock";
            break;
        case 1 : aiGuess = "Paper";
            break;
        case 2: aiGuess = "Scissors";
            break;
    }
    updateaiGuess();
    compareGuess(myGuess, aiGuess);
}

function updateaiGuess(){
    let aiGuessMap = document.getElementById("aiGuess");
    aiGuessMap.innerHTML = aiGuess;
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
    updateResult();
}

function updateResult(){
    let resultMap = document.getElementById("result");
    resultMap.innerHTML = result;
    updateScores(result);
    updatePreviousRounds();
}

function updateScores(res){
    if(res==="Win"){
        myScore++;
    }else if(res==="Lose"){
        aiScore++;
    }else{
        myscore++;
        aiScore++;
    }
    document.getElementById("myScore").innerHTML = myScore;
    document.getElementById("aiScore").innerHTML = aiScore;
}

function updatePreviousRounds(){
    previousRounds.push(result);
    let previousRoundsMap = document.getElementById("previousRounds");
    previousRoundsMap.innerHTML = previousRounds;
}