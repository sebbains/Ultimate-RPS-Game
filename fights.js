//change attacks to turn based
//set animations

//battle(myFighter,1,aiFighter,3);

function battle(me,myChoice,ai){
    //decides which player atacks first based on speed attribute
    if (me.speed > ai.speed){
        //run my attack
        attack(me,myChoice,ai);
        move1 = "I "+moveText;
        //run my attack animation
            // animation (me,myChoice)
        //ai health check or set and continue round        
        if(ai.health <= 0){
            endGameMessage("ai");
        }else{
            setHealthbar ("ai");
            
            //run ai attack
            aiChoiceDecider();
            console.log(aiChoice)
            attack(ai,aiChoice,me);
            move2 = "The AI "+moveText;
            //run ai attack animation
                //animation(ai,aiChoice)
            //my health check or set        
            if(me.health <= 0){
                endGameMessage("me");
            }else{
                setHealthbar ("me");
            }
        }    
    }else if (ai.speed > me.speed){
        //run ai attack
        aiChoiceDecider();
        console.log(aiChoice);
        attack(ai,aiChoice,me);
        move1 = "The AI "+moveText;
        //run ai attack animation
            //animation(ai,aiChoice)
        //my health check or set and continue round        
        if(me.health <= 0){
            endGameMessage("me");
        }else{
            setHealthbar ("me");
            
            //run my attack
            attack(me,myChoice,ai);
            move2 = "I "+moveText;
            //run my attack animation
                // animation (me,myChoice)
            //ai health check or set        
            if(ai.health <= 0){
                endGameMessage("ai");
            }else{
                setHealthbar ("ai");
            }
        }     
    }else{
        //what to do if both the same speed?
        console.log("haven't figured this out yet...");
    }
    updateRounds();
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
    console.log("final chance was: "+hitChance);
    if(hitChance>0.25){
        return "hit";
    }
}

function endGameMessage(x){
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
    previousRounds.push(" Round "+round+" : "+move1+", "+move2+". ");
    updateFront("previousRounds",previousRounds);
    round++;
}