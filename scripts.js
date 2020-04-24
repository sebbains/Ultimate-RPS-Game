let aiGuess = "";
let myGuess = "";
let result = "";

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

createaiGuess();
//console.log(aiGuess);
compareGuess("Scissors","Paper");
console.log(result);