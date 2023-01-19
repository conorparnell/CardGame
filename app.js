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

//DECK setup
const basicDeck = 10;
const morriganDeck = [10, 11, 12];
const croghanDeck = [13, 14, 15];
const chulainnDeck = [16, 17, 18];
const jackDeck = [19, 20, 21];


//initialize scorekeeping
window.addEventListener('DOMContentLoaded', (event) => {
    updateAllStats();
});


/*
CARD IDs:
0 - Dredge
1 - Excavate
2 - Exhume
3 - Yoink
4 - Sláinte!
5 - Banshee Wail
6 - Will-o'-the-Wisp
7 - Bone Jump
8 - Hearty Haul
9 - Gold Teeth
10 - <the Morrigan> gives 2 fear
11 - <the Morrigan> Raven's Foresight <the Morrigan>
12 - <the Morrigan> Shapeshift <the Morrigan> steal and play a card of your opponent's special deck
13 - <Old Croghan> fisticuffs
14 - <Old Croghan> leather band
15 - <Old Croghan> 
16 - <Cú Chulainn> gain 2 cheer battlecry
17 - <Cú Chulainn> 
18 - <Cú Chulainn>Gae Bolg
19 - <Stingy Jack> Trick or Treat <Stingy Jack>
20 - <Stingy Jack> 
21 - <Stingy Jack> Devil's Coin - Random player steals 5 bones

STRETCH GOAL: THE POOKA

*/

