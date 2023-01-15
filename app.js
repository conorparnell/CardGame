//player setup
let userPoints = 0;
let userHype = 0;
let userFear = 0;
let userBeats = 3;

//rival setup
let rivalPoints = 0;
let rivalHype = 0;
let rivalFear = 0;
let rivalBeats = 3;



const deck = ["Lil Lindy", "Lil Lindy", "Lil Lindy", "Gavotte Trot", "Gavotte Trot", "Flip Floss", "Takey Tap Tap", "One Step Pep", "Rhythm & Grow", "Rig-A-Jig"];
const rivalDeck = []

let hand = [];
let drawingCards = deck;

let rivalHand = [];
let rivalCards = deck;

//New cards:
function startTurn() {
    userBeats = 3;
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
    rivalBeats = 3;
    rivalHand = [];
    rivalCards = deck;
    for (i = 0; i < 3; i++) {
        let draw = Math.floor(Math.random() * rivalCards.length);
        rivalHand[i] = rivalCards[draw];
        rivalCards.splice(draw, 1);
    }
    console.log("Your opponent draws their cards.");
    console.log(`Your opponent plays ${rivalHand[1]}`)
}





//Card Functions:

//Lil Lindy
function lindy() {
    if (checkCost(1)) {
        let points = 2;
        points += userHype;
        points += userFear;

        if (points <= 0) {
            points = 0;
        }
        userPoints += points;
        console.log(`You gain ${points} points. You now have ${userPoints} points!`);
        checkGame(userPoints);
    }
}

//Gavotte Trot
function gavotte() {
    if (checkCost(2)) {
        let points = 4;
        points += userHype;
        points += userFear;

        if (points <= 0) {
            points = 0;
        }
        userPoints += points;
        console.log(`You gain ${points} points. You now have ${userPoints} points!`);
        checkGame(userPoints);
    }
}

//Flip Floss
function flip() {
    if (checkCost(3)) {
        let points = 7;
        points += userHype;
        points += userFear;

        if (points <= 0) {
            points = 0;
        }
        userPoints += points;
        console.log(`You gain ${points} points. You now have ${userPoints} points!`);
        checkGame(userPoints);
    }
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

//helper functions

function checkGame(userPoints) {
    if (userPoints >= 20) {
        console.log("You win!!!");
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