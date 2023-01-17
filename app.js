//gameplay variables
const startingHandSize = 4;
const startingBrawn = 4;
const winningScore = 30;
let userTurn = true; //boolean for whose turn it is. user = true, rival = false;

//USER setup - "User" to be used in all places, no more "Player"
let userBones = 0;
let userBrawn = 0;
let userCheer = 0;
let userFear = 0;

//RIVAL setup
let rivalBones = 0;
let rivalBrawn = 0;
let rivalCheer = 0;
let rivalFear = 0;

/*
CARD IDs:
1 - Dredge
2 - Excavate
3 - Exhume
4 - Yoink
5 - Will-o'-the-Wisp
6 - Banshee Wail
7 - Sláinte!
8 - Bone Jump
9 - Hearty Haul
10 - Gold Teeth
11-100 - <reserved>
...

101 - <the Morrigan card 1>
102 - <the Morrigan card 2> - raven? 
103 - <the Morrigan card 3>
104 - <Old Croghan card 1>
105 - <Old Croghan card 2>
106 - <Old Croghan card 3>
107 - <Cú Chulainn card 1>
108 - <Cú Chulainn card 2>
109 - <Cú Chulainn card 3> Gae Bolg
110 - <Stingy Jack card 1>
111 - <Stingy Jack card 2> Trick or Treat - give fear steal cheer?
112 - <Stingy Jack card 3>

STRETCH GOAL: THE POOKA

*/

//BASIC DECK:
const basicDeck = [
    {
        cardId: 1,
        cardName: "Dredge",
        cardCost: 1,
        cardImg: "",
        cardText: `Find ${calculateBones(2)} bones.`,
        cardType: "basic",
        cardCopies: 3
    },
    {
        cardId: 2,
        cardName: "Excavate",
        cardCost: 2,
        cardImg: "",
        cardText: `Find ${calculateBones(4)} bones.`,
        cardType: "basic",
        cardCopies: 2
    },
    {
        cardId: 3,
        cardName: "Exhume",
        cardCost: 3,
        cardImg: "",
        cardText: `Find ${calculateBones(7)} bones.`,
        cardType: "basic",
        cardCopies: 1
    },
    {
        cardId: 4,
        cardName: "Yoink",
        cardCost: 3,
        cardImg: "",
        cardText: `Steal ${calculateBones(3)} bones.`,
        cardType: "basic",
        cardCopies: 1
    },
    {
        cardId: 5,
        cardName: "Will-o'-the-Wisp",
        cardCost: 2,
        cardImg: "",
        cardText: "Gain 1 cheer.",
        cardType: "basic",
        cardCopies: 1
    },
    {
        cardId: 6,
        cardName: "Banshee Wail",
        cardCost: 2,
        cardImg: "",
        cardText: "Your opponent gains 1 fear.",
        cardType: "basic",
        cardCopies: 1
    },
    {
        cardId: 7,
        cardName: "Sláinte!",
        cardCost: 0,
        cardImg: "",
        cardText: "Gain 1 brawn.",
        cardType: "basic",
        cardCopies: 1
    },
    {
        cardId: 8,
        cardName: "Bone Jump",
        cardCost: 1,
        cardImg: "",
        cardText: "Draw 1 card",
        cardType: "basic",
        cardCopies: 1
    },
    {
        cardId: 9,
        cardName: "Hearty Haul",
        cardCost: 2,
        cardImg: "",
        cardText: `Find ${calculateBones(2)} bones, remove 1 fear.`,
        cardType: "basic",
        cardCopies: 1
    },
    {
        cardId: 10, 
        cardName: "Gold Teeth",
        cardCost: 3,
        cardImg: "",
        cardText: `Find ${calculateBones(3)} bones, gain 1 cheer.`,
        cardType: "basic",
        cardCopies: 1
    }
];

//SPECIAL DECKS:
//To be implemented once designed

/*

//the Morrigan:
const morriganDeck = [
    {
        cardId: 101,
        cardName: 
        cardCost: 
        cardImg: "",
        cardText: 
        cardType: "morrigan",
        cardCopies: 2,
    },
    {
        cardId: 102,
        cardName: 
        cardCost: 
        cardImg: "",
        cardText: 
        cardType: "morrigan",
        cardCopies: 1,
    },
    {
        cardId: 103,
        cardName: 
        cardCost: 
        cardImg: "",
        cardText: 
        cardType: "morrigan",
        cardCopies: 1
    }
];

//Old Croghan:
const croghanDeck = [
    {
        cardId: 104,
        cardName: 
        cardCost: 
        cardImg: "",
        cardText: 
        cardType: "croghan",
        cardCopies: 2,
    },
    {
        cardId: 105,
        cardName: 
        cardCost: 
        cardImg: "",
        cardText: 
        cardType: "croghan",
        cardCopies: 1,
    },
    {
        cardId: 106,
        cardName: 
        cardCost: 
        cardImg: "",
        cardText: 
        cardType: "croghan",
        cardCopies: 1
    }
];

//Cú Chulainn
const chulainnDeck = [
    {
        cardId: 107,
        cardName: 
        cardCost: 
        cardImg: "",
        cardText: 
        cardType: "chulainn",
        cardCopies: 2,
    },
    {
        cardId: 108,
        cardName: 
        cardCost: 
        cardImg: "",
        cardText: 
        cardType: "chulainn",
        cardCopies: 1,
    },
    {
        cardId: 109,
        cardName: 
        cardCost: 
        cardImg: "",
        cardText: 
        cardType: "chulainn",
        cardCopies: 1
    }
];

//Stingy Jack:
const jackDeck = [
    {
        cardId: 110,
        cardName: 
        cardCost: 
        cardImg: "",
        cardText: 
        cardType: "jack",
        cardCopies:
    },
    {
        cardId: 111,
        cardName: 
        cardCost: 
        cardImg: "",
        cardText: 
        cardType: "jack",
        cardCopies:
    },
    {
        cardId: 112,
        cardName: 
        cardCost: 
        cardImg: "",
        cardText: 
        cardType: "jack",
        cardCopies:
    }
];

*/

