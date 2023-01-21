//GAMEPLAY VARIABLES
const startingHandSize = 4;
let startingBrawn = 4;
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
const morriganDeck = [10, 10, 11, 11, 12];
const croghanDeck = [13, 13, 13, 13, 14, 14, 15, 15];
const chulainnDeck = [17, 17, 18, 18, 19];
const jackDeck = [22, 22, 22, 23, 23, 24];

//



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

10 - <the Morrigan> Shriek of the Morrigan - gives 2 fear x3
11 - <the Morrigan> Raven's Foresight - draw 2 x2
12 - <the Morrigan> Shapeshift - steal and play a card of your opponent's special deck

Old Croghan:

13 - <Old Croghan> Sphagnum Bloom - gain 1 brawn draw 1 card x4 - 0
14 - <Old Croghan> Bog Rot - put 3 Rot cards in your opponents deck x 2
15 - <Old Croghan> Fisticuffs - Gain 2 bones for each brawn you have (calculated before playing) x 2
16 - <Old Croghan> Rot - Useless card (Costs 10) x 0

Cú Chulainn:

17 - <Cú Chulainn> Battlecry - gain 2 cheer x3
18 - <Cú Chulainn> Cattle Raid -  Math.ceil(Math.random() * 4); x 2
19 - <Cú Chulainn> Gae Bolg - Opponent loses half their bones rounded up x 1
20 - <Cú Chulainn> - Finnbhennach - Replenish your brawn (costs 0) x 0
21 - <Cú Chulainn> - Donn Cuailnge - Double your cheer (costs 0) x 0

Stingy Jack:

22 - <Stingy Jack> Trick or Treat - Steal 1 Cheer, Give 1 Fear x 3
23 - <Stingy Jack> Grinning Turnip - Starting brawn increased by 1, (+1 brawn); x 2
24 - <Stingy Jack> Devil's Coin - Random player steals 10 bones - Math.ceil(Math.random() * 4);

STRETCH GOAL: 
THE POOKA

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
                scrollUpAnimation("DOESN'T WORK YET");
                console.log("TO BE IMPLEMENTED");
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
                return `Gain ${calculateBones(2)} bones for each brawn you have.`;
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

/*
case :
    if (text) {
        return ;
        break;
    } else {
        
        break;
    }

*/

