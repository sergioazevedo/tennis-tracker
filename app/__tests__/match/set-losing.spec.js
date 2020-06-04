import {
  givenAMatch
} from '../../test-helper'

describe('Set Losing scenarios', () => {

  describe('Given a match in the first Set with game score 0 - 5 against me. When my Opponent hits the Set Point', () => {
    let match = givenAMatch({
      setScore: {
        me: 0,
        op: 0
      },
      gameScore: {
        me: 0,
        op: 5
      },
      pointScore: {
        me: 0,
        op: 40
      }
    });
    //Set Point
    match.pointAgainstMe();

    it('Changes the Set score to display 0 - 1 against me', () => {
      expect(match.setScore).toEqual({
        me: 0,
        op: 1
      });
    });

    it('starts a new Set', () => {
      expect(match.currentSet).toEqual(2);
    });

    it('starts a new game', () => {
      expect(match.gameScore).toEqual({
        me: 0,
        op: 0
      });
    });
  });


  describe('Given a match with game score is 5 - 6 for against me. When my Opponent hits the Set Point', () => {
    let match = givenAMatch({
      setScore: {
        me: 0,
        op: 0
      },
      gameScore: {
        me: 5,
        op: 6
      },
      pointScore: {
        me: 0,
        op: 40
      }
    });
    //Opponent Set Point
    match.pointAgainstMe();

    it('Changes the Set score to display 0 - 1 against me', () => {
      expect(match.setScore).toEqual({
        me: 0,
        op: 1
      });
    });

    it('starts a new Set', () => {
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
