//GAMEPLAY VARIABLES
const startingHandSize = 4;
let startingBrawn = 4;
const winningScore = 30;
let userTurn = true; //boolean for whose turn it is. user = true, rival = false;

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
const morriganDeck = [10, 10, 11, 11, 12];
const croghanDeck = [13, 13, 13, 13, 14, 14, 15, 15];
const chulainnDeck = [17, 17, 18, 18, 19];
const jackDeck = [22, 22, 23, 23, 24];

//initialize scorekeeping
window.addEventListener('DOMContentLoaded', (event) => {
    updateAllStats();
});


/*
CARD IDs:

Basic deck:

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

the Morrígan:

    10 - Morrígan's Shriek
    11 - Raven's Foresight
    12 - Shapeshift

Old Croghan:

    13 - Sphagnum Bloom
    14 - Bog Rot
    15 - Fisticuffs
    16 - Rot

Cú Chulainn:

    17 - Battlecry
    18 - Cattle Raid
    19 - Gae Bolg
    20 - Finnbhennach
    21 - Donn Cuailnge

Stingy Jack:

    22 - Trick or Treat
    23 - Grinning Turnip
    24 - Devil's Coin

Possible future Aspects:
The Pooka
Stephen Dedalus & Leopold Bloom

*/

//will either return the text of a card, or enact the card's ability. 'text' is a boolean for which to return- true for text, false for ability;
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
                steal(calculateBones(3));
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
                return "Your opponent gains 1\n fear.";
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
                return "Draw 2 cards.";
                break;
            } else {
                drawCards(2);
                if (userTurn) {
                    displayHand();
                }
                break;
            }
        case 8:
            if (text) {
                return `Find ${calculateBones(2)} bones. \nLose 1 fear.`;
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
        case 10:
            if (text) {
                return completeCardList[id].cardText;
                break;
            } else {
                fear(2);
                break;
            }
        case 11:
            if (text) {
                return completeCardList[id].cardText;
                break;
            } else {
                drawCards(3);
                break;
            }
        case 12:
            if (text) {
                return completeCardList[id].cardText;
                break;
            } else {
                shapeShift();
                break;
            }
        case 13:
            if (text) {
                return completeCardList[id].cardText;
                break;
            } else {
                brawn(1);
                drawCards(1);
                break;
            }
        case 14:
            if (text) {
                return completeCardList[id].cardText;;
                break;
            } else {
                giveRot();
                break;
            }
        case 15:
            if (text) {
                return `Find ${calculateBones(2)} bones for each\n brawn you have.`;
                break;
            } else {
                fisty();
                break;
            }
        case 16:
            if (text) {
                return completeCardList[id].cardText;
                break;
            } else {
                //does nothing
                break;
            }
        case 17:
            if (text) {
                return completeCardList[id].cardText;
                break;
            } else {
                cheer(2);
                break;
            }
        case 18:
            if (text) {
                return completeCardList[id].cardText;
                break;
            } else {
                cattleRaid();
                break;
            }
        case 19:
            if (text) {
                return completeCardList[id].cardText;
                break;
            } else {
                bolg();
                break;
            }
        case 20:
            if (text) {
                return completeCardList[id].cardText;
                break;
            } else {
                refillBrawn();
                break;
            }
        case 21:
            if (text) {
                return completeCardList[id].cardText;
                break;
            } else {
                doubleCheer();
                break;
            }
        case 22:
            if (text) {
                return completeCardList[id].cardText;
                break;
            } else {
                cheer(1);
                fear(1);
                break;
            }
        case 23:
            if (text) {
                return completeCardList[id].cardText;
                break;
            } else {
                startingBrawn++;
                brawn(1);
                break;
            }
        case 24:
            if (text) {
                return `Flip the Devil's Coin.\n A random player steals\n ${calculateBones(10)} bones.`;
                break;
            } else {
                devilsCoin();
                break;
            }
    }
}

