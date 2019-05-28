
export default class Game {

  constructor(data) {
    if (data != null) {
      this.gameData = data;
    } else {
      this.gameData = {
        currentSet: 1,
        currentGame: 1,
        gameScore: {
          me: 0,
          op: 0,
        },
        pointScore: {
          me: 0,
          op: 0,
        }
      };
    }
  }

  get data() {
    return this.gameData;
  }

  pointForMe() {
    switch (this.gameData.pointScore.me) {
      case 0:
        this.gameData.pointScore.me = 15;
        break;
      case 15:
        this.gameData.pointScore.me = 30;
        break;
      case 30:
        this.gameData.pointScore.me = 40;
        break;
      case 40:
        if (this.gameData.pointScore.op === 40) {
          this.gameData.pointScore.me = "AD";
          this.gameData.pointScore.op = "";
        } else {
          this.gameForMe();
        }
        break;
      default:
        //advantage was lost
        this.gameData.pointScore.me = 40;
        this.gameData.pointScore.op = 40;
    }
  }

  get gamesPlayed() {
    return this.gameData.gameScore.me + this.gameData.gameScore.op;
  }

  get isTieBreak() {
    return this.gameData.gameScore.me == 6 && this.gameData.gameScore.op == 6;
  }

  get isSetFinished() {
    const gamesDiff = this.gameData.gameScore.me - this.gameData.gameScore.op
    return Math.abs(gamesDiff) >= 1 && this.gamesPlayed >= 5;
  }

  gameForMe() {
    if ( this.isSetFinished ) {
      this.gameData.currentSet += 1
      this.gameData.gameScore.me = 0;
      this.gameData.gameScore.op = 0;
      this.gameData.currentGame = 1;
    } else {
      this.gameData.gameScore.me += 1;
      this.gameData.currentGame += 1;
    }
    this.gameData.pointScore.me = 0;
    this.gameData.pointScore.op = 0;
  }

  gameForOp() {
    this.gameData.gameScore.op += 1;
    this.gameData.currentGame += 1;
    this.gameData.pointScore.me = 0;
    this.gameData.pointScore.op = 0;
  }

}