//eventlistener counters
let myCounter = 0;
let aiCounter = 0;

//round info
let round = 1;
let myActionText ="";
let aiActionText ="";
let action1Text = "";
let action2Text = "";
let previousRounds = [];
let previousRound = "";
let endGame = false;

//selected actions for round
let myRoundAction = "";
let myAttackClass = "";
let aiRoundAction = "";
let aiAttackClass = "";
 
//loaded actions and status'
let action1Complete = false;
let action2Complete = false;
let firstPlayer = "";

//front hit or miss messsages
let frontMyHoM = document.getElementById("myHoM");
let frontAiHoM = document.getElementById("aiHoM");

function roundBegin(chosenAction){
    //0 clear previous round options not yet setup
    //clearPreviousround();
    action1Complete = false;
    action2Complete = false;
    myCounter = 0;
    aiCounter = 0;

    //1 activate noaction modal (0% opacity)
    modalOverlay.classList.toggle("closed");
    modalOverlay.style.opacity = "0";

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
    myActionText = "I "+actionText.slice(0,24);

    //3 run my attack animation
    fight(myAttackClass);
}
function myAttackB(){
    //my post animationevent listener actions
    console.log("running myAttackB");

    //4 animate hit/miss msg
    if(myRoundAction===3){
        updateFront("aiHoM",HoMCounter);
        frontAiHoM.style.opacity="1";
        HoMCounter === "Hit" ? frontAiHoM.style.color="#fff" : frontAiHoM.style.color="#8B0000";
    }    
    
    //5 check if won else update ai health        
    if(aiFighter.health <= 0){
        endGame = true;
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
    aiActionText = "The AI "+actionText.slice(0,24);

    //3 run ai attack animation
    aiFight(aiAttackClass);
}
function aiAttackB(){
    //ai post animationevent listener actions
    console.log("running aiAttackB");

    //4 animate hit/miss msg
    if(aiRoundAction===3){
        updateFront("myHoM",HoMCounter);
        frontMyHoM.style.opacity="1";
        HoMCounter === "Hit" ? frontMyHoM.style.color="#fff" : frontMyHoM.style.color="#8B0000";
    }    

    //5 check if won else update my health        
    if(myFighter.health <= 0){
        endGame = true;
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
    aiRoundAction = (Math.floor(Math.random()*3)+1);
}


function attack(x,xChoice,y){
    //applies defensive or attacking move based on choice
    switch (xChoice){
        case 1: 
            //damage boost move
            x.damage *= 1.3;
            actionText = "increased damage to "+x.damage;
                //set attack classname depending on who the attacker is
                if(x===myFighter){
                    myAttackClass = "fight2";
                }else if(x===aiFighter){
                    aiAttackClass = "aiFight2";
                }      
            break;
        case 2:
            //agility move boost
            x.speed *= 1.3;
            actionText = "increased speed to "+x.speed;
                //set attack classname depending on who the attacker is
                if(x===myFighter){
                    myAttackClass = "fight3";
                }else if(x===aiFighter){
                    aiAttackClass = "aiFight3";
                }
            break;
        case 3:
            //actualy attacks the enemy
            //hit or miss
            if(hitOrMiss(x,y) === "hit"){
                actionText = "hit the enemy!"
                HoMCounter = "Hit";
                    //set attack classname depending on who the attacker is
                    if(x===myFighter){
                        myAttackClass = "fight1";
                    }else if(x===aiFighter){
                        aiAttackClass = "aiFight1";
                    }
                //apply damage
                y.health -= x.damage;    
            }else{
                actionText = "attacked but missed"
                HoMCounter = "Miss";
                    //set attack classname depending on who the attacker is
                    if(x===myFighter){
                        myAttackClass = "fight1";
                    }else if(x===aiFighter){
                        aiAttackClass = "aiFight1";
                    }
            }
            break;
    }
}
function hitOrMiss(x,y){
    //calculates hit or miss based on both players speed and random 0.66 chance
    let hitOrMissRandom = Math.random();
    // attacker and defender speed advantages
    let xMultiplier = x.speed/100;
    let yMultiplier = y.speed/100;
    //calculate final chance of hit or miss
    let hitChance = hitOrMissRandom + xMultiplier - yMultiplier;
    //console.log("final chance was: "+hitChance);
    if(hitChance>0.33){
        return "hit";
    }
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

function actionPhaseCheck(){
    //checks if action 2 has completed, if not fires action 2
    console.log("phase check called");
    if(action2Complete===false){
        console.log("calling action 2, action1 is "+action1Complete+", action2 is "+action2Complete);
        runAction2();
    }else{
        //check end game is set
        if(endGame === true){
            console.log("endGame is already fired, no action taken");
        }else{
            //updates rounds ticker
            updateRounds();  
            console.log("phasecheck found action 2 complete and finished")
            
            //waits 2 seconds before hiding HoM messages
            window.setTimeout(hideHoMmsgs,1000);

            function hideHoMmsgs(){
                frontMyHoM.style.opacity="0";
                frontAiHoM.style.opacity="0";
            }

            //closes noaction modal (resets 75% opacity)
            modalOverlay.classList.toggle("closed");
            modalOverlay.style.opacity = "0.75";
        }
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
    previousRound = previousRounds.pop();
    updateFront("previousRounds",previousRound);
    round++;
}