function devilsCoin() {
    let coinFlip = Math.ceil((Math.random() * 100));
    console.log(coinFlip);
    if (coinFlip % 2 == 0) {
        steal(calculateBones(10));
        console.log
        if (userTurn) {
            scrollUpAnimation("The Devil favors you!", 1);
            setTimeout(clearScreen, 1700);
        } else {
            scrollUpAnimation("The Devil scorns you!", 1);
            setTimeout(clearScreen, 1700);
        }
    } else {
        if (userBones < calculateBones(10)) {
            let bones = userBones;
            gain(bones);
            reduce(bones);
        } else {
            gain(calculateBones(10));
            reduce(calculateBones(10));
        }
        if (userTurn) {
            scrollUpAnimation("The Devil scorns you!", 1);
            setTimeout(clearScreen, 1700);
        } else {
            scrollUpAnimation("The Devil favors you!", 1);
            setTimeout(clearScreen, 1700);
        }
    }
}



function cattleRaid() {
    let bull = Math.ceil((Math.random() * 2) + 19);
    if (userTurn) {
        userHand.push(bull);
        displayHand();
    } else {
        rivalHand.push(bull);
    }
}

function doubleCheer() {
    if (userTurn) {
        userCheer = userCheer * 2;
    } else {
        rivalCheer = rivalCheer * 2;
    }
}

function bolg() {
    if (userTurn) {
        rivalBones = Math.floor(rivalBones / 2);
        rivalCheer = 0;
    } else {
        userBones = Math.floor(userBones / 2);
        userCheer = 0;
    }
}

function fisty() {
    if (userTurn) {
        let punches = (userBrawn * calculateBones(2));
        gain(punches);
        userBrawn = 0;
    } else {
        let punches = (rivalBrawn * calculateBones(2));
        gain(punches);
        rivalBrawn = 0;
    }
}


