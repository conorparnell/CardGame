//GAMEPLAY VARIABLES
const startingHandSize = 4;
const startingBrawn = 4;
const winningScore = 30;
let userTurn = true; //boolean for whose turn it is. user = true, rival = false;
let turnOver = false; //boolean for if the user is done with their turn

//USER setup
let userBones = 0;
let userBrawn = startingBrawn;
let userCheer = 0;
let userFear = 0;

//RIVAL setup
let rivalBones = 0;
let rivalBrawn = startingBrawn;
let rivalCheer = 0;
let rivalFear = 0;

//initialize scorekeeping
window.addEventListener('DOMContentLoaded', (event) => {
    updateAllStats();
});


/*
CARD IDs:
1 - Dredge
2 - Excavate
3 - Exhume
4 - Yoink
5 - Sláinte!
6 - Banshee Wail
7 - Will-o'-the-Wisp
8 - Bone Jump
9 - Hearty Haul
10 - Gold Teeth
11-100 - <reserved>
...

101 - <the Morrigan card 1> gives 2 fear
102 - <the Morrigan card 2> - raven? 
103 - <the Morrigan card 3> - shapeshift - steal and play a card of your opponent's special deck
104 - <Old Croghan card 1> fisticuffs
105 - <Old Croghan card 2> leather band
106 - <Old Croghan card 3> 
107 - <Cú Chulainn card 1> gain 2 cheer battlecry
108 - <Cú Chulainn card 2> 
109 - <Cú Chulainn card 3> Gae Bolg - reduce rival bones by half rounded up
110 - <Stingy Jack card 1> trick or treat - give fear steal cheer
111 - <Stingy Jack card 2> 
112 - <Stingy Jack card 3>

STRETCH GOAL: THE POOKA

*/


function playCard(id) {
    switch (id) {
        case 1:
            gain(calculateBones(2));
            break;
        case 2:
            gain(calculateBones(4));
            break;
        case 3:
            gain(calculateBones(7));
            break;
        case 4:
            steal(3);
            break;
        case 5:
            cheer(1);
            break;
        case 6:
            fear(1);
            break;
        case 7:
            brawn(1);
            break;
        case 8:
            drawCards(1);
            if (userTurn) {
                displayCard(userHand[userHand.length - 1]);
            }
            break;
        case 9:
            gain(calculateBones(2));
            calm(1);
            break;
        case 10:
            gain(calculateBones(3));
            cheer(1);
            break;
    }
}

//CARD ABILITY FUNCTIONS

//gains bones 
function gain(num) {
    let bones = num;
    if (userTurn) {
        userBones += bones;
    } else {
        rivalBones += bones;
    }
}

//steals bones
function steal(num) {
    if (userTurn) {
        if (rivalBones < num) {
            let bones = rivalBones;
            gain(bones);
            reduce(bones);
        } else {
            gain(bones);
            reduce(bones);
        }
    } else {
        if (userBones < num) {
            let bones = userBones;
            gain(bones);
            reduce(bones);
        } else {
            gain(bones);
            reduce(bones);
        }
    }
}

//increases cheer of user
function cheer(num) {
    if (userTurn) {
        userCheer += num;
    } else {
        rivalCheer += num;
    }
}

//gives opponent fear
function fear(num) {
    if (userTurn) {
        rivalFear += num;
    } else {
        userFear += num;
    }
}

//increases brawn of the user
function brawn(num) {
    if (userTurn) {
        userBrawn += num;
    } else {
        rivalBrawn += num;
    }
}

//reduces fear of the user
function calm(num) {
    if (userTurn) {
        userFear -= num;
        if (userFear < 0) {
            userFear = 0;
        }
    } else {
        rivalFear -= num;
        if (rivalFear < 0) {
            rivalFear = 0;
        }
    }
}