function devilsCoin() {
    let coinFlip = Math.ceil((Math.random() * 100));
    console.log(coinFlip);
    if (coinFlip % 2 == 0) {
        steal(calculateBones(10));
        if (userTurn) {
            scrollUpAnimation("The Devil favors you!");
            setTimeout(clearScreen, 1700);
        } else {
            scrollUpAnimation("The Devil scorns you!");
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
            scrollUpAnimation("The Devil scorns you!");
            setTimeout(clearScreen, 1700);
        } else {
            scrollUpAnimation("The Devil favors you!");
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
        cardText: "Your opponent gains 1\n fear.",
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
        cardText: "Draw 2 cards.",
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
    },
    //the Morrígan:
    {
        cardId: 10,
        cardName: "Shriek of the Morrígan",
        cardCost: 2,
        cardImg: "",
        cardText: "Your opponent gains 2\n fear.",
        cardType: "morrigan",
        cardCopies: 2,
    },
    {
        cardId: 11,
        cardName: "Raven's Foresight",
        cardCost: 2,
        cardImg: "",
        cardText: "Draw 3 cards.",
        cardType: "morrigan",
        cardCopies: 2,
    },
    {
        cardId: 12,
        cardName: "Shapeshift",
        cardCost: 3,
        cardImg: "",
        cardText: "Play a random Aspect\n card from your \nopponent's deck",
        cardType: "morrigan",
        cardCopies: 1
    },
    //Old Croghan:
    {
        cardId: 13,
        cardName: "Sphagnum Bloom",
        cardCost: 0,
        cardImg: "",
        cardText: "Gain 1 brawn.\nDraw 1 card.",
        cardType: "croghan",
        cardCopies: 3,
    },
    {
        cardId: 14,
        cardName: "Bog Rot",
        cardCost: 2,
        cardImg: "",
        cardText: "Put 3 useless Rot cards\n into your opponent's \ndeck.",
        cardType: "croghan",
        cardCopies: 2,
    },
    {
        cardId: 15,
        cardName: "Fisticuffs",
        cardCost: 0,
        cardImg: "",
        cardText: "Gain 2 bones for each brawn you have.",
        cardType: "croghan",
        cardCopies: 1
    },
    {
        cardId: 16,
        cardName: "Rot",
        cardCost: 10,
        cardImg: "",
        cardText: "Gross.",
        cardType: "croghan",
        cardCopies: 0

    },
    //Cú Chulainn:
    {
        cardId: 17,
        cardName: "Battlecry",
        cardCost: 2,
        cardImg: "",
        cardText: "Gain 2 cheer.",
        cardType: "chulainn",
        cardCopies: 2,
    },
    {
        cardId: 18,
        cardName: "Cattle Raid",
        cardCost: 3,
        cardImg: "",
        cardText: "Add one Mythical Bull \nto your hand",
        cardType: "chulainn",
        cardCopies: 2,
    },
    {
        cardId: 19,
        cardName: "Gae Bolg",
        cardCost: 4,
        cardImg: "",
        cardText: "Reduce your opponent's \nbones by half.\nThey lose all cheer.",
        cardType: "chulainn",
        cardCopies: 1
    },
    {
        cardId: 20,
        cardName: "Finnbhennach",
        cardCost: 0,
        cardImg: "",
        cardText: "The White Bull\n replenishes your brawn.",
        cardType: "chulainn",
        cardCopies: 0
    },
    {
        cardId: 21,
        cardName: "Donn Cuailnge",
        cardCost: 0,
        cardImg: "",
        cardText: "The Brown Bull\n doubles your cheer.",
        cardType: "chulainn",
        cardCopies: 0
    },
    //Stingy Jack:
    {
        cardId: 22,
        cardName: "Trick or Treat",
        cardCost: 1,
        cardImg: "",
        cardText: "Gain 1 cheer.\n Your opponent gains 1 fear.",
        cardType: "jack",
        cardCopies: 3
    },
    {
        cardId: 23,
        cardName: "Grinning Turnip",
        cardCost: 3,
        cardImg: "",
        cardText: "Starting brawn\n increased by 1.\nGain 1 brawn.",
        cardType: "jack",
        cardCopies: 2
    },
    {
        cardId: 24,
        cardName: "Devil's Coin",
        cardCost: 0,
        cardImg: "",
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
let rivalSelection = ""; //to hold the rival's selected deck, for Shapeshift to work
displayCharacters();

function displayCharacters() {
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
    const splash = document.querySelector(".splash");
    splash.remove();
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
    switch (rivalChoice) {
        case "m":
            rivalDeck = rivalDeck.concat(morriganDeck);
            rivalSelection = "m";
            break;
        case "o":
            rivalDeck = rivalDeck.concat(croghanDeck);
            rivalSelection = "o";
            break;
        case "c":
            rivalDeck = rivalDeck.concat(chulainnDeck);
            rivalSelection = "c";
            break;
        case "j":
            rivalDeck = rivalDeck.concat(jackDeck);
            rivalSelection = "j";
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

function startGame() {
    loadDecks();
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
    /*
        //TEST IN PROGRESS/////////////////////////////////////////////////////////////////
        let cardImage = document.createElement("img");
        cardImage.classList.add("card-image");
        cardImage.src = completeCardList[id].cardImg;
        cardImg.appendChild(cardImage);
        //TODO: make art lol
    */
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

function determineDecks() {
    return [1];
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
            console.log(completeCardList[rivalHand[i]].cardName + " is next up");
            if (checkCost(completeCardList[rivalHand[i]].cardCost)) {
                console.log(`Rival plays ${completeCardList[rivalHand[i]].cardName}`);
                rivalBrawn -= completeCardList[rivalHand[i]].cardCost;
                console.log("Rival pays " + completeCardList[rivalHand[i]].cardCost + " brawn");
                displayRivalCard(rivalHand[i], animationTimer);
                playCard(rivalHand[i], false);
                
                updateAllStats();
                console.log("rival has " + rivalBrawn + " brawn");
                console.log("Rival has " + rivalBones + " bones");
                setTimeout(tempCheck, (animationTimer + 1000));
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

    console.log("userturn is on");
    updateAllStats();
    setTimeout(userTurnAnimation, animationTimer);
}

function clearBoard() {
    let allCards = document.querySelectorAll(".card");
    allCards.forEach(element => element.remove());
}

function tempCheck() {
    console.log("casting NOW");
}

function passTurn() {
    clearBoard();
    rivalTurnAnimation();
    setTimeout(rivalTurn, 1700);
}

function userTurnAnimation() {
    const newScreen = document.createElement("div");
    newScreen.classList.add("screen");
    newScreen.innerText = "Your Turn!";

    const gameTable = document.getElementById("gametable");
    gameTable.appendChild(newScreen);
    setTimeout(clearScreen, 1700);
    setTimeout(restartTurn, 1700);
    userTurn = true;
}

function scrollUpAnimation(text) {
    clearBoard();
    const newScreen = document.createElement("div");
    newScreen.classList.add("screen");
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

const orangeDiv = document.getElementById("something");
orangeDiv.addEventListener('click', passTurn);
//const greenDiv = document.getElementById("options");
//greenDiv.addEventListener('click', clearBoard);
const greyDiv = document.getElementById("placeholder");
greyDiv.addEventListener('click', restartGame)

function restartGame() {
    location.reload();
}

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
        clearBoard();
        setTimeout(clearBoard, 500);
        setTimeout(clearBoard, 1000);
        console.log("WINNER");
    } else if (rivalBones >= 30) {
        scrollUpAnimation("You lose!!!");
        clearBoard();
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
    setTimeout(() => {
        gameTable.appendChild(newCard).focus()
        setTimeout(removeRivalCard, 3000);
    }, delay);

}

function removeRivalCard() {
    const rivalCard = document.querySelector(".rival-card");
    rivalCard.remove()
}