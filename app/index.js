// import document from "document";
import GameUI from "./game-ui";
import Match from "./match";
import Appbit from "appbit";

// prevents the app to be killed after 2 min of inactivity
Appbit.appTimeoutEnabled = false;

const currentMatch = new Match();
const gameUI = new GameUI(currentMatch);
gameUI.updateView();

// gameUI.printGameData();
// let container = document.getElementById("game-container");
// // Get the selected index
// let currentIndex = container.value;

// // Set the selected index
// container.value = 0; // jump to first slide


