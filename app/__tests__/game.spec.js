import Game from '../game';

describe('Game', () => {

  describe('Basic', () => {
    let game = new Game();
    it ('New Match should start with point score 0 - 0', () => {
      expect(game.pointScore).toEqual({
        me: 0,
        op: 0
      });
    });
  });

  describe('Basic Score Point Scenario', () => {
    let game;
    beforeEach(() => {
      game = new Game();
    });

    it('my points score should progres from 0, 15, 30, 40', () => {
      [0,15,30,40].map((value) => {
        expect(game.pointScore.me).toEqual(value);
        game.pointForMe();
      });
    });

    it('opponent points score should progres from 0, 15, 30, 40', () => {
      [0, 15, 30, 40].map((value) => {
        expect(game.pointScore.op).toEqual(value);
        game.pointAgainstMe();
      });
    });
  });

  describe('DEUCE Scenario', () => {
    let game;
    beforeEach(() => {
      game = new Game({
        pointScore: { me: 40, op: 40 }
      });
    });

    it('when a game is 40 - 40 and I score a point score should be AD - "" ', () => {
      game.pointForMe();
      expect(game.pointScore).toEqual({
        me: 'AD',
        op: ''
      });
    });

    it('when a game is 40 - 40 and Opponent scores a point score should be "" - AD', () => {
      game.pointAgainstMe();
      expect(game.pointScore).toEqual({
        me: '',
        op: 'AD'
      });
    });

  });
});