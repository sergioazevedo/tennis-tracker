import {
  givenAMatch
} from '../../test-helper'


describe('Game Scoring Points Scenario ', () => {

  it('my point score should progress from 0, 15, 30, 40', () => {
    let match = givenAMatch();
    [0, 15, 30, 40].map((value) => {
      expect(match.pointScore.me).toEqual(value);
      match.pointForMe();
    });
  });

  it('my opponents point score should progress from 0, 15, 30, 40', () => {
    let match = givenAMatch();
    [0, 15, 30, 40].map((value) => {
      expect(match.pointScore.op).toEqual(value);
      match.pointAgainstMe();
    });
  });
});
