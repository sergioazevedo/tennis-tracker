import Match from '../match';

describe('Match', () => {
  const givenAMatch = (gameData) => {
    return new Match(gameData);
  }

  it ('Game should start with point score 0 - 0', () => {
    expect(givenAMatch().pointScore).toEqual({
      me: 0,
      op: 0
    });
  });

  describe('Scoring Points during a Game', () => {
    it('my points score should progres from 0, 15, 30, 40', () => {
      let match = givenAMatch();
      [0,15,30,40].map((value) => {
        expect(match.pointScore.me).toEqual(value);
        match.pointForMe();
      });
    });

    it('my opponent points score should progres from 0, 15, 30, 40', () => {
      let match = givenAMatch();
      [0, 15, 30, 40].map((value) => {
        expect(match.pointScore.op).toEqual(value);
        match.pointAgainstMe();
      });
    });
  });

  describe('Game DEUCE (40-40) Scenario', () => {
    it('when I score a point score should be AD - "" ', () => {
      const match = givenAMatch({pointScore: { me: 40, op: 40 }});
      match.pointForMe();
      expect(match.pointScore).toEqual({
        me: 'AD',
        op: ''
      });
    });

    it('when my Opponent scores a point score should be "" - AD', () => {
      let match = givenAMatch({ pointScore: { me: 40, op: 40 } });
      match.pointAgainstMe();
      expect(match.pointScore).toEqual({
        me: '',
        op: 'AD'
      });
    });
  });

  describe('Game Advantage Scenarios', () => {
    it('when I lost the advantage then game score should be back to DEUCE (40 - 40) ', () => {
      let match = givenAMatch({ pointScore: { me: 'AD', op: '' } });
      match.pointAgainstMe();
      expect(match.pointScore).toEqual({
        me: 40,
        op: 40
      });
    });

    it('when my Opponent lost the advantage then game score should be back to DEUCE (40 - 40) ', () => {
      let match = givenAMatch({ pointScore: { me: '', op: 'AD' } });
      match.pointForMe();
      expect(match.pointScore).toEqual({
        me: 40,
        op: 40
      });
    });

    it('when I have the Advantage and score another point then I should win the game', () => {
      let match = givenAMatch({ pointScore: { me: 'AD', op: '' } });
      match.pointForMe();
      expect(match.gameScore).toEqual({
        me: 1,
        op: 0
      });
    });

    it('when my Opponent has the Advantage and he scores another point then my Opponent should won the game', () => {
      let match = givenAMatch({ pointScore: { me: '', op: 'AD' } });
      match.pointAgainstMe();
      expect(match.gameScore).toEqual({
        me: 0,
        op: 1
      });
    });
  });
});