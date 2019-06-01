const BASE_GAME_DATA = {
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

export default class Game {

  constructor(receivedGameData) {
    if (receivedGameData != null) {
      this.data = Object.assign(
        {},
        BASE_GAME_DATA,
        receivedGameData,
      );
    } else {
      this.data = Object.assign(
        {},
        BASE_GAME_DATA
      );
    }
  }

  get toObject() {
    return this.data;
  }

  get pointScore() {
    return this.data.pointScore;
  }

  pointForMe() {
    this._pointFor('me');
  }

  pointAgainstMe() {
    this._pointFor('op');
  }

  get isDeuce() {
    return (
      this.pointScore.me === 40 &&
      this.pointScore.op === 40
    )
  }

  inverseOf(who) {
    return (who === 'me') ? 'op' : 'me';
  }

  _advantageFor(who) {
    const other = this.inverseOf(who);
    this.data.pointScore[who] = 'AD';
    this.data.pointScore[other] = '';
  }

  _pointFor(who) {
    switch (this.data.pointScore[who]) {
      case 0:
        this.data.pointScore[who] = 15;
        break;
      case 15:
        this.data.pointScore[who] = 30;
        break;
      case 30:
        this.data.pointScore[who] = 40;
        break;
      case 40:
        if (this.isDeuce) {
          this._advantageFor(who);
        } else {
          this.gameForMe();
        }
        break;
      default:
        //advantage was lost
        this.data.pointScore[who] = 40;
        this.data.pointScore.op = 40;
    }
  }

  get gamesPlayed() {
    return this.data.gameScore.me + this.data.gameScore.op;
  }

  get isTieBreak() {
    return this.data.gameScore.me == 6 && this.data.gameScore.op == 6;
  }

  get isSetFinished() {
    const gamesDiff = this.data.gameScore.me - this.data.gameScore.op
    return Math.abs(gamesDiff) >= 1 && this.gamesPlayed >= 5;
  }

  gameForMe() {
    if ( this.isSetFinished ) {
      this.data.currentSet += 1
      this.data.gameScore.me = 0;
      this.data.gameScore.op = 0;
      this.data.currentGame = 1;
    } else {
      this.data.gameScore.me += 1;
      this.data.currentGame += 1;
    }
    this.data.pointScore.me = 0;
    this.data.pointScore.op = 0;
  }

  gameForOp() {
    this.data.gameScore.op += 1;
    this.data.currentGame += 1;
    this.data.pointScore.me = 0;
    this.data.pointScore.op = 0;
  }

}