import {
  givenAMatch
} from '../../test-helper'

describe('BUGs', () => {
  it('given a 4-1 game score for me, when I win the game then Set should not end and the set score should be 5 - 1', () => {
    let match = givenAMatch({
      setScore: {
        me: 0,
        op: 0
      },
      gameScore: {
        me: 4,
        op: 1
      },
      pointScore: {
        me: 40,
        op: 0
      }
    });
    //Game Point not set point
    match.pointForMe();

    expect(match.gameScore).toEqual({
      me: 5,
      op: 1
    });
    expect(match.setScore).toEqual({
      me: 0,
      op: 0
    });
  });

  it('given a tie-break game when point score sum reaches 7 then game should not be ended and point score should be 3 - 4', () => {
    let match = givenAMatch({
      setScore: {
        me: 0,
        op: 0
      },
      gameScore: {
        me: 6,
        op: 6
      },
      pointScore: {
        me: 2,
        op: 4
      }
    });
    //Tie-break
    match.pointForMe();

    expect(match.gameScore).toEqual({
      me: 6,
      op: 6
    });
    expect(match.pointScore).toEqual({
      me: 3,
      op: 4
    });
  });
});
