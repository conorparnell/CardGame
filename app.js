//player setup
let userPoints = 0;
let userHype = 0;
let userFear = 0;
let userBeats = 4;

//rival setup
let rivalPoints = 0;
let rivalHype = 0;
let rivalFear = 0;
let rivalBeats = 4;



const deck = ["Lil Lindy", "Lil Lindy", "Lil Lindy", "Gavotte Trot", "Gavotte Trot", "Flip Floss", "Takey Tap Tap", "One Step Pep", "Rhythm & Grow", "Rig-A-Jig"];
const rivalDeck = ["Twizzle Sizzle", "Twizzle Sizzle", "Twizzle Sizzle", "Dainty Dip", "Dainty Dip", "Glissade Parade", "Mooching Mamba", "Cheer Squad"];

let hand = [];
let drawingCards = deck;

let rivalHand = [];
let rivalCards = deck;

//New cards:
function startTurn() {
    userBeats = 4;
    hand = [];
    drawingCards = deck;
    for (i = 0; i < 3; i++) {
        let draw = Math.floor(Math.random() * drawingCards.length);
        hand[i] = drawingCards[draw];
        console.log(`${drawingCards[draw]} added to hand.`);
        drawingCards.splice(draw, 1);
    }
}

//Enemy turn:
function rivalTurn(){
    rivalBeats = 4;
    rivalHand = [];
    rivalCards = rivalDeck;
    for (i = 0; i < 3; i++) {
        let draw = Math.floor(Math.random() * rivalCards.length);
        rivalHand[i] = rivalCards[draw];
        rivalCards.splice(draw, 1);
    }
    console.log("Your opponent draws their cards.");
    
}





//Player Card Functions:

//Lil Lindy
function lindy() {
    if (checkCost(1)) {
        let points = 2;
        points += userHype;
        points -= userFear;

        if (points <= 0) {
            points = 0;
        }
        userPoints += points;
        console.log(`You gain ${points} points. You now have ${userPoints} points!`);
        checkGame();
    }
}

//Gavotte Trot
function gavotte() {
    if (checkCost(2)) {
        let points = 4;
        points += userHype;
        points -= userFear;

        if (points <= 0) {
            points = 0;
        }
        userPoints += points;
        console.log(`You gain ${points} points. You now have ${userPoints} points!`);
        checkGame();
    }
}

//Flip Floss
function flip() {
    if (checkCost(3)) {
        let points = 7;
        points += userHype;
        points -= userFear;

        if (points <= 0) {
            points = 0;
        }
        userPoints += points;
        console.log(`You gain ${points} points. You now have ${userPoints} points!`);
        checkGame();
    }
}

//Takey Tap Tap
function takey(){
    
}

//One Step Pep
function pep() {
    if (checkCost(2)) {
        userHype++;
        console.log(`You gain 1 hype. You now have ${userHype} hype!`);
    }
}

//Rig-A-Jig
function rig() {
    if (checkCost(1)) {
        if (drawingCards <= 0) {
            console.log("No cards left to draw :(")
        } else {
            console.log("You draw one card.");
            let draw = Math.floor(Math.random() * drawingCards.length);
            hand[i] = drawingCards[draw];
            console.log(`${drawingCards[draw]} added to hand.`);
            drawingCards.splice(draw, 1);
        }
    }
}

//Rhythm & Grow
function rhythm() {
    checkCost(0);
    userBeats++;
    console.log(`You gain 1 beat, you now have ${userBeats} beats`)
}


//Rival Card Functions

//Twizzle Sizzle
function twizzle(){
    let points = 1;
    points += rivalHype;
    points -= rivalFear;

    if (points <= 0) {
        points = 0;
    }
    userPoints += points;
    console.log(`Your rival gains ${points} point. Rival now has ${userPoints} points!`);
    checkGame();
}

//Dainty Dip
function dainty(){
    let points = 3;
    points += rivalHype;
    points -= rivalFear;

    if (points <= 0) {
        points = 0;
    }
    userPoints += points;
    console.log(`Your rival gains ${points} point. Rival now has ${userPoints} points!`);
    checkGame();
}

//Glissade Parade
function glissade(){
    let points = 5;
    points += rivalHype;
    points -= rivalFear;

    if (points <= 0) {
        points = 0;
    }
    userPoints += points;
    console.log(`Your rival gains ${points} point. Rival now has ${userPoints} points!`);
    checkGame();

}

//Mooching Mamba
function mooching(){
    let points = 3;
    points += rivalHype;
    points += rivalFear;

    if (points <= 0) {
        points = 0;
    }


    userPoints -= points;
    console.log(`Your rival gains ${points} point. Rival now has ${userPoints} points!`);
    checkGame();
}

//Cheer Squad
function cheer(){
    rivalHype += 1;
    console.log("Rival ")
}

//helper functions

function checkGame() {
    if (userPoints >= 20) {
        console.log("You win!!!");
    }
    if (rivalPoints >= 20) {
        console.log("You lose :(");
    }
}

function checkCost(cardCost) {
    if (cardCost > userBeats) {
        console.log("Not enough beats to play that card!");
        return false;
    } else {
        userBeats -= cardCost;
        return true;
    }
}

//Enemy turn

function rivalPlay(){
    for (i = 0; i < rivalHand.length; i++){
    let cost = 0;

    switch(rivalHand[i]) {
        case "Twizzle Sizzle":
          cost = 1;
          break;
        case "Dainty Dip":
          cost = 2;
          break;
        case "Glissade Parade":
            cost = 3;
            break;
        case "Mooching Mamba":
            cost = 4;
        case "Cheer Squad":
            cost = 3;
      }

      if (cost < rivalBeats){
          console.log(`Rival plays ${rivalHand[i]}`);
      switch(rivalHand[i]) {
        case "Twizzle Sizzle":
          twizzle();
          break;
        case "Dainty Dip":
          dainty();
          break;
        case "Glissade Parade":
            glissade();
            break;
        case "Mooching Mamba":
            mooching();
        case "Cheer Squad":
            cheer();
      }}

    }
}

