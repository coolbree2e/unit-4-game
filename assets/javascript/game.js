var vader = {
    hitPoints: 145,
    attkStr: 30,
    defStr: 28
}
var fett = {
    hitPoints: 115,
    attkStr: 25,
    defStr: 20
}
var solo = {
    hitPoints: 120,
    attkStr: 28,
    defStr: 19
}
var luke = {
    hitPoints: 130,
    attkStr: 29,
    defStr: 22
}
var characterObject = {"vader":vader, "fett":fett, "solo":solo,"luke":luke};
var fightObject = {"player":null,"opponent":null}
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
var selectCharacter = function (obj) {
    obj.onclick = null;
    fightObject["player"] = characterObject[obj.id];
    console.log(fightObject["player"]);
    playArea.appendChild(obj); 
    while(selectArea.childNodes.length>0){
        let curobj = selectArea.childNodes[0];
        if (curobj.nodeName == "DIV") { 
            curobj.onclick = selectOpponent;  
        }
        opsForArea.appendChild(curobj);
    }
}
var selectOpponent = function (e) {
    if(oppArea.querySelectorAll("div").length == 0){
        let obj = e.target == "div" ? e.target : e.target.parentNode;
        fightObject["opponent"] = characterObject[obj.id];
        console.log(fightObject["opponent"]);
        obj.onclick = returnOppenent;
        oppArea.appendChild(obj);
    }
}
var returnOppenent = function (e){
    let obj = e.target == "div" ? e.target : e.target.parentNode;
    fightObject["opponent"] = null;
    obj.onclick = selectOpponent;
    opsForArea.appendChild(obj);
}
var fight = function (){
    if (fightObject["player"]== null) 
   {alert("Pick A Player")}
   if (fightObject["opponent"] == null){alert("Choose Your Victim")}
   var attk = Math.floor(Math.random()* fightObject["player"]["attkStr"]);
   console.log(attk);
   var def = Math.floor(Math.random()* fightObject["opponent"]["defStr"]);
   console.log(def);
   if 

    
}