function giveRot() {
    if (userTurn) {
        rivalDeck = rivalDeck.concat([16, 16, 16]);
    } else {
        userDeck = userDeck.concat([16, 16, 16]);
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
        cardImg: "img/dredge.jpg",
        cardText: `Find ${calculateBones(2)} bones.`,
        cardType: "basic",
        cardCopies: 3
    },
    {
        cardId: 1,
        cardName: "Excavate",
        cardCost: 2,
        cardImg: "img/excavate.jpg",
        cardText: `Find ${calculateBones(4)} bones.`,
        cardType: "basic",
        cardCopies: 2
    },
    {
        cardId: 2,
        cardName: "Exhume",
        cardCost: 3,
        cardImg: "img/exhume.jpg",
        cardText: `Find ${calculateBones(7)} bones.`,
        cardType: "basic",
        cardCopies: 1
    },
    {
        cardId: 3,
        cardName: "Yoink",
        cardCost: 3,
        cardImg: "img/yoink.jpg",
        cardText: `Steal ${calculateBones(3)} bones.`,
        cardType: "basic",
        cardCopies: 1
    },
    {
        cardId: 4,
        cardName: "Sláinte!",
        cardCost: 2,
        cardImg: "img/slainte.jpg",
        cardText: "Gain 1 cheer.",
        cardType: "basic",
        cardCopies: 1
    },
    {
        cardId: 5,
        cardName: "Banshee Wail",
        cardCost: 2,
        cardImg: "img/wail.jpg",
        cardText: "Your opponent gains 1\n fear.",
        cardType: "basic",
        cardCopies: 1
    },
    {
        cardId: 6,
        cardName: "Will-o'-the-Wisp",
        cardCost: 0,
        cardImg: "img/willo.jpg",
        cardText: "Gain 1 brawn.",
        cardType: "basic",
        cardCopies: 1
    },
    {
        cardId: 7,
        cardName: "Bone Jump",
        cardCost: 1,
        cardImg: "img/bonejump.jpg",
        cardText: "Draw 2 cards.",
        cardType: "basic",
        cardCopies: 1
    },
    {
        cardId: 8,
        cardName: "Hearty Haul",
        cardCost: 2,
        cardImg: "img/hearty.jpg",
        cardText: `Find ${calculateBones(2)} bones. \nRemove 1 fear.`,
        cardType: "basic",
        cardCopies: 1
    },
    {
        cardId: 9,
        cardName: "Gold Teeth",
        cardCost: 3,
        cardImg: "img/gold.jpg",
        cardText: `Find ${calculateBones(3)} bones. \nGain 1 cheer.`,
        cardType: "basic",
        cardCopies: 1
    },
    //the Morrígan:
    {
        cardId: 10,
        cardName: "Morrígan's Shriek",
        cardCost: 2,
        cardImg: "img/shriek.jpg",
        cardText: "Your opponent gains 2\n fear.",
        cardType: "morrigan",
        cardCopies: 1,
    },
    {
        cardId: 11,
        cardName: "Raven's Foresight",
        cardCost: 2,
        cardImg: "img/raven.jpg",
        cardText: "Draw 3 cards.",
        cardType: "morrigan",
        cardCopies: 2,
    },
    {
        cardId: 12,
        cardName: "Shapeshift",
        cardCost: 2,
        cardImg: "img/shapeshift.jpg",
        cardText: "Play a random Aspect\n card from your \nopponent's deck",
        cardType: "morrigan",
        cardCopies: 2
    },
    //Old Croghan:
    {
        cardId: 13,
        cardName: "Sphagnum Bloom",
        cardCost: 0,
        cardImg: "img/sphagnum.jpg",
        cardText: "Gain 1 brawn.\nDraw 1 card.",
        cardType: "croghan",
        cardCopies: 3,
    },
    {
        cardId: 14,
        cardName: "Bog Rot",
        cardCost: 2,
        cardImg: "img/bogrot.jpg",
        cardText: "Put 3 useless Rot cards\n into your opponent's \ndeck.",
        cardType: "croghan",
        cardCopies: 2,
    },
    {
        cardId: 15,
        cardName: "Fisticuffs",
        cardCost: 0,
        cardImg: "img/fisty.jpg",
        cardText: "Find 2 bones for each brawn you have.",
        cardType: "croghan",
        cardCopies: 1
    },
    {
        cardId: 16,
        cardName: "Rot",
        cardCost: 10,
        cardImg: "img/rot.jpg",
        cardText: "Gross.",
        cardType: "croghan",
        cardCopies: 0

    },
    //Cú Chulainn:
    {
        cardId: 17,
        cardName: "Battlecry",
        cardCost: 2,
        cardImg: "img/battlecry.jpg",
        cardText: "Gain 2 cheer.",
        cardType: "chulainn",
        cardCopies: 2,
    },
    {
        cardId: 18,
        cardName: "Cattle Raid",
        cardCost: 3,
        cardImg: "img/raid.jpg",
        cardText: "Add one Mythical Bull \nto your hand",
        cardType: "chulainn",
        cardCopies: 2,
    },
    {
        cardId: 19,
        cardName: "Gae Bolg",
        cardCost: 4,
        cardImg: "img/bolg.jpg",
        cardText: "Reduce your opponent's \nbones by half.\nThey lose all cheer.",
        cardType: "chulainn",
        cardCopies: 1
    },
    {
        cardId: 20,
        cardName: "Finnbhennach",
        cardCost: 0,
        cardImg: "img/finn.jpg",
        cardText: "The White Bull\n replenishes your brawn.",
        cardType: "chulainn",
        cardCopies: 0
    },
    {
        cardId: 21,
        cardName: "Donn Cuailnge",
        cardCost: 0,
        cardImg: "img/donn.jpg",
        cardText: "The Brown Bull\n doubles your cheer.",
        cardType: "chulainn",
        cardCopies: 0
    },
    //Stingy Jack:
    {
        cardId: 22,
        cardName: "Trick or Treat",
        cardCost: 2,
        cardImg: "img/trick.jpg",
        cardText: "Gain 1 cheer.\n Your opponent gains 1\n fear.",
        cardType: "jack",
        cardCopies: 2
    },
    {
        cardId: 23,
        cardName: "Grinning Turnip",
        cardCost: 3,
        cardImg: "img/turnip.jpg",
        cardText: "Starting brawn\n increased by 1.\nGain 1 brawn.",
        cardType: "jack",
        cardCopies: 2
    },
    {
        cardId: 24,
        cardName: "Devil's Coin",
        cardCost: 0,
        cardImg: "img/coin.jpg",
        cardText: `Flip the Devil's Coin.\n A random player steals ${calculateBones(10)} bones.`,
        cardType: "jack",
        cardCopies: 1
    }
];




