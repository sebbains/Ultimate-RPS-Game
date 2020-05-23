function updateFront(item, result){
    let resultMap = document.getElementById(item);
    resultMap.innerHTML = result;
}

function resetGame(){
    clearChoices();
    previousRounds = [];
    updateFront("previousRounds",previousRounds);
    toggleModals(resultModal);
    toggleModals(selectFighterModal);
}

function clearChoices(){
    hideIMGS();
    aiGuess="";
    aiFighterName = "?";
    updateFront("aiFighterText",aiFighterName);
    myGuess = "";
    myGuessName ="?";
    updateFront("myFighterText",myGuessName);
    result = "";
    updateFront("result",result);
}

function hideIMGS(){
    for (i = 0; i < fighterIMGs.length; i++) {
    fighterIMGs[i].style.display = "none";
    }
}

function toggleModals(modalOption){
    modalOption.classList.toggle("closed");
    modalOverlay.classList.toggle("closed");
}

//reset my classes post animation finish
function fighterListener(event) {
    fighterAni.classList.remove("myAttack");
    console.log("myFighter listener fired");
    if (myCounter>=1){
        console.log("but no action taken");
    }else{
        console.log("actually calling myAttackB")
        myAttackB();
        myCounter++;
    }
}

function rockListener(event) {
    RockIMG.classList.remove(myAttackClass);
}

function paperListener(event) {
    PaperIMG.classList.remove(myAttackClass);
}

function scissorListener(event) {
    ScissorsIMG.classList.remove(myAttackClass);
}

//reset ai classes post animation finish
function aiFighterListener(event) {
    aiFighterAni.classList.remove("aiAttack");
    console.log("aiFighter listener fired");
    if (aiCounter>=1){
        console.log("but no action taken");
    }else{
        console.log("actually calling aiAttackB")
        aiAttackB();
        aiCounter++;
    }
}

function aiRockListener(event) {
    aiRockIMG.classList.remove(aiAttackClass);
}

function aiPaperListener(event) {
    aiPaperIMG.classList.remove(aiAttackClass);
}

function aiScissorsListener(event) {
    aiScissorsIMG.classList.remove(aiAttackClass);
}