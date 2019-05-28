// import document from "document";
import GameUI from './game-ui';
import Game from './game';

const currentGame = new Game();
const gameUI = new GameUI(currentGame);

gameUI.printGameData();
// let container = document.getElementById("game-container");
// // Get the selected index
// let currentIndex = container.value;

// // Set the selected index
// container.value = 0; // jump to first slide


