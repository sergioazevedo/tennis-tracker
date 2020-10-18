import document from "document";
import { vibration } from "haptics";
import Appbit from "appbit";

export default class GameUI {
  constructor(match) {
    this.match = match;
    this._bindComponents();
    this._bindEvents();
    this.updateView();
    this._setCallbacks();
  }

  updateView() {
    this.components.currentSet.text = 'Set ' + this.match.currentSet;
    this.components.setMyScore.text = this.match.gameScore.me;
    this.components.setOpScore.text = this.match.gameScore.op;
    this.components.gameMyScore.text = this.match.pointScore.me;
    this.components.gameOpScore.text = this.match.pointScore.op;
  }

  printGameData() {
    console.log(JSON.stringify(this.match));
  }

  _bindComponents() {
    this.components = {
      currentSet: document.getElementById("set-no"),
      setMyScore: document.getElementById("set-my-score"),
      setOpScore: document.getElementById("set-op-score"),
      gameMyScore: document.getElementById("game-my-score"),
      gameOpScore: document.getElementById("game-op-score"),
      myScoreButton: document.getElementById("my-score"),
      opScoreButton: document.getElementById("op-score"),
      undoButton: document.getElementById("undo-button"),
      simpleModal: document.getElementById("simple-modal"),
      simpleModalButton: document.getElementById("simple-modal-button"),
      simpleModalText: document.getElementById("simple-modal-text"),
    }
  }

  _bindEvents() {
    this.components.myScoreButton.onclick = () => {
      this.match.pointForMe();
      this.updateView();
    }

    this.components.opScoreButton.onclick = () => {
      this.match.pointAgainstMe();
      this.updateView();
    }

    this.components.undoButton.onclick = () => {
      this.match.performUndo();
      this.updateView();
    }

    this.components.simpleModalButton.onclick = () => {
      this.components.simpleModal.style.display = "none";
    }
  }

  _setCallbacks() {
    this.match.onChangeSides = this._notifyChangeSides.bind(this);
  }

  _notifyChangeSides(){
    vibration.start("ping");
    this.components.simpleModal.style.display = "inline";
    this.components.simpleModalText.text = "Change Sides";
  }
}