//Game Setup

//Building decks:
let userDeck = []; //baseline deck to pull from
let rivalDeck = [];
fillDecks(); //fills both decks with basic cards
let userSelection = ""; //for displaying during game
let rivalSelection = ""; //to hold the rival's selected deck, for Shapeshift to work
displayCharacters();

function displayCharacters() {

    const userSel = document.getElementById("user-selection");
    const charSelectScreen = document.createElement("div");
    charSelectScreen.classList.add("splash");

    const morriganDiv = document.createElement("div");
    morriganDiv.classList.add("char-select");
    morriganDiv.setAttribute('id', 'morrigan-div');
    morriganDiv.innerHTML = "<p>the Morrígan</p>";
    morriganDiv.addEventListener('click', morriganSelect)
    morriganDiv.addEventListener('click', () => {
        rivalDeckSelection(['o', 'c', 'j']);
        clearSelection();
        userSelection = "m";
        userSel.innerText = "the Morrígan";
        setTimeout(startGame, 500);
    });

    const croghanDiv = document.createElement("div");
    croghanDiv.classList.add("char-select");
    croghanDiv.setAttribute('id', 'croghan-div');
    croghanDiv.innerHTML = "<p>Old Croghan Man</p>";
    croghanDiv.addEventListener('click', croghanSelect);
    croghanDiv.addEventListener('click', () => {
        rivalDeckSelection(['m', 'c', 'j']);
        clearSelection();
        userSelection = "o";
        userSel.innerText = "Old Croghan Man";
        setTimeout(startGame, 500);
    });

    const chulainnDiv = document.createElement("div");
    chulainnDiv.classList.add("char-select");
    chulainnDiv.innerHTML = "<p>Cú Chulainn</p>";
    chulainnDiv.setAttribute('id', 'chulainn-div');
    chulainnDiv.addEventListener('click', chulainnSelect);
    chulainnDiv.addEventListener('click', () => {
        rivalDeckSelection(['m', 'o', 'j']);
        clearSelection();
        userSelection = "c";
        userSel.innerText = "Cú Chulainn";
        setTimeout(startGame, 500);
    });

    const jackDiv = document.createElement("div");
    jackDiv.classList.add("char-select");
    jackDiv.setAttribute('id', 'jack-div');
    jackDiv.innerHTML = "<p>Stingy Jack</p>";
    jackDiv.addEventListener('click', jackSelect);
    jackDiv.addEventListener('click', () => {
        rivalDeckSelection(['m', 'o', 'c']);
        clearSelection();
        userSelection = "j";
        userSel.innerText = "Stingy Jack";
        setTimeout(startGame, 500);
    });

    charSelectScreen.appendChild(morriganDiv);
    charSelectScreen.appendChild(croghanDiv);
    charSelectScreen.appendChild(chulainnDiv);
    charSelectScreen.appendChild(jackDiv);

    const body = document.querySelector("body");
    body.appendChild(charSelectScreen);
}

function clearSelection() {
    const splash = document.querySelectorAll(".splash");
    splash.forEach(item => {
        item.remove();
    });
    const asp = document.getElementById("aspect");
    asp.remove();
}

function morriganSelect() {
    userDeck = userDeck.concat(morriganDeck);
}

