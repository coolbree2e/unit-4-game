
// all of my character objects
var vader = {
    hitPoints: 450,
    attkStr: 30,
    defStr: 28,
    id: "vader",
    maxHitpoints: 450,
    box: $("#vader"),
    text: $("#vaderhp")
}
var fett = {
    hitPoints: 115,
    attkStr: 25,
    defStr: 20,
    id: "fett",
    maxHitpoints: 115,
    box: $("#fett"),
    text: $("#fetthp")
}
var solo = {
    hitPoints: 120,
    attkStr: 28,
    defStr: 19,
    id: "solo",
    maxHitpoints: 120,
    box: $("#solo"),
    text: $("#solohp")
}
var luke = {
    hitPoints: 130,
    attkStr: 29,
    defStr: 22,
    id: "luke",
    maxHitpoints: 130,
    box: $("#luke"),
    text: $("#lukehp")
}
var characterObject = {
    "vader": vader,
    "fett": fett,
    "solo": solo,
    "luke": luke
};
var fightObject = {
    "player": null,
    "opponent": null
}

var selectArea = $("#divCharSelection");
var opsForArea = $("#divOpsFor");
var oppArea = $("#computer");
var playArea = $("#player");
var deadArea = $("#divDeadOps");
var playerText = $("#playertext");
var opponentText = $("#opponenttext");
// function that runs the damage and records
var init = function () {
    for (let key in characterObject) {
        characterObject[key].hitPoints = characterObject[key].maxHitpoints;
        characterObject[key].text.html("hp: " + characterObject[key].maxHitpoints);
        characterObject[key].box.on("click", selectCharacter);
    }
}
// selects my character and moves the none selected cahracters to the defend area
var selectCharacter = function (e) {
    let obj = e.target == "div" ? e.target : e.target.parentNode;
    console.log(obj);
    $(obj).off("click");
    fightObject["player"] = characterObject[obj.id];
    playArea.append(obj);
    for (let key in characterObject) {
        if (characterObject[key].id !== obj.id) {
            opsForArea.append(characterObject[key].box);
            characterObject[key].box.off("click").on("click", selectOpponent);
        }
    }
}
// player chooses who to fight
var selectOpponent = function (e) {
    if (fightObject["opponent"] == null) {
        let obj = e.target == "div" ? e.target : e.target.parentNode
        console.log(obj);
        fightObject["opponent"] = characterObject[obj.id];
        $(obj).off("click").on("click", returnOppenent);
        // obj.onclick = returnOppenent;
        oppArea.append(obj);
    }
}
// if opponent is to tough switches out opponent
var returnOppenent = function (e) {
    let obj = e.target == "div" ? e.target : e.target.parentNode;
    fightObject["opponent"] = null;
    $(obj).off("click").on("click", selectOpponent);
    // obj.onclick = selectOpponent;
    opsForArea.append(obj);
}
var fight = function () {
    // player needs to pick  fighter
    if (fightObject["player"] == null) {
        alert("Pick A Player");
        return false;
    }
    // payerneeds to choose an opponent
    if (fightObject["opponent"] == null) {
        alert("Choose Your Victim");
        return false;
    }
    // creates the random number of player attack vs the opponent def
    var playerResult = fightResult(fightObject["player"], fightObject["opponent"]);
    if (playerResult == 0) {
        playerText.html("your attack was blocked");
    } else {
        playerText.html("you attacked with " + playerResult + " damage");
    }
    // records the damage and dispaly it on the screen for the player
    fightObject["opponent"]["hitPoints"] -= playerResult;
    console.log(fightObject["opponent"]["hitPoints"], "subtract opp hitpont");
    fightObject["opponent"].text.html("HP: " + fightObject["opponent"]["hitPoints"]);
    if (fightObject["opponent"]["hitPoints"] <= 0) {
        // get opponent death here
        deadArea.append(fightObject["opponent"].box);
        fightObject["opponent"] = null;
        opponentText.html("you win this round");
        if ($(opsForArea).children("div").length == 0) {
            playerText.html("YOU ARE THE STRONGEST WARRIOR IN THE GALAXY");
        }
        return true;
    }
    // records the damage and dispaly it on the screen for the opponent
    var opponentResult = fightResult(fightObject["opponent"], fightObject["player"]);
    if (opponentResult == 0) {
        opponentText.html("you blocked the opponent attack");
    } else {
        opponentText.html("opponent attacked you with " + opponentResult + " damage");
    }
    fightObject["player"]["hitPoints"] -= opponentResult;
    fightObject["player"].text.html("HP: " + fightObject["player"]["hitPoints"]);
    if (fightObject["player"]["hitPoints"] <= 0) {
        // get opponent death here
        deadArea.append(fightObject["player"].box);
        fightObject["player"] = null;
        playerText.html("you LOSE this round");
        return false;
    }
}
var fightResult = function (attacker, defender) {
    var oppAttk = Math.floor(Math.random() * attacker["attkStr"]);
    var oppDef = Math.floor(Math.random() * defender["defStr"]);
    var result = oppAttk - oppDef;
    return result > 0 ? result : 0;
}
// resets the game
var reset = function () {
    for (let key in characterObject) {
        selectArea.append(characterObject[key].box);
    }
    init();



}

init();