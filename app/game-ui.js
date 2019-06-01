import document from "document";

export default class GameUI {
  constructor(game) {
    this.game = game;
    this.bindComponents();
    this.bindEvents();
    this.updateView();
  }

  bindComponents() {
    this.components = {
      currentSet: document.getElementById("set-no"),
      setMyScore: document.getElementById("set-my-score"),
      setOpScore: document.getElementById("set-op-score"),
      gameMyScore: document.getElementById("game-my-score"),
      gameOpScore: document.getElementById("game-op-score"),
      myScoreButton: document.getElementById("my-score"),
      opScoreButton: document.getElementById("op-score"),
    }
  }

  bindEvents() {
    this.components.myScoreButton.onclick = () => {
      this.game.pointForMe();
      this.updateView();
    }

    this.components.opScoreButton.onclick = () => {
      this.game.pointForOp();
      this.updateView();
    }
  }

  updateView() {
    this.components.currentSet.text = 'Set ' + this.game.data.currentSet;
    this.components.setMyScore.text = this.game.data.gameScore.me;
    this.components.setOpScore.text = this.game.data.gameScore.op;
    this.components.gameMyScore.text = this.game.data.pointScore.me;
    this.components.gameOpScore.text = this.game.data.pointScore.op;
  }

  printGameData() {
    console.log(JSON.stringify(this.game));
  }
}