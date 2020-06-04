import {
  givenAMatch
} from '../../test-helper'

describe('Set Tie-Break Scenario', () => {

  describe('Given a match in the first Set with game score 6 - 5 for me. When my Opponent hits the Set Point:', () => {
    let match = givenAMatch({
      setScore: {
        me: 0,
        op: 0
      },
      gameScore: {
        me: 6,
        op: 5
      },
      pointScore: {
        me: 0,
        op: 40
      }
    });
    //Tie Break Point
    match.pointAgainstMe();

    it('should not change the Set score since its a Tie Break', () => {
      expect(match.setScore).toEqual({
        me: 0,
        op: 0
      });
    });

    it('should not start a new Set (its a Tie Break)', () => {
      expect(match.currentSet).toEqual(1);
    });

    it('should change the game score to show 6 - 6', () => {
      expect(match.gameScore).toEqual({
        me: 6,
        op: 6
      });
    });

    it('starts the tie break game', () => {
      expect(match.pointScore).toEqual({
        me: 0,
        op: 0
      });
    });
  });

  describe('Scoring Points during Tie-break', () => {
    it('wmy points score should progress from 0,1,2,3...', () => {
      const match = givenAMatch({
        gameScore: {
          me: 6,
          op: 6
        }
      });
      [0, 1, 2, 3, 4, 5, 6].map((value) => {
        expect(match.pointScore.me).toEqual(value);
        match.pointForMe();
      });
    });

    it('my opponent points score should progress from 0,1,2,3...', () => {
      const match = givenAMatch({
        gameScore: {
          me: 6,
          op: 6
        }
      });
      [0, 1, 2, 3, 4, 5, 6].map((value) => {
        expect(match.pointScore.op).toEqual(value);
        match.pointAgainstMe();
      });
    });
  });

  describe('Winning the Tie-break Scenario', () => {
    describe('Given tie-break score is 6 - 5 for me. when I score a point. Then:', () => {
      let match = givenAMatch({
        gameScore: {
          me: 6,
          op: 6
        },
        pointScore: {
          me: 6,
          op: 5
        }
      });
      match.pointForMe();

      it('Set score should display that I won the last SET', () => {
        expect(match.setScore).toEqual({
          me: 1,
          op: 0
        });
      });

      it('a new set should start', () => {
        expect(match.currentSet).toEqual(2);
      });

      it('a new game should start', () => {
        expect(match.gameScore).toEqual({
          me: 0,
          op: 0
        });
      });
    });
  });

});
