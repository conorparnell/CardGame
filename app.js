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
let drawingCards = Array.from(deck);

let rivalHand = [];
let rivalCards = Array.from(deck);

//New cards:
function startTurn() {
    const previousCards = document.querySelectorAll(".card");
    previousCards.forEach(element => element.remove());
    userBeats = 4;
    hand = [];
    drawingCards = Array.from(deck);
    for (i = 0; i < 3; i++) {
        let draw = Math.floor(Math.random() * drawingCards.length);
        hand[i] = drawingCards[draw];
        let cardPulled = drawingCards[draw];
        console.log(`${drawingCards[draw]} added to hand.`);
        let newCard = document.createElement("div");
        newCard.classList.add("card");
        newCard.innerText = `${drawingCards[draw]}`;
        newCard.addEventListener('click', () => {
            playCard(cardPulled);
        });
        newCard.addEventListener('click', removeCard);
        const gameBoard = document.getElementById("gameboard");
        gameBoard.appendChild(newCard);
        drawingCards.splice(draw, 1);
    }
}

//Enemy turn:
function rivalTurn() {
    rivalBeats = 4;
    rivalHand = [];
    rivalCards = Array.from(rivalDeck);
    for (i = 0; i < 3; i++) {
        let draw = Math.floor(Math.random() * rivalCards.length);
        rivalHand[i] = rivalCards[draw];
        rivalCards.splice(draw, 1);
    }
    console.log("Your opponent draws their cards.");
    rivalPlay();
}



function removeCard(e) {
    let element = e.currentTarget;
    e
    element.remove();
}

//Player Card Functions:

function playCard(cardName) {
    switch (cardName) {
        case "Lil Lindy":
            lindy();
            break;
        case "Gavotte Trot":
            gavotte();
            break;
        case "Flip Floss":
            flip();
            break;
        case "Takey Tap Tap":
            takey();
            break;
        case "One Step Pep":
            pep();
            break;
        case "Rhythm & Grow":
            rhythm();
            break;
        case "Rig-A-Jig":
            rig();
            break;
    }
}

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
function takey() {
    if (checkCost(3)) {
        let points = 3;
        points += userHype;
        points -= userFear;

        if (points <= 0) {
            points = 0;
        }

        if (rivalPoints < points) {
            points = rivalPoints;
        }

        userPoints += points;
        rivalPoints -= points;
        console.log(`You steal ${points} points. You now have ${userPoints} points!`);
        checkGame();
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


//Rival Card Functions

//Twizzle Sizzle
function twizzle() {
    rivalBeats -= 1;
    let points = 1;
    points += rivalHype;
    points -= rivalFear;

    if (points <= 0) {
        points = 0;
    }
    rivalPoints += points;
    console.log(`Your rival gains ${points} point. Rival now has ${rivalPoints} points!`);
    checkGame();
}

//Dainty Dip
function dainty() {
    rivalBeats -= 2;
    let points = 3;
    points += rivalHype;
    points -= rivalFear;

    if (points <= 0) {
        points = 0;
    }
    rivalPoints += points;
    console.log(`Your rival gains ${points} point. Rival now has ${rivalPoints} points!`);
    checkGame();
}

//Glissade Parade
function glissade() {
    rivalBeats -= 3;
    let points = 5;
    points += rivalHype;
    points -= rivalFear;

    if (points <= 0) {
        points = 0;
    }
    rivalPoints += points;
    console.log(`Your rival gains ${points} point. Rival now has ${rivalPoints} points!`);
    checkGame();

}

//Mooching Mamba
function mooching() {
    rivalBeats -= 4;
    let points = 3;
    points += rivalHype;
    points -= rivalFear;

    if (points <= 0) {
        points = 0;
    }

    if (userPoints < points) {
        points = userPoints;
    }

    userPoints -= points;
    rivalPoints += points;
    console.log(`Your rival steals ${points} points. Rival now has ${rivalPoints} points!`);
    checkGame();
}

//Cheer Squad
function cheer() {
    rivalBeats -= 2;
    rivalHype += 1;
    console.log(`Rival gains 1 hype. Rival now has ${rivalHype} hype!`)
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

function rivalPlay() {
    for (i = 0; i < rivalHand.length; i++) {
        let cost = 0;

        switch (rivalHand[i]) {
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
                cost = 2;
        }

        if (cost < rivalBeats) {
            console.log(`Rival plays ${rivalHand[i]}`);
            switch (rivalHand[i]) {
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
            }
        }

    }
}

function displayCards() {
    //
}

// while (true) {
//     startTurn();
//     rivalTurn();
// }

const orangeDiv = document.getElementById("something");
orangeDiv.addEventListener('click', startTurn);
const greenDiv = document.getElementById("options");
greenDiv.addEventListener('click', rivalTurn);
const greyDiv = document.getElementById("placeholder");
//greyDiv.addEventListener('click', )



function testNewCards(){

let tempArr = [
    {
        cardTitle: "Lil Lindy",
        cardCost: 1,
        cardText: "Gain 2 points",
        cardFunc: lindy,
        cardImg: ""
    }
];

drawingCards = Array.from(tempArr);
    for (i = 0; i < 3; i++) {
        let draw = Math.floor(Math.random() * drawingCards.length);
        hand[i] = drawingCards[draw];
        let cardPulled = hand[i];
        let newCard = document.createElement("div");
        newCard.classList.add("card");

        //title div
        let cardTitleDiv = document.createElement("div");
        cardTitleDiv.classList.add("card-title");
        let cardNamePara = document.createElement("p");
        cardNamePara.innerText = `${cardPulled.cardTitle}`;

        let cardCostPara = document.createElement("p");
        cardCostPara.innerText = `${hand[i].cardCost}`;
        cardTitleDiv.appendChild(cardNamePara);
        cardTitleDiv.appendChild(cardCostPara);

        let cardImgDiv = document.createElement("div");
        cardImgDiv.classList.add("card-img");

        let cardTextDiv = document.createElement("div");
        cardTextDiv.classList.add("card-text");
        cardTextDiv.innerText = `${hand[i].cardText}`;
        

        newCard.appendChild(cardTitleDiv);
        newCard.appendChild(cardImgDiv);
        newCard.appendChild(cardTextDiv);

        newCard.addEventListener('click', () => {playCard(cardPulled.cardTitle)});
        newCard.addEventListener('click', removeCard);
        const gameBoard = document.getElementById("gameboard");
        gameBoard.appendChild(newCard);
        drawingCards.splice(draw, 1);
    }

}
