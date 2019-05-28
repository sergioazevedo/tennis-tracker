// import document from "document";
import GameUI from './game-ui';

let currentGameData = {
  currentSet: 1,
  currentGame: 1,
  setScore: {
    me: 0,
    op: 0,
  },
  gameScore: {
    me: 0,
    op: 0,
  }
};

const gameUI = new GameUI(currentGameData);
gameUI.printGameData();
// let container = document.getElementById("game-container");
// // Get the selected index
// let currentIndex = container.value;

// // Set the selected index
// container.value = 0; // jump to first slide


