import document from "document";

export default class GameUI {
  constructor(gameData) {
    this.gameData = gameData;
    this.bindComponents();
    this.updateComponents();
  }

  bindComponents() {
    this.components = {
      currentSet: document.getElementById("set-no"),
      setMyScore: document.getElementById("set-my-score"),
      setOpScore: document.getElementById("set-op-score"),
      gameMyScore: document.getElementById("game-my-score"),
      gameOpScore: document.getElementById("game-op-score"),
    }
  }

  updateComponents(){
    this.components.currentSet.text = 'Set ' + this.gameData.currentSet;
    this.components.setMyScore.text = this.gameData.setScore.me;
    this.components.setOpScore.text = this.gameData.setScore.op;
    this.components.gameMyScore.text = this.gameData.gameScore.me;
    this.components.gameOpScore.text = this.gameData.gameScore.op;
  }

  printGameData() {
    console.log(JSON.stringify(this.gameData));
  }
}