function croghanSelect() {
    userDeck = userDeck.concat(croghanDeck);
}

function chulainnSelect() {
    userDeck = userDeck.concat(chulainnDeck);
}

function jackSelect() {
    userDeck = userDeck.concat(jackDeck);
}

function rivalDeckSelection(userChoice) {
    let rivalChoice = deckRandomizer(userChoice);
    const rivalSel = document.getElementById("rival-selection");
    switch (rivalChoice) {
        case "m":
            rivalDeck = rivalDeck.concat(morriganDeck);
            rivalSel.innerText = "the Morrígan";
            rivalSelection = "m";
            break;
        case "o":
            rivalDeck = rivalDeck.concat(croghanDeck);
            rivalSelection = "o";
            rivalSel.innerText = "Old Croghan Man";
            break;
        case "c":
            rivalDeck = rivalDeck.concat(chulainnDeck);
            rivalSelection = "c";
            rivalSel.innerText = "Cú Chulainn";
            break;
        case "j":
            rivalDeck = rivalDeck.concat(jackDeck);
            rivalSelection = "j";
            rivalSel.innerText = "Stingy Jack";
            break;
    }
}

function deckRandomizer(arr) {
    random = Math.floor(Math.random() * 3);
    return arr[random];
}

let userRemainingDeck = Array.from(userDeck); //deck to manipulate each turn
let rivalRemainingDeck = Array.from(rivalDeck);
let userHand = []; //cards drawn/displayed
let rivalHand = [];

function loadDecks() {
    userRemainingDeck = Array.from(userDeck); //deck to manipulate each turn
    rivalRemainingDeck = Array.from(rivalDeck);
}

const orangeDiv = document.getElementById("something");

