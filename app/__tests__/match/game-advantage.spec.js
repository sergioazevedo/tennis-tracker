import {
  givenAMatch
} from '../../test-helper'

describe('Game Advantage Scenario', () => {

  it('when I lost the advantage then game score should be back to DEUCE (40 - 40) ', () => {
    let match = givenAMatch({
      pointScore: {
        me: 'AD',
        op: ''
      }
    });
    match.pointAgainstMe();
    expect(match.pointScore).toEqual({
      me: 40,
      op: 40
    });
  });

  it('when my Opponent lost the advantage then game score should be back to DEUCE (40 - 40) ', () => {
    let match = givenAMatch({
      pointScore: {
        me: '',
        op: 'AD'
      }
    });
    match.pointForMe();
    expect(match.pointScore).toEqual({
      me: 40,
      op: 40
    });
  });

  it('when I have the Advantage and score another point then I should win the game', () => {
    let match = givenAMatch({
      pointScore: {
        me: 'AD',
        op: ''
      }
    });
    match.pointForMe();
    expect(match.gameScore).toEqual({
      me: 1,
      op: 0
    });
  });

  it('when my Opponent has the Advantage and he scores another point then my Opponent should won the game', () => {
    let match = givenAMatch({
      pointScore: {
        me: '',
        op: 'AD'
      }
    });
    match.pointAgainstMe();
    expect(match.gameScore).toEqual({
      me: 0,
      op: 1
    });
  });
});
