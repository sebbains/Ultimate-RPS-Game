let aiGuess = "";
let myGuess = "";
let result = "";
let myScore = 0;
let aiScore = 0;
let previousRounds = [];

function playGame(){
    assignmyGuess();
    createaiGuess();
    updateFront("aiGuess",aiGuess);
    compareGuess(myGuess, aiGuess);
    updateFront("result",result);
    calcScores(result);
    updateFront("myScore",myScore);
    updateFront("aiScore",aiScore);
    previousRounds.push(result);
    updateFront("previousRounds",previousRounds);
};

function assignmyGuess(){
    myGuess = document.getElementById("myGuess").value;
    //console.log(myGuess);
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
}

function updateFront(item, result){
    let resultMap = document.getElementById(item);
    resultMap.innerHTML = result;
}

function resetGame(){
    aiGuess = "";
    updateFront("aiGuess",aiGuess);
    result = "";
    updateFront("result",result);
    myScore = 0;
    updateFront("myScore",myScore);
    aiScore = 0;
    updateFront("aiScore",aiScore);
    previousRounds = [];
    updateFront("previousRounds",previousRounds);
}