function startGame() {
    orangeDiv.addEventListener('click', passTurn); //turn on end turn button
    loadDecks();
    refillBrawn();
    drawCards(startingHandSize);
    displayHand();
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

    let cardImage = document.createElement("img");
    cardImage.classList.add("card-image");
    cardImage.src = completeCardList[id].cardImg;
    cardImg.appendChild(cardImage);

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

//pays Brawn cost of card
function payCost(cost) {
    if (userTurn) {
        userBrawn -= cost;
    } else {
        rivalBrawn -= cost;
    }
}

//removes card after playing it
function removeCard(e) {
    let element = e.currentTarget;
    element.remove();
}




//displays each card in hand
function displayHand() {
    clearBoard();
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







let animationTimer = 0;


function rivalTurnInitialize() {
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
    animationTimer = 0;
    console.log("animation timer is reset");
}

function rivalPlayCard(id) {
    console.log("Rival pays " + completeCardList[id].cardCost + " brawn");
    rivalBrawn -= completeCardList[id].cardCost;
    displayRivalCard(id, animationTimer);
    console.log("card is displayed in " + animationTimer + " miliseconds");
    let delay = 0; //normal cards
    if (id == 12) { //shapeshift delay
        delay = 3000;
    }
    setTimeout(() => {
        playCard(id, false);
        console.log("card is actually played");
        console.log("rival has " + rivalBrawn + " brawn");
        console.log("Rival has " + rivalBones + " bones");
        updateAllStats();
        console.log("stats are updated");
        console.log("checking hand again....");
        setTimeout(() => {
            checkRivalHand();
        }, delay);

    }, animationTimer + 900);
    console.log(animationTimer);
    console.log(rivalHand);
}


function checkRivalHand() { //WORKING
    for (i = 0; i < rivalHand.length; i++) {
        console.log(completeCardList[rivalHand[i]].cardName + " is next up");
        console.log("checking if user has enough brawn to pay: " + completeCardList[rivalHand[i]].cardCost)
        if (checkCost(completeCardList[rivalHand[i]].cardCost)) {
            console.log("user can pay the brawn cost");
            console.log("user 'plays' the card in " + animationTimer + " miliseconds");
            rivalPlayCard(completeCardList[rivalHand[i]].cardId);
            if (animationTimer < 2000) {
                console.log("increasing time limiter");
                animationTimer += 3000;
            }
            console.log("timer increased to " + animationTimer);
            rivalHand.splice(i, 1);
            console.log("card is removed from hand");
            return;
        }
    }
    console.log("no cards playable - ending turn");
    endRivalTurn();
}

function endRivalTurn() { //WORKING
    rivalHand = [];
    console.log("rival hand is flushed");
    updateAllStats();
    setTimeout(userTurnAnimation, animationTimer);
    setTimeout(() => {
        orangeDiv.addEventListener('click', passTurn);
    }, (animationTimer + 1700));
}


function clearBoard() {
    let allCards = document.querySelectorAll(".card");
    allCards.forEach(element => element.remove());
}

function fadeBoard() {
    let allCards = document.querySelectorAll(".card");
    allCards.forEach(element => element.classList.add('fade'));
}

function unfadeBoard() {
    let allCards = document.querySelectorAll(".card");
    allCards.forEach(element => element.classList.remove('fade'));
    displayHand();
}



function passTurn() {
    clearBoard();
    orangeDiv.removeEventListener('click', passTurn);
    rivalTurnAnimation();
    rivalTurnInitialize();
    setTimeout(checkRivalHand, 1700);
}

function userTurnAnimation() {
    const newScreen = document.createElement("div");
    newScreen.classList.add("screen");
    newScreen.innerText = "Your Turn!";

    const gameTable = document.getElementById("gametable");
    gameTable.appendChild(newScreen);
    console.log("text scrolls");
    setTimeout(() => {
        clearScreen();
        console.log("screen is cleared");
    }, 1700);
    setTimeout(restartTurn, 1800);
}

function scrollUpAnimation(text, b = 0) {
    clearBoard();
    const newScreen = document.createElement("div");
    newScreen.classList.add("screen");
    if (b > 0) {
        newScreen.classList.add("halfscreen");
    }
    newScreen.innerText = text;

    const gameTable = document.getElementById("gametable");
    gameTable.appendChild(newScreen);
}

function rivalTurnAnimation() {
    const newScreen = document.createElement("div");
    newScreen.classList.add("screen");
    newScreen.innerText = "Rival's Turn!";

    const gameTable = document.getElementById("gametable");
    gameTable.appendChild(newScreen);
    setTimeout(clearScreen, 1700);
}

function clearScreen() {
    let screen = document.querySelectorAll(".screen");
    screen.forEach(element => element.remove());
}


function showInstruction() {
    window.open('https://github.com/conorparnell/PeatBone/blob/main/README.md', '_blank');
}

const greenDiv = document.getElementById("instructions");
greenDiv.addEventListener('click', showInstruction);
const greyDiv = document.getElementById("restart");
greyDiv.addEventListener('click', restartGame)

function restartGame() {
    location.reload();
}

function restartTurn() {
    userTurn = true;
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

    const rivalScore = document.getElementById('rival-score');
    const rivalScoreBar = document.getElementById('rival-score-bar');
    rivalScore.innerText = `${rivalBones}`;
    rivalScoreBar.setAttribute('value', `${rivalBones}`);

}

function updateBrawn() {
    const userBrawnAmount = document.getElementById('user-brawn');
    const rivalBrawnAmount = document.getElementById('rival-brawn');
    userBrawnAmount.innerText = `${displayBrawn(userBrawn)}`;
    rivalBrawnAmount.innerText = `${displayBrawn(rivalBrawn)}`;

    function displayBrawn(num) {
        let flex = "";
        for (i = 0; i < num; i++) {
            flex += "💪";
        }
        return flex;
    }
}



function updateCheer() {
    const userCheerAmount = document.getElementById('user-cheer');
    userCheerAmount.innerText = `${displayCheer(userCheer)}`;
    const rivalCheerAmount = document.getElementById('rival-cheer');
    rivalCheerAmount.innerText = `${displayCheer(rivalCheer)}`;

    function displayCheer(num) {
        let luck = "";
        for (i = 0; i < num; i++) {
            luck += "☘️";
        }
        return luck;
    }
}

function updateFear() {
    const userFearAmount = document.getElementById('user-fear');
    userFearAmount.innerText = `${displayFear(userFear)}`;
    const rivalFearAmount = document.getElementById('rival-fear');
    rivalFearAmount.innerText = `${displayFear(rivalFear)}`;

    function displayFear(num) {
        let skull = "";
        for (i = 0; i < num; i++) {
            skull += "💀";
        }
        return skull;
    }
}

function updateAllStats() {
    updateScore();
    updateBrawn();
    updateCheer();
    updateFear();
    checkGameOver();
}

function checkGameOver() {
    if (userBones >= 30) {
        scrollUpAnimation("You win!");
        orangeDiv.removeEventListener('click', passTurn);
        setTimeout(clearBoard, 500);
        setTimeout(clearBoard, 500);
        setTimeout(clearBoard, 1000);
        console.log("WINNER");
    } else if (rivalBones >= 30) {
        scrollUpAnimation("You lose!!!");
        orangeDiv.removeEventListener('click', passTurn);
        setTimeout(clearBoard, 500);
        setTimeout(clearBoard, 1000);
        removeRivalCard();
        setTimeout(removeRivalCard, 500);
        setTimeout(removeRivalCard, 1000);
        setTimeout(removeRivalCard, 2000);
        setTimeout(removeRivalCard, 1500);
        console.log("LOSER!!!!!!!");
    }
}



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

    let cardImage = document.createElement("img");
    cardImage.classList.add("card-image");
    cardImage.src = completeCardList[id].cardImg;
    cardImg.appendChild(cardImage);

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
    setTimeout(() => {
        gameTable.appendChild(newCard).focus()
        setTimeout(removeRivalCard, 3000);
    }, delay);

}

function removeRivalCard() {
    const rivalCard = document.querySelector(".rival-card");
    rivalCard.remove()
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function shapeShift() {
    //new card
    setTimeout(fadeBoard, 20); //working. looks sick
    console.log("fading cards");
    let newCard = document.createElement("div");
    newCard.classList.add("shapeshift");
    newCard.classList.add("fade"); //starts faded
    newCard.classList.add(`${completeCardList[12].cardType}`);
    //card heading
    let cardHeading = document.createElement("div");
    cardHeading.classList.add("card-heading");
    //two paragraphs within card heading
    //card name with name inserted
    let cardName = document.createElement("p");
    cardName.classList.add("card-name");
    cardName.classList.add("shifted");
    cardName.setAttribute('id', 'shift-name');
    cardName.innerText = `${completeCardList[12].cardName}`;
    //card cost with cost inserted
    let cardCost = document.createElement("p");
    cardCost.classList.add("card-cost");
    cardCost.classList.add("shifted");
    cardCost.setAttribute('id', 'shift-cost');
    cardCost.innerText = `${completeCardList[12].cardCost}`;
    //append paragraphs to card heading
    cardHeading.appendChild(cardName);
    cardHeading.appendChild(cardCost);

    //card image
    let cardImg = document.createElement("div");
    cardImg.classList.add("card-img");
    cardImg.classList.add("shifted");

    let cardImage = document.createElement("img");
    cardImage.classList.add("card-image");
    cardImage.setAttribute('id', 'shift-img');
    cardImage.src = `${completeCardList[12].cardImg}`;
    cardImg.appendChild(cardImage);


    //card body
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    //add card text paragraph to body
    let cardText = document.createElement("p");
    cardText.classList.add(`"card-text"`);
    cardText.classList.add("shifted");
    cardText.setAttribute('id', 'shift-text');
    cardText.innerText = `${playCard(completeCardList[12].cardId, true)}`;
    //append card text to card body
    cardBody.appendChild(cardText);

    //append header, img, and body to newCard
    newCard.appendChild(cardHeading);
    newCard.appendChild(cardImg);
    newCard.appendChild(cardBody);


    //append new card to gametable
    let gameTable = document.getElementById("gametable");
    gameTable.appendChild(newCard).focus();

    //set some variables to access

    const name = document.getElementById('shift-name');
    const cost = document.getElementById('shift-cost');
    const img = document.getElementById('shift-img');
    const text = document.getElementById('shift-text');

    //unfade!
    const unfade = document.querySelector(".shapeshift");
    setTimeout(() => {
        unfade.classList.remove("fade");
    }, 40);

    //SHIFT!!!!!!!!
    setTimeout(shapeShiftTransform, 1000);


    function shapeShiftTransform() {
        let shape = document.querySelector(".shapeshift");
        let chosenCard = ""; //to hold card ID

        //card color is changed, text is faded out 
        setTimeout(changeCardClass, 1000);

        //text is changed, text is faded in
        setTimeout(replaceText, 1600);




        shape = document.querySelector(".shapeshift");
        setTimeout(() => {
            playCard(chosenCard)
            console.log("playing" + chosenCard);
        }, 3000)
        setTimeout(() => {
            shape.remove();
            unfadeBoard();
            updateAllStats();

        }, 3500);

        function changeCardClass() {
            blankShiftText();
            if (userTurn) {
                switch (rivalSelection) {
                    case "o":
                        shape.classList.replace("morrigan", "croghan");
                        break;
                    case "c":
                        shape.classList.replace("morrigan", "chulainn");
                        break;
                    case "j":
                        shape.classList.replace("morrigan", "jack");
                        break;
                }
            } else {
                switch (userSelection) {
                    case "o":
                        shape.classList.replace("morrigan", "croghan");
                        break;
                    case "c":
                        shape.classList.replace("morrigan", "chulainn");
                        break;
                    case "j":
                        shape.classList.replace("morrigan", "jack");
                        break;
                }
            }
        }

        function replaceText() {
            const croghanCards = [13, 14, 15];
            const chulainnCards = [17, 18, 19];
            const jackCards = [22, 23, 24];
            let cardPicker = Math.floor(Math.random() * 3);
            if (userTurn) {

                switch (rivalSelection) {
                    case "o":
                        chosenCard = croghanCards[cardPicker];
                        morphText();
                        break;
                    case "c":
                        chosenCard = chulainnCards[cardPicker];
                        morphText();
                        break;
                    case "j":
                        chosenCard = jackCards[cardPicker];
                        morphText();
                        break;
                }
            } else {
                switch (userSelection) {
                    case "o":
                        chosenCard = croghanCards[cardPicker];
                        morphText();
                        break;
                    case "c":
                        chosenCard = chulainnCards[cardPicker];
                        morphText();
                        break;
                    case "j":
                        chosenCard = jackCards[cardPicker];
                        morphText();
                        break;
                }
            }



            function morphText() {
                console.log(chosenCard);
                console.log("morphing text");
                name.innerText = `${completeCardList[chosenCard].cardName}`;
                console.log(completeCardList[chosenCard].cardName);
                cost.innerText = `${completeCardList[chosenCard].cardCost}`;
                img.src = completeCardList[chosenCard].cardImg;
                text.innerText = `${playCard(chosenCard, true)}`;
                unBlankShiftText();
            }
        }

        function blankShiftText() {
            let shifted = document.querySelectorAll(".shifted");
            shifted.forEach(item => {
                item.classList.add("fade");
            })
            setTimeout(() => {
                name.innerText = "";
                cost.innerText = "";
                img.innerHTML = "";
                text.innerText = "";
            }, 500);
        }
        function unBlankShiftText() {
            let shifted = document.querySelectorAll(".shifted");
            shifted.forEach(item => {
                console.log("text unfading?");
                item.classList.remove("fade");
            })
        }
    }
}