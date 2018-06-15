var vader = {
    hitPoints: 1450,
    attkStr: 30,
    defStr: 28,
    id: "vader"
}
var fett = {
    hitPoints: 115,
    attkStr: 25,
    defStr: 20,
    id: "fett"
}
var solo = {
    hitPoints: 120,
    attkStr: 28,
    defStr: 19,
    id: "solo"
}
var luke = {
    hitPoints: 130,
    attkStr: 29,
    defStr: 22,
    id: "luke"
}
var characterObject = {
    "vader": vader,
    "fett": fett,
    "solo": solo,
    "luke": luke
};
document.getElementById("vaderhp").innerHTML = "HP: " + vader.hitPoints;
document.getElementById("fetthp").innerHTML = "HP: " + fett.hitPoints;
document.getElementById("solohp").innerHTML = "HP: " + solo.hitPoints;
document.getElementById("lukehp").innerHTML = "HP: " + luke.hitPoints;
console.log(selectCharacter);


var fightObject = {
    "player": null,
    "opponent": null
}
var selectArea = document.getElementById("divCharSelection");
// var selectArea = $("#divCharSelection");
var opsForArea = document.getElementById("divOpsFor");
// var opsForArea = $ ("#divOpsFor");
var oppArea = document.getElementById("computer");
// var oppAera = $("divOppenent");
var playArea = document.getElementById("player");
var deadArea = document.getElementById("divDeadOps");
// var deadArea = $("divDeadOps");

// javascript
var selectCharacter = function (e) {
    let obj = e.target == "div" ? e.target : e.target.parentNode;
    console.log(e)

    obj.onclick = null;
    fightObject["player"] = characterObject[obj.id];
    console.log(fightObject["player"]);
    playArea.appendChild(obj);
    while (selectArea.childNodes.length > 0) {
        let curobj = selectArea.childNodes[0];
        if (curobj.nodeName == "DIV") {
            curobj.onclick = selectOpponent;
        }
        opsForArea.appendChild(curobj);
    }
}
var selectOpponent = function (e) {
    if (oppArea.querySelectorAll("div").length == 0) {
        let obj = e.target == "div" ? e.target : e.target.parentNode;
        fightObject["opponent"] = characterObject[obj.id];
        console.log(fightObject["opponent"]);
        obj.onclick = returnOppenent;
        oppArea.appendChild(obj);
    }
}
var returnOppenent = function (e) {
    let obj = e.target == "div" ? e.target : e.target.parentNode;
    fightObject["opponent"] = null;
    obj.onclick = selectOpponent;
    opsForArea.appendChild(obj);
}
var fight = function () {
    if (fightObject["player"] == null) {
        alert("Pick A Player")
    }
    if (fightObject["opponent"] == null) {
        alert("Choose Your Victim")
    }
    // creates the random number of player attack vs the opponent def
    var attk = Math.floor(Math.random() * fightObject["player"]["attkStr"]);
    console.log("player attack", attk);
    var def = Math.floor(Math.random() * fightObject["opponent"]["defStr"]);
    console.log("opp def", def);
    // builds the act of the player attack being > or < the opponent deffense
    var playerAttak;
    playerAttak = (attk - def);
    if (playerAttak < 0) {
        playerAttak = 0;
        document.getElementById("playertext").innerHTML = "your attack was blocked";
    } else {
        document.getElementById("playertext").innerHTML = "you attacked with " + playerAttak + " damage";
    }




    fightObject["opponent"]["hitPoints"] -= playerAttak;
    console.log(fightObject["opponent"]["hitPoints"], "subtract opp hitpont");
    document.getElementById(fightObject["opponent"]["id"] + "hp").innerHTML = "HP: " + fightObject["opponent"]["hitPoints"];
    if (fightObject["opponent"]["hitPoints"] <= 0) {
        // get opponent death here
        deadArea.appendChild(document.getElementById(fightObject["opponent"]["id"]));
        fightObject["opponent"] = null;
        document.getElementById("opponenttext").innerHTML = "you win this round";
        if (opsForArea.querySelectorAll("div").length == 0) {
            document.getElementById("playertext").innerHTML = "YOU ARE THE STRONGEST WARRIOR IN THE GALAXY";
        }


        return true;

    }
    var oppAttk = Math.floor(Math.random() * fightObject["opponent"]["attkStr"]);
    var oppDef = Math.floor(Math.random() * fightObject["player"]["defStr"]);
    console.log(oppAttk, "oppattk");
    console.log(oppDef, "player def");
    var opponentAttack;
    opponentAttack = (oppAttk - oppDef);
    if (opponentAttack < 0) {
        opponentAttack = 0;
        document.getElementById("opponenttext").innerHTML = "you blocked the opponent attack";
    } else {
        document.getElementById("opponenttext").innerHTML = "opponent attacked you with " + opponentAttack + " damage";
    }
    console.log(opponentAttack, "opp attk");

    fightObject["player"]["hitPoints"] -= opponentAttack;
    console.log(fightObject["player"]["hitPoints"], "subtract player hit points");
    fightObject["player"]["hitPoints"]
    document.getElementById(fightObject["player"]["id"] + "hp").innerHTML = "HP: " + fightObject["player"]["hitPoints"];
    if (fightObject["player"]["hitPoints"] <= 0) {
        // get opponent death here
        deadArea.appendChild(document.getElementById(fightObject["player"]["id"]));
        fightObject["player"] = null;
        document.getElementById("playertext").innerHTML = "you LOSE this round";
        return false;
    }
}
var reset = function () {
    selectArea.appendChild(document.getElementById("vader"));
    selectArea.appendChild(document.getElementById("fett"));
    selectArea.appendChild(document.getElementById("solo"));
    selectArea.appendChild(document.getElementById("luke"));
    document.getElementById("vader").onclick = selectCharacter;
    document.getElementById("fett").onclick = selectCharacter;
    document.getElementById("solo").onclick = selectCharacter;
    document.getElementById("luke").onclick = selectCharacter;
    characterObject["vader"]["hitPoints"] = 145;
    characterObject["fett"]["hitPoints"] = 115;
    characterObject["solo"]["hitPoints"] = 120;
    characterObject["luke"]["hitPoints"] = 130;
    document.getElementById("vaderhp").innerHTML = "HP: " + vader.hitPoints;
    document.getElementById("fetthp").innerHTML = "HP: " + fett.hitPoints;
    document.getElementById("solohp").innerHTML = "HP: " + solo.hitPoints;
    document.getElementById("lukehp").innerHTML = "HP: " + luke.hitPoints;

}
document.getElementById("vader").onclick = selectCharacter;
document.getElementById("fett").onclick = selectCharacter;
document.getElementById("solo").onclick = selectCharacter;
document.getElementById("luke").onclick = selectCharacter;



// subtracts the difference of the player attack vs the opp def from player or opponents hit ponts