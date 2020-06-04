import {
  givenAMatch
} from '../../test-helper'

describe('Game DEUCE (40-40) Scenario', () => {

  it('when I score a point score should be AD - "" ', () => {
    const match = givenAMatch({
      pointScore: {
        me: 40,
        op: 40
      }
    });
    match.pointForMe();
    expect(match.pointScore).toEqual({
      me: 'AD',
      op: ''
    });
  });

  it('when my Opponent scores a point score should be "" - AD', () => {
    let match = givenAMatch({
      pointScore: {
        me: 40,
        op: 40
      }
    });
    match.pointAgainstMe();
    expect(match.pointScore).toEqual({
      me: '',
      op: 'AD'
    });
  });
});
