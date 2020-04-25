let aiGuess = "";
let myGuess = "";
let result = "";

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
    compareGuess(myGuess, aiGuess);
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
    alert(result);
}

//createaiGuess();
//console.log(aiGuess);
//compareGuess("Scissors","Paper");
//console.log(result);