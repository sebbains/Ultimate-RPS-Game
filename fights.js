//somethings wrong in rounds text, simplify and use global parameter / local temp
//adjust health to update post animation
//amend fight animations to switch to allow other options
//add round/hit/miss animations
//apply disable modal when fighting, toggle post animation CB = N

/*
at the moment it should call only 1 attack
all other actions should follow via the event listener

change battle to take additional parameter?

*/

function battle(me,myChoice,ai){
    continueBattle="Y";
    //set global variables for use in following functions being called elsewhere
    myDecision = myChoice;
    //decides which player attacks first based on speed attribute
    if (me.speed > ai.speed){
        myAttack(me,myChoice,ai);
          
    }else if (ai.speed > me.speed){
        aiAttack(me,myChoice,ai);
        //myAttack(me,myChoice,ai);
    }else{
        //what to do if both the same speed?
        //console.log("haven't figured this out yet...");
        let randomNum = Math.random();
        if(randomNum>0.5){
            myAttack(me,myChoice,ai);
        }else{
            aiAttack(me,myChoice,ai);
        }
    }
    updateRounds();
    console.log("final log and CB = "+continueBattle);
}

function myAttack(me,myChoice,ai){
    //myDecision = myChoice;
    //run my attack
    console.log("running my attack and CB = "+continueBattle);
    attack(me,myChoice,ai);
    move1 = "I "+moveText;
    //run my attack animation
        console.log("running my animation and CB = "+continueBattle);
        fight();
        //continueBattle="N"
        // animation (me,myChoice)
    //ai health check or set and continue round        
    if(ai.health <= 0){
        endGameMessage("ai");
    }else{
        setHealthbar ("ai");
    }
}

function aiAttack(me,myChoice,ai){
    //run ai attack
    console.log("running ai attack and CB = "+continueBattle);
    aiChoiceDecider();
    //console.log(aiChoice)
    attack(ai,aiChoice,me);
    move2 = "The AI "+moveText;
    //run ai attack animation
        console.log("running ai animation and CB = "+continueBattle);
        aiFight();
        //animation(ai,aiChoice)
    //my health check or set        
    if(me.health <= 0){
        endGameMessage("me");
    }else{
        setHealthbar ("me");
    }
}


function aiChoiceDecider(){
    aiChoice = (Math.floor(Math.random()*4)+1);
}

function attack(x,xChoice,y){
    //applies defensive or attacking move based on choice
    switch (xChoice){
        case 1: 
            //damage boost move
            x.damage *= 1.5;
            moveText = "increased damage to "+x.damage;
            break;
        case 2:
            //agility move boost
            x.speed *= 1.5;
            moveText = "increased speed to "+x.speed;
            break;
        case 3:
            //actualy attacks the enemy
            //hit or miss
            if(hitOrMiss(x,y) === "hit"){
                moveText = "hit the enemy!"
                //apply damage
                y.health -= x.damage;
            }else{
                moveText = "attacked but missed"
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
/*
function fightAction1(){
    //adds first fight animation class
    fight();
    //adds first fight flag

}

function fightAction2(){
    //adds second fight animation class based on event listener
    aiFight();
    //removes both fightActons animation classes
    //RockIMG.classList.remove("fight1");
}*/

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
    //console.log(result);
}

function updateRounds(){
    //updates rounds ticker
    previousRounds.push(" Round "+round+" : "+move1+", "+move2+". ");
    updateFront("previousRounds",previousRounds);
    round++;
}