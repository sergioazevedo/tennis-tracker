import {
  givenAMatch
} from '../../test-helper'

describe('Set - Wining scenarios', () => {

  describe('Given a match in the first Set with game score 5 - 0 to me. When I hit the Set Point', () => {
    let match = givenAMatch({
      setScore: {
        me: 0,
        op: 0
      },
      gameScore: {
        me: 5,
        op: 0
      },
      pointScore: {
        me: 40,
        op: 0
      }
    });
    //Set Point
    match.pointForMe();

    it('Changes the Set score to display 1 - 0 to me', () => {
      expect(match.setScore).toEqual({
        me: 1,
        op: 0
      });
    });

    it('starts a new set', () => {
      expect(match.currentSet).toEqual(2);
    });

    it('starts a new game', () => {
      expect(match.gameScore).toEqual({
        me: 0,
        op: 0
      });
    });
  });

});
