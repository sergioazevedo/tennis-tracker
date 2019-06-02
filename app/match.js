import objectAssign from './object-assign'

export default class Match {
  BASE_GAME_DATA = {
    setScore: {
      me: 0,
      op: 0,
    },
    gameScore: {
      me: 0,
      op: 0,
    },
    pointScore: {
      me: 0,
      op: 0,
    }
  };

  constructor(receivedMatchData) {
    if (receivedMatchData != null) {
      this.data = objectAssign(
        {},
        this.BASE_GAME_DATA,
        receivedMatchData
      )
    } else {
      this.data = objectAssign(
        {},
        this.BASE_GAME_DATA
      );
    }
  }

  get toObject() {
    return this.data;
  }

  get isTieBreak() {
    return this.data.gameScore.me == 6 && this.data.gameScore.op == 6;
  }

  //the match is over?
  get isOver() {
    const diff = Math.abs(this.data.setScore.me - this.data.setScore.op);
    return diff == 2;
  }

  //tennis set not property set :)
  get currentSet() {
    const currentSet = this.data.setScore.me + this.data.setScore.op;
    return this.isOver ? currentSet : currentSet + 1;
  }

  get setScore() {
    return this.data.setScore;
  }

  get gameScore() {
    return this.data.gameScore;
  }

  get pointScore() {
    return this.data.pointScore;
  }

  pointForMe() {
    this.isTieBreak ? this._tieBreakPointFor('me') : this._pointFor('me');
  }

  pointAgainstMe() {
    this.isTieBreak ? this._tieBreakPointFor('op') : this._pointFor('op');
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

  _tieBreakPointFor(who) {
    this.data.pointScore[who] += 1;
    const totalPoints = this.data.pointScore.me + this.data.pointScore.op;
    const pointsDiff = Math.abs(this.data.pointScore.me - this.data.pointScore.op);
    if (pointsDiff >= 2 && totalPoints >= 7) {
      this._gameFor(who);
    }
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
          this._gameFor(who);
        }
        break;
      case 'AD':
        this._gameFor(who);
        break;
      default:
        //advantage was lost (deuce)
        this.data.pointScore.me = 40;
        this.data.pointScore.op = 40;
    }
  }

  _gameFor(who) {
    this.data.gameScore[who] += 1;
    this._startNewGame();
    if (this._isSetFinished) {
      this._setFor(who);
      this._startNewSet();
    }
  }

  _setFor(who) {
    this.data.setScore[who] += 1;
  }

  _startNewSet() {
    this.data.gameScore.me = 0;
    this.data.gameScore.op = 0;
  }

  _startNewGame() {
    this.data.pointScore.me = 0;
    this.data.pointScore.op = 0;
  }

  get _gamesPlayed() {
    return this.data.gameScore.me + this.data.gameScore.op;
  }

  get _hadTieBreak() {
    return this._gamesPlayed == 13;
  }

  get _isSetFinished() {
    const gamesDiff = Math.abs(this.data.gameScore.me - this.data.gameScore.op);
    if (this._hadTieBreak) {
      return gamesDiff == 1;
    } else {
      return gamesDiff >= 2 && this._gamesPlayed >= 6;
    }
  }
}