//will either return the text of a card, or enact the card's ability. 'text' is a boolean for which to return
function playCard(id, text) {
    switch (id) {
        case 0:
            if (text) {
                return `Find ${calculateBones(2)} bones.`;
                break;
            } else {
                gain(calculateBones(2));
                break;
            }
        case 1:
            if (text) {
                return `Find ${calculateBones(4)} bones.`;
                break;
            } else {
                gain(calculateBones(4));
                break;
            }
        case 2:
            if (text) {
                return `Find ${calculateBones(7)} bones.`;
                break;
            } else {
                gain(calculateBones(7));
                break;
            }
        case 3:
            if (text) {
                return `Steal ${calculateBones(3)} bones.`;
                break;
            } else {
                steal(3);
                break;
            }
        case 4:
            if (text) {
                return "Gain 1 cheer.";
                break;
            } else {
                cheer(1);
                break;
            }
        case 5:
            if (text) {
                return "Your opponent gains 1 fear.";
                break;
            } else {
                fear(1);
                break;
            }
        case 6:
            if (text) {
                return "Gain 1 brawn.";
                break;
            } else {
                brawn(1);
                break;
            }
        case 7:
            if (text) {
                return "Draw 1 card.";
                break;
            } else {
                drawCards(1);
                if (userTurn) {
                    displayCard(userHand[userHand.length - 1]);
                }
                break;
            }
        case 8:
            if (text) {
                return `Find ${calculateBones(2)} bones. \nRemove 1 fear.`;
                break;
            } else {
                gain(calculateBones(2));
                calm(1);
                break;
            }
        case 9:
            if (text) {
                return `Find ${calculateBones(3)} bones. \nGain 1 cheer.`;
                break;
            } else {
                gain(calculateBones(3));
                cheer(1);
                break;
            }
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
            gain(num);
            reduce(num);
        }
    } else {
        if (userBones < num) {
            let bones = userBones;
            gain(bones);
            reduce(bones);
        } else {
            gain(num);
            reduce(num);
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




//COMPLETE CARD LIST:
const completeCardList = [
    {
        cardId: 0,
        cardName: "Dredge",
        cardCost: 1,
        cardImg: "",
        cardText: `Find ${calculateBones(2)} bones.`,
        cardType: "basic",
        cardCopies: 3
    },
    {
        cardId: 1,
        cardName: "Excavate",
        cardCost: 2,
        cardImg: "",
        cardText: `Find ${calculateBones(4)} bones.`,
        cardType: "basic",
        cardCopies: 2
    },
    {
        cardId: 2,
        cardName: "Exhume",
        cardCost: 3,
        cardImg: "",
        cardText: `Find ${calculateBones(7)} bones.`,
        cardType: "basic",
        cardCopies: 1
    },
    {
        cardId: 3,
        cardName: "Yoink",
        cardCost: 3,
        cardImg: "",
        cardText: `Steal ${calculateBones(3)} bones.`,
        cardType: "basic",
        cardCopies: 1
    },
    {
        cardId: 4,
        cardName: "Sláinte!",
        cardCost: 2,
        cardImg: "",
        cardText: "Gain 1 cheer.",
        cardType: "basic",
        cardCopies: 1
    },
    {
        cardId: 5,
        cardName: "Banshee Wail",
        cardCost: 2,
        cardImg: "",
        cardText: "Your opponent gains 1 fear.",
        cardType: "basic",
        cardCopies: 1
    },
    {
        cardId: 6,
        cardName: "Will-o'-the-Wisp",
        cardCost: 0,
        cardImg: "",
        cardText: "Gain 1 brawn.",
        cardType: "basic",
        cardCopies: 1
    },
    {
        cardId: 7,
        cardName: "Bone Jump",
        cardCost: 1,
        cardImg: "",
        cardText: "Draw 1 card.",
        cardType: "basic",
        cardCopies: 1
    },
    {
        cardId: 8,
        cardName: "Hearty Haul",
        cardCost: 2,
        cardImg: "",
        cardText: `Find ${calculateBones(2)} bones. \nRemove 1 fear.`,
        cardType: "basic",
        cardCopies: 1
    },
    {
        cardId: 9,
        cardName: "Gold Teeth",
        cardCost: 3,
        cardImg: "",
        cardText: `Find ${calculateBones(3)} bones. \nGain 1 cheer.`,
        cardType: "basic",
        cardCopies: 1
    }

    //SPECIAL DECKS:
    //To be implemented once finished being designed

    /*
    
    //the Morrigan:
    const morriganDeck = [
        {
            cardId: 10,
            cardName: "?"
            cardCost: 
            cardImg: "",
            cardText: "Your opponent gains 2 fear."
            cardType: "morrigan",
            cardCopies: 2,
        },
        {
            cardId: 11,
            cardName: "Raven's Foresight"
            cardCost: 
            cardImg: "",
            cardText: "Draw 2 cards."
            cardType: "morrigan",
            cardCopies: 1,
        },
        {
            cardId: 12,
            cardName: "Shapeshift"
            cardCost: 
            cardImg: "",
            cardText: "Play a random Aspect card from your opponent's deck"
            cardType: "morrigan",
            cardCopies: 1
        }
    ];
    
    //Old Croghan:
    const croghanDeck = [
        {
            cardId: 13,
            cardName: 
            cardCost: 
            cardImg: "",
            cardText: 
            cardType: "croghan",
            cardCopies: 2,
        },
        {
            cardId: 14,
            cardName: 
            cardCost: 
            cardImg: "",
            cardText: 
            cardType: "croghan",
            cardCopies: 1,
        },
        {
            cardId: 15,
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
            cardId: 16,
            cardName: 
            cardCost: 
            cardImg: "",
            cardText: 
            cardType: "chulainn",
            cardCopies: 2,
        },
        {
            cardId: 17,
            cardName: 
            cardCost: 
            cardImg: "",
            cardText: 
            cardType: "chulainn",
            cardCopies: 1,
        },
        {
            cardId: 18,
            cardName: "Gae Bolg"
            cardCost: 4
            cardImg: "",
            cardText: "Reduce your opponent's bones by half."
            cardType: "chulainn",
            cardCopies: 1
        }
    ];
    
    //Stingy Jack:
    const jackDeck = [
        {
            cardId: 19,
            cardName: "Trick or Treat"
            cardCost: 
            cardImg: "",
            cardText: "Steal 1 cheer.\n Your opponent gains 1 fear."
            cardType: "jack",
            cardCopies: 2
        },
        {
            cardId: 20,
            cardName: 
            cardCost: 
            cardImg: "",
            cardText: 
            cardType: "jack",
            cardCopies: 1
        },
        {
            cardId: 21,
            cardName: "Devil's Coin"
            cardCost: 
            cardImg: "",
            cardText: ""
            cardType: "jack",
            cardCopies: 1
        }
    ];
    
    */

];



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

//rival plays cards




//pass turn -> userTurn = true
//userTurn = true;
//turnOver = false;
//}


function passTurn() {
    userTurn = false;
    turnOver = true;
    let allCards = document.querySelectorAll(".card");
    allCards.forEach(element => element.remove());
    userHand = [];
    userRemainingDeck = Array.from(userDeck);
}

function refillDecks() {
    userRemainingDeck = Array.from(userDeck);
    rivalRemainingDeck = Array.from(rivalDeck);
}

function refreshCardText() {
    let allCards = document.querySelectorAll(".card");
    allCards.forEach(element => element.remove());
    displayHand();
}

//logic to display a card on the gameboard
function displayCard(id) {
    //new card
    let newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.classList.add(`${completeCardList[id].cardType}`);
    //card heading
    let cardHeading = document.createElement("div");
    cardHeading.classList.add("card-heading");
    //two paragraphs within card heading
    //card name with name inserted
    let cardName = document.createElement("p");
    cardName.classList.add("card-name");
    cardName.innerText = `${completeCardList[id].cardName}`;
    //card cost with cost inserted
    let cardCost = document.createElement("p");
    cardCost.classList.add("card-cost");
    cardCost.innerText = `${completeCardList[id].cardCost}`;
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
    cardText.classList.add(`"card-text"`);
    cardText.innerText = `${playCard(completeCardList[id].cardId, true)}`;
    //append card text to card body
    cardBody.appendChild(cardText);

    //append header, img, and body to newCard
    newCard.appendChild(cardHeading);
    newCard.appendChild(cardImg);
    newCard.appendChild(cardBody);

    //add event listeners for clicking - one for card ability, one for card removal
    newCard.addEventListener('click', (e) => {
        if (checkCost(completeCardList[id].cardCost)) {
            playCard(completeCardList[id].cardId, false);
            payCost(completeCardList[id].cardCost);
            updateAllStats();
            removeCard(e);

            if (userTurn) {
                let cardIndex = userHand.indexOf(completeCardList[id].cardId);
                userHand.splice(cardIndex, 1);
                refreshCardText();
            }
        }
    });

    //append new card to gameboard
    let gameBoard = document.getElementById("gameboard");
    gameBoard.appendChild(newCard).focus();
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



function payCost(cost) {
    if (userTurn) {
        userBrawn -= cost;
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
//fill both decks with basic cards
function fillDecks() {
    for (i = 0; i < basicDeck; i++) {
        let currentCard = completeCardList[i];
        for (j = 0; j < currentCard.cardCopies; j++) {
            userDeck.push(currentCard.cardId);
            rivalDeck.push(currentCard.cardId);
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
            console.log("Rival draws card");
            console.log(rivalHand);
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






///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////








//Enemy turn
function rivalTurn() {
    userTurn = false;
    console.log("userturn is off");
    refillDecks();
    console.log("Decks are refilled");
    clearBoard();
    console.log("board is cleared");
    refillBrawn();
    console.log("brawn is refilled");
    drawCards(startingHandSize);
    console.log("cards are drawn");
    console.log(rivalHand);
    let animationTimer = 0;
    for (j = 0; j < 2; j++) { //go through twice just in case of gaining brawn.
        for (i = 0; i < rivalHand.length; i++) {
            console.log(rivalHand[i] + " is next up");
            if (checkCost(completeCardList[rivalHand[i]].cardCost)) {
                console.log("rival has " + rivalBrawn + " brawn");
                console.log(`Rival plays ${completeCardList[rivalHand[i]].cardName}`);
                updateAllStats();
                playCard(rivalHand[i], false);
                console.log("Rival pays " + completeCardList[rivalHand[i]].cardCost + " brawm");
                rivalBrawn -= completeCardList[rivalHand[i]].cardCost;
                console.log("rival has " + rivalBrawn + " brawn");
                console.log("Rival has " + rivalBones + " bones");
                displayRivalCard(rivalHand[i], animationTimer);
                animationTimer += 3000;
                console.log(animationTimer);
                rivalHand.splice(i, 1);
                console.log(rivalHand);
                i--; //decrement to match the index lost
            } else {
                console.log(`Rival can't play ${completeCardList[rivalHand[i]].cardName}`);
                console.log(rivalHand);
            }
        }
    }
    rivalHand = [];
    console.log("rival hand is flushed");
    userTurn = true;
    console.log("userturn is on");
    updateAllStats();
    setTimeout(restartTurn, animationTimer);
}

function clearBoard() {
    let allCards = document.querySelectorAll(".card");
    allCards.forEach(element => element.remove());
}


const orangeDiv = document.getElementById("something");
orangeDiv.addEventListener('click', rivalTurn);
const greenDiv = document.getElementById("options");
greenDiv.addEventListener('click', clearBoard);
//const greyDiv = document.getElementById("placeholder");
//greyDiv.addEventListener('click', )

function restartTurn() {
    let allCards = document.querySelectorAll(".card");
    allCards.forEach(element => element.remove());
    userHand = [];
    userRemainingDeck = Array.from(userDeck);
    refillBrawn();
    drawCards(startingHandSize);
    displayHand();

}

function updateScore() {
    const userScore = document.getElementById('user-score');
    const userScoreBar = document.getElementById('user-score-bar');
    userScore.innerText = `${userBones}`;
    userScoreBar.setAttribute('value', `${userBones}`);

    //add logic for rival
}

function updateBrawn() {
    const userBrawnAmount = document.getElementById('user-brawn');
    //const rivalBrawnAmount = document.getElementById('rival-brawn');
    userBrawnAmount.innerText = `${userBrawn}`;
    //rivalBrawnAmount.innerText = `${rivalBrawn}`;
}

function updateCheer() {
    const userCheerAmount = document.getElementById('user-cheer');
    //rival
    userCheerAmount.innerText = `${userCheer}`;
    //rival
}

function updateFear() {
    const userFearAmount = document.getElementById('user-fear');
    //rival
    userFearAmount.innerText = `${userFear}`;
    //rival
}

function updateAllStats() {
    updateScore();
    updateBrawn();
    updateCheer();
    updateFear();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function displayRivalCard(id, delay) {
    //new card
    let newCard = document.createElement("div");
    newCard.classList.add("rival-card");
    newCard.classList.add(`${completeCardList[id].cardType}`);
    //card heading
    let cardHeading = document.createElement("div");
    cardHeading.classList.add("card-heading");
    //two paragraphs within card heading
    //card name with name inserted
    let cardName = document.createElement("p");
    cardName.classList.add("card-name");
    cardName.innerText = `${completeCardList[id].cardName}`;
    //card cost with cost inserted
    let cardCost = document.createElement("p");
    cardCost.classList.add("card-cost");
    cardCost.innerText = `${completeCardList[id].cardCost}`;
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
    cardText.classList.add(`"card-text"`);
    cardText.innerText = `${playCard(completeCardList[id].cardId, true)}`;
    //append card text to card body
    cardBody.appendChild(cardText);

    //append header, img, and body to newCard
    newCard.appendChild(cardHeading);
    newCard.appendChild(cardImg);
    newCard.appendChild(cardBody);


    //append new card to gametable
    let gameTable = document.getElementById("gametable");
    setTimeout( () => {
        gameTable.appendChild(newCard).focus()
        setTimeout(removeRivalCard, 3000);
    }, delay);
    
}

function removeRivalCard(){
    const rivalCard = document.querySelector(".rival-card");
    rivalCard.remove()
}