//selected fighters
//var myFighter = {};
//var aiFighter = {};

var myCounter = 0;
var aiCounter = 0;

//round info
var round = 1;
var myActionText ="";
var aiActionText ="";
var action1Text = "";
var action2Text = "";
var previousRounds = [];

//selected actions for round
var myRoundAction = "";
var aiRoundAction = "";

//loaded actions and status'
var action1Complete = false;
var action2Complete = false;
var firstPlayer = "";

//roundBegin(1);

function roundBegin(chosenAction){
    //0 clear previous round options not yet setup
    //clearPreviousround();
    action1Complete = false;
    action2Complete = false;
    myCounter = 0;
    aiCounter = 0;

    //1 activate noaction modal

    //2 set global variable for future function calls
    myRoundAction = chosenAction;
    
    //3 based on speed attribute, loads first round action (A = pre event listener actions)
    if (myFighter.speed > aiFighter.speed){
        firstPlayer = "me";
    }else if (aiFighter.speed > myFighter.speed){
        firstPlayer = "ai";
    }else{
        //what to do if both the same speed? We'll flip a coin each round for who goes first.
        let randomNum = Math.random();
        if(randomNum>0.5){
            firstPlayer = "me";
        }else{
            firstPlayer = "ai";
        }
    }
    //4 have to actually call action 1
    console.log("calling runAction1");
    runAction1();
}
/*
function setActionPhase(who){
    //sets named player as first action, unnamed player as second. (A = pre event listener actions)
    if (who==="me"){
        action1Player = "me";
        action1Text = myActionText;
        //action1Complete = myActionComplete;
        firstPlayer = "me";

        action2Player = "ai";
        action2Text = aiActionText;
        //action2Complete = aiActionComplete;
    }else if (who==="ai"){    
        action1Player = "ai";
        action1Text = aiActionText;
        //action1Complete = aiActionComplete;
        firstplayer= "ai";

        action2Player = "me";
        action2Text = myActionText;
        //action2Complete = myActionComplete;
    }
    console.log(firstPlayer);
}*/

function runAction1(){
    console.log("running runAction1");
    if (firstPlayer === "me"){
        myAttackA();
    }else{
        aiAttackA();
    }
}

function runAction2(){
    console.log("running runAction2");
    if (firstPlayer === "ai"){
        myAttackA();
    }else{
        aiAttackA();
    }
}

function myAttackA(){
    //my pre animationevent listener actions
    console.log("running myAttackA");
    //1 run my attack with decision
    attack(myFighter,myRoundAction,aiFighter);

    //2 updating round ticker with action
    myActionText = "I "+actionText;

    //3 run my attack animation
    fight();
}
function myAttackB(){
    //my post animationevent listener actions
    console.log("running myAttackB");
    //4 animate hit/miss modal  
    
    //5 check if won else update ai health        
    if(aiFighter.health <= 0){
        endGameMessage("ai");
    }else{
        setHealthbar ("ai");
    }

    //6 sets my action is completed
    if (firstPlayer==="me"){
        action1Complete = true;
    }else{
        action2Complete = true;
    }

    //7 check action phase
    console.log("calling phasecheck from myAttackB, action1 flag is "+action1Complete+" action2 is "+action2Complete);
    actionPhaseCheck();
}

function aiAttackA(){
    //ai pre animationevent listener actions
    console.log("running aiAttackA");
    //0 create ai choice
    aiChoiceDecider();

    //1 run ai attack with decision
    attack(aiFighter,aiRoundAction,myFighter);

    //2 updating round ticker with action
    aiActionText = "The AI "+actionText;

    //3 run ai attack animation
    aiFight();
}
function aiAttackB(){
    //ai post animationevent listener actions
    console.log("running aiAttackB");
    //4 animate hit/miss modal

    //5 check if won else update my health        
    if(myFighter.health <= 0){
        endGameMessage("me");
    }else{
        setHealthbar ("me");
    }

    //6 sets ai action is completed
    if (firstPlayer==="ai"){
        action1Complete = true;
    }else{
        action2Complete = true;
    }

    //7 check action phase
    console.log("calling phasecheck from AIAttackB, action1 flag is "+action1Complete+" action2 is "+action2Complete);
    actionPhaseCheck();
}
function aiChoiceDecider(){
    aiRoundAction = (Math.floor(Math.random()*4)+1);
}


function attack(x,xChoice,y){
    //applies defensive or attacking move based on choice
    switch (xChoice){
        case 1: 
            //damage boost move
            x.damage *= 1.5;
            actionText = "increased damage to "+x.damage;
            break;
        case 2:
            //agility move boost
            x.speed *= 1.5;
            actionText = "increased speed to "+x.speed;
            break;
        case 3:
            //actualy attacks the enemy
            //hit or miss
            if(hitOrMiss(x,y) === "hit"){
                actionText = "hit the enemy!"
                //apply damage
                y.health -= x.damage;
            }else{
                actionText = "attacked but missed..."
            }
            break;
    }
}
function hitOrMiss(x,y){
    //calculates hit or miss based on both players speed and random 0.75 chance
    let hitOrMissRandom = Math.random();
    // attacker and defender speed advantages
    let xMultiplier = x.speed/100;
    let yMultiplier = y.speed/100;
    //calculate final chance of hit or miss
    let hitChance = hitOrMissRandom + xMultiplier - yMultiplier;
    //console.log("final chance was: "+hitChance);
    if(hitChance>0.25){
        return "hit";
    }
}

function actionPhaseCheck(){
    //checks if action 2 has completed, if not fires action 2
    console.log("phase check called");
    if(action2Complete===false){
        console.log("calling action 2, action1 is "+action1Complete+", action2 is "+action2Complete);
        runAction2();
    }else{
        //updates rounds ticker
        updateRounds();  
        console.log("phasecheck found action 2 complete and finished")
        //closes noaction modal
    } 
}

function endGameMessage(x){
    //checks if enemy of active player has died to play result
    if (x === "me"){
        result="Oh no, you lost!";
        updateFront("result",result);
        toggleModals(resultModal);
    }else{
        result="Congratulations, you win!!!";
        updateFront("result",result);
        toggleModals(resultModal);
    }
}

function updateRounds(){
    //sets players texts
    if (firstPlayer==="me"){
        action1Text = myActionText;
        action2Text = aiActionText;
    }else{
        action1Text = aiActionText;
        action2Text = myActionText;
    }
    previousRounds.push(" Round "+round+" : "+action1Text+", "+action2Text+". ");
    updateFront("previousRounds",previousRounds);
    round++;
}