//Game Setup


















function calculateBones(num, player){
    let bones = num;

    if (player) {
        bones += userCheer;
        bones -= userFear;
        if (bones < 0){
            bones = 0;
        }
        return bones;
    } else {
        bones += userCheer;
        bones -= userFear;
        if (bones < 0){
            bones = 0;
        }
        return bones;
    }
}






//move this to be with player score keeper
//rename to be themed?
window.addEventListener('DOMContentLoaded', (event) => {
    updatePlayerScore(0);
});





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
        console.log(`You gain ${points} points. You now have ${userPoints} points!`);
        updatePlayerScore(points);
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
        console.log(`You gain ${points} points. You now have ${userPoints} points!`);
        updatePlayerScore(points);
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
orangeDiv.addEventListener('click', testNewCards);
const greenDiv = document.getElementById("options");
greenDiv.addEventListener('click', rivalTurn);
const greyDiv = document.getElementById("placeholder");
//greyDiv.addEventListener('click', )

//["Lil Lindy", "Lil Lindy", "Lil Lindy", "Gavotte Trot", "Gavotte Trot", "Flip Floss", "Takey Tap Tap", "One Step Pep", "Rhythm & Grow", "Rig-A-Jig"];

function testNewCards(){
    const previousCards = document.querySelectorAll(".card");
    previousCards.forEach(element => element.remove());

let tempArr = [
    {
        cardTitle: "Lil Lindy",
        cardCost: 1,
        cardText: `Gain ${2+userHype-userFear} points`,
        cardFunc: lindy,
        cardImg: ""
    },
    {
        cardTitle: "Lil Lindy",
        cardCost: 1,
        cardText: `Gain ${2+userHype-userFear} points`,
        cardFunc: lindy,
        cardImg: ""
    },
    {
        cardTitle: "Lil Lindy",
        cardCost: 1,
        cardText: `Gain ${2+userHype-userFear} points`,
        cardFunc: lindy,
        cardImg: ""
    },
    {
        cardTitle: "Gavotte Trot",
        cardCost: 2,
        cardText: `Gain ${4+userHype-userFear} points`,
        cardFunc: gavotte,
        cardImg: ""
    },
    {
        cardTitle: "Gavotte Trot",
        cardCost: 2,
        cardText: `Gain ${4+userHype-userFear} points`,
        cardFunc: gavotte,
        cardImg: ""   
    },
    {
        cardTitle: "One Step Pep",
        cardCost: 2,
        cardText: `Gain 1 Hype`,
        cardFunc: pep,
        cardImg: ""   
    },

    
];
userBeats = 4;
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
        cardCostPara.innerText = `${cardPulled.cardCost}`;
        cardCostPara.classList.add("cost");
        cardTitleDiv.appendChild(cardNamePara);
        cardTitleDiv.appendChild(cardCostPara);

        let cardImgDiv = document.createElement("div");
        cardImgDiv.classList.add("card-img");

        let cardTextDiv = document.createElement("div");
        cardTextDiv.classList.add("card-text");
        cardTextDiv.innerText = `${cardPulled.cardText}`;
        

        newCard.appendChild(cardTitleDiv);
        newCard.appendChild(cardImgDiv);
        newCard.appendChild(cardTextDiv);

        newCard.addEventListener('click', () => {playCard(cardPulled.cardTitle)});
        newCard.addEventListener('click', (e) => {
            if (checkCost(cardPulled.cardCost)) {
                removeCard(e);
            }
        });
        const gameBoard = document.getElementById("gameboard");
        gameBoard.appendChild(newCard);
        drawingCards.splice(draw, 1);
    }

}


function updatePlayerScore(points){
    const playerScore = document.getElementById('player-score');
    const playerScoreBar = document.getElementById('playerScore');
    userPoints = userPoints + points;
    playerScore.innerText = `${userPoints}`;
    playerScoreBar.setAttribute('value', `${userPoints}`);
}