//reduces bones of opponent
function reduce(num) {
    if (userTurn) {
        rivalBones -= num;
        if (rivalBones < 0) {
            rivalBones = 0;
        }
    } else {
        userBones -= num;
        if (userBones < 0) {
            userBones = 0;
        }
    }
}


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
        cardName: "Sláinte!",
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
        cardName: "Will-o'-the-Wisp",
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
        cardText: `Find ${calculateBones(2)} bones. \nRemove 1 fear.`,
        cardType: "basic",
        cardCopies: 1
    },
    {
        cardId: 10,
        cardName: "Gold Teeth",
        cardCost: 3,
        cardImg: "",
        cardText: `Find ${calculateBones(3)} bones. \nGain 1 cheer.`,
        cardType: "basic",
        cardCopies: 1
    }
];

//SPECIAL DECKS:
//To be implemented once finished being designed

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
        cardCopies: 2
    },
    {
        cardId: 111,
        cardName: 
        cardCost: 
        cardImg: "",
        cardText: 
        cardType: "jack",
        cardCopies: 1
    },
    {
        cardId: 112,
        cardName: 
        cardCost: 
        cardImg: "",
        cardText: 
        cardType: "jack",
        cardCopies: 1
    }
];

*/

//Game Setup

//Building decks:
let userDeck = []; //baseline deck to pull from
let rivalDeck = [];
fillDecks(); //fills both decks with basic cards
let userRemainingDeck = Array.from(userDeck); //deck to manipulate each turn
let rivalRemainingDeck = Array.from(rivalDeck);
let userHand = []; //cards drawn/displayed
let rivalHand = [];


//GAME LOOP:
//while (gameOver) {
  // while (userTurn) {
        //User Turn
        //Brawn refilled
        refillBrawn();
        //Draw cards
        drawCards(startingHandSize);
        //display hand
        displayHand();
        //while(!turnOver){
            //do nothing, play cards, then hit pass turn
        //}
        //play cards
        //endTurn -> remove all card elements, flush hand, refill remaining deck
   //}
    //pass turn -> userTurn = false
    //rival brawn refilled
    //rival draws cards
    //rival plays cards
    //pass turn -> userTurn = true
    //userTurn = true;
    //turnOver = false;
//}


function passTurn(){
    userTurn = false;
    turnOver = true;
    let allCards = document.querySelectorAll(".card");
    allCards.forEach(element => element.remove());
    userHand = [];
    userRemainingDeck = Array.from(userDeck);
}

function refreshCardText(){
    let allCards = document.querySelectorAll(".card");
    allCards.forEach(element => element.remove());
    displayHand();
}

//logic to display a card on the gameboard
function displayCard(card) {
    //new card
    let newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.classList.add(`${card.cardType}`);
    //card heading
    let cardHeading = document.createElement("div");
    cardHeading.classList.add("card-heading");
    //two paragraphs within card heading
    //card name with name inserted
    let cardName = document.createElement("p");
    cardName.classList.add("card-name");
    cardName.innerText = `${card.cardName}`;
    //card cost with cost inserted
    let cardCost = document.createElement("p");
    cardCost.classList.add("card-cost");
    cardCost.innerText = `${card.cardCost}`;
    //append paragraphs to card heading
    cardHeading.appendChild(cardName);
    cardHeading.appendChild(cardCost);

    //card image
    let cardImg = document.createElement("div");
    cardImg.classList.add("card-img");
    //TODO: make art lol

    //card body
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    //add card text paragraph to body
    let cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.innerText = `${card.cardText}`;
    //append card text to card body
    cardBody.appendChild(cardText);

    //append header, img, and body to newCard
    newCard.appendChild(cardHeading);
    newCard.appendChild(cardImg);
    newCard.appendChild(cardBody);

    //add event listeners for clicking - one for card ability, one for card removal
    newCard.addEventListener('click', (e) => {
        if (checkCost(card.cardCost)) {
            playCard(card.cardId);
            payCost(card.cardCost);
            updateAllStats();
            removeCard(e);
            if (userTurn) {
                let cardIndex = userHand.indexOf(card);
                userHand.splice(cardIndex, 1);
                refreshCardText();
            }
        }
    });

    //append new card to gameboard
    let gameBoard = document.getElementById("gameboard");
    gameBoard.appendChild(newCard);
}

