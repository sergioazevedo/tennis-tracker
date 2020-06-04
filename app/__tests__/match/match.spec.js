import {
  givenAMatch
} from '../../test-helper'

describe('Match', () => {
  it('should start with point score 0 - 0', () => {
    expect(givenAMatch().pointScore).toEqual({
      me: 0,
      op: 0
    });
  });

  describe('Best of 3 - Match (Win/Lose) - Scenarios', () => {
    describe('Given a match with set score is 1 - 0 and game score 5 - 4 to me. When I won the next game. Then:', () => {
      let match = givenAMatch({
        setScore: {
          me: 1,
          op: 0
        },
        gameScore: {
          me: 5,
          op: 4
        },
        pointScore: {
          me: 40,
          op: 0
        }
      });
      //Match Point
      match.pointForMe();

      it('Match should be over', () => {
        expect(match.isOver).toEqual(true);
      });

      it('Set score should display that I won the last SET', () => {
        expect(match.setScore).toEqual({
          me: 2,
          op: 0
        });
      });

      it('a new set should NOT start', () => {
        expect(match.currentSet).toEqual(2);
      });
    });

    describe('Given a match with set score is 0 - 1 and game score 4 - 5 against me. When I lost the next game. Then:', () => {
      let match = givenAMatch({
        setScore: {
          me: 0,
          op: 1
        },
        gameScore: {
          me: 4,
          op: 5
        },
        pointScore: {
          me: 0,
          op: 40
        }
      });
      //Match Point
      match.pointAgainstMe();

      it('Match should be over', () => {
        expect(match.isOver).toEqual(true);
      });

      it('Set score should display that I won the last SET', () => {
        expect(match.setScore).toEqual({
          me: 0,
          op: 2
        });
      });

      it('a new set should NOT start', () => {
        expect(match.currentSet).toEqual(2);
      });
    });
  });

});