//check if card is playable
function checkCost(cost) {
    if (userTurn) {
        if (cost > userBrawn) {
            return false;
        } else {
            return true;
        }
    } else {
        if (cost > rivalBrawn) {
            return false;
        } else {
            return true;
        }
    }
}

function payCost(cost){
    if (userTurn){
        userBrawn -= cost;
        console.log(`${userBrawn} brawn left`);
    } else {
        rivalBrawn -= cost;
    }
}


function removeCard(e) {
    let element = e.currentTarget;
    element.remove();
}




//displays each card in hand
function displayHand() {
    for (i = 0; i < userHand.length; i++) {
        displayCard(userHand[i]);
    }
}


//working:
//fill both decks from selected cards
function fillDecks() {
    for (i = 0; i < basicDeck.length; i++) {
        let currentCard = basicDeck[i];
        for (j = 0; j < currentCard.cardCopies; j++) {
            userDeck.push(currentCard);
            rivalDeck.push(currentCard);
        }
    }
}

//cards are drawn depending on whose turn it is 
function drawCards(num) {
    for (i = 0; i < num; i++) {
        if (userTurn) {
            let draw = Math.floor(Math.random() * userRemainingDeck.length);
            userHand.push(userRemainingDeck[draw]);
            userRemainingDeck.splice(draw, 1);
        } else {
            let draw = Math.floor(Math.random() * rivalRemainingDeck.length);
            rivalHand.push(rivalRemainingDeck[draw]);
            rivalRemainingDeck.splice(draw, 1);
        }
    }
}

//refills brawn depending on whose turn it is
function refillBrawn() {
    if (userTurn) {
        userBrawn = startingBrawn;
        updateBrawn();
    } else {
        rivalBrawn = startingBrawn;
        updateBrawn();
    }
}







//returns false until a score reaching winningScore
function gameOver() {
    if (userBones >= winningScore || rivalBones >= winningScore) {
        return true;
    } else {
        return false;
    }
}


//calculates bonuses based on fear and cheer
function calculateBones(num) {
    let bones = num;

    if (userTurn) {
        bones += userCheer;
        bones -= userFear;
        if (bones < 0) {
            bones = 0;
        }
        return bones;
    } else {
        bones += rivalCheer;
        bones -= rivalFear;
        if (bones < 0) {
            bones = 0;
        }
        return bones;
    }
}









/*


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
*/

const orangeDiv = document.getElementById("something");
orangeDiv.addEventListener('click', restartTurn);
//const greenDiv = document.getElementById("options");
//greenDiv.addEventListener('click', rivalTurn);
//const greyDiv = document.getElementById("placeholder");
//greyDiv.addEventListener('click', )

function restartTurn(){
    let allCards = document.querySelectorAll(".card");
    allCards.forEach(element => element.remove());
    userHand = [];
    userRemainingDeck = Array.from(userDeck);
    refillBrawn();
    drawCards(startingHandSize);
    displayHand();

}

function updateScore(){
    const userScore = document.getElementById('user-score');
    const userScoreBar = document.getElementById('user-score-bar');
    userScore.innerText = `${userBones}`;
    userScoreBar.setAttribute('value', `${userBones}`);

    //add logic for rival
}

function updateBrawn(){
    const userBrawnAmount = document.getElementById('user-brawn');
    //const rivalBrawnAmount = document.getElementById('rival-brawn');
    userBrawnAmount.innerText = `${userBrawn}`;
    //rivalBrawnAmount.innerText = `${rivalBrawn}`;
}

function updateCheer(){
    const userCheerAmount = document.getElementById('user-cheer');
    //rival
    userCheerAmount.innerText = `${userCheer}`;
    //rival
}

function updateFear(){
    const userFearAmount = document.getElementById('user-fear');
    //rival
    userFearAmount.innerText = `${userFear}`;
    //rival
}

function updateAllStats(){
    updateScore();
    updateBrawn();
    updateCheer();
    updateFear();
}