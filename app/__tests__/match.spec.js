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
    it('my points score should progress from 0, 15, 30, 40', () => {
      let match = givenAMatch();
      [0,15,30,40].map((value) => {
        expect(match.pointScore.me).toEqual(value);
        match.pointForMe();
      });
    });

    it('my opponent points score should progress from 0, 15, 30, 40', () => {
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

  describe('Set (Win/Lose/Tie-Break) Scenarios', () => {
    describe('Given a match with game score is 5 - 0 for me. When I won the next game. Then:', () => {
      let match = givenAMatch({
        setScore: {me: 0, op: 0},
        gameScore: { me: 5, op: 0 },
        pointScore: { me: 40, op: 0 }
      });
      //Set Point
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

    describe('Given a match with game score is 0 - 5 against me. When my Opponent won the next game. Then:', () => {
      let match = givenAMatch({
        setScore: { me: 0, op: 0 },
        gameScore: { me: 0, op: 5 },
        pointScore: { me: 0, op: 40 }
      });
      //Set Point
      match.pointAgainstMe();

      it('Set score should display that my Opponent won the last SET', () => {
        expect(match.setScore).toEqual({
          me: 0,
          op: 1
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

    describe('Given a match with game score is 6 - 5 for me. When my Opponent won the next game. Then:', () => {
      let match = givenAMatch({
        setScore: { me: 0, op: 0 },
        gameScore: { me: 6, op: 5 },
        pointScore: { me: 0, op: 40 }
      });
      //Tie Break Point
      match.pointAgainstMe();

      it('Set score should not change (its a Tie Break)', () => {
        expect(match.setScore).toEqual({
          me: 0,
          op: 0
        });
      });

      it('a new set should not start (its a Tie Break)', () => {
        expect(match.currentSet).toEqual(1);
      });

      it('the game score should be even 6 - 6', () => {
        expect(match.gameScore).toEqual({
          me: 6,
          op: 6
        });
      });

      it('a new game (tie break) should start', () => {
        expect(match.pointScore).toEqual({
          me: 0,
          op: 0
        });
      });
    });

    describe('Given a match with game score is 5 - 6 for against me. When my Opponent won the next game. Then:', () => {
      let match = givenAMatch({
        setScore: { me: 0, op: 0 },
        gameScore: { me: 5, op: 6 },
        pointScore: { me: 0, op: 40 }
      });
      //Opponent Set Point
      match.pointAgainstMe();

      it('Set score should display that my Opponent won the last SET', () => {
        expect(match.setScore).toEqual({
          me: 0,
          op: 1
        });
      });

      it('a new set should start', () => {
        expect(match.currentSet).toEqual(2);
      });

      it('the game score should be even 0 - 0', () => {
        expect(match.gameScore).toEqual({
          me: 0,
          op: 0
        });
      });

      it('a new game should start', () => {
        expect(match.pointScore).toEqual({
          me: 0,
          op: 0
        });
      });
    });
  });

  describe('Tie-break Scenarios', () => {
    describe('Scoring Points during Tie-break', () => {
      it('wmy points score should progress from 0,1,2,3...', () => {
        const match = givenAMatch({
          gameScore: { me: 6, op: 6 }
        });
        [0, 1, 2, 3, 4, 5, 6].map((value) => {
          expect(match.pointScore.me).toEqual(value);
          match.pointForMe();
        });
      });

      it('my opponent points score should progress from 0,1,2,3...', () => {
        const match = givenAMatch({
          gameScore: { me: 6, op: 6 }
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
          gameScore: { me: 6, op: 6 },
          pointScore: { me: 6, op: 5 }
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

  describe('Best of 3 - Match (Win/Lose) - Scenarios', () => {
    describe('Given a match with set score is 1 - 0 and game score 5 - 4 to me. When I won the next game. Then:', () => {
      let match = givenAMatch({
        setScore: { me: 1, op: 0 },
        gameScore: { me: 5, op: 4 },
        pointScore: { me: 40, op: 0 }
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
        setScore: { me: 0, op: 1 },
        gameScore: { me: 4, op: 5 },
        pointScore: { me: 0, op: 40 }
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

  describe('Undo', () => {
    it('During a match with point score 30 - 0 when my opponent socres a point and I accidentally tap the wrong button I should be able to undo my last action and fix the score', () => {
      const match = givenAMatch({
        pointScore: { me: 30, op: 0 }
      });
      match.pointForMe();
      match.performUndo();
      match.pointAgainstMe();
      expect(match.pointScore).toEqual({
        me: 30,
        op: 15
      });
    });

    it('Given a new match when the first game finishes after a deuce if I undo the last action point score should display AD - ""', () => {
      const match = givenAMatch({
        pointScore: { me: 0, op: 0 }
      });
      match.pointForMe();
      match.pointAgainstMe();
      match.pointForMe();
      match.pointAgainstMe();
      match.pointForMe();
      match.pointAgainstMe();
      match.pointForMe();
      match.pointForMe();
      match.performUndo();
      expect(match.pointScore).toEqual({
        me: 'AD',
        op: ''
      });
    });
  });

  describe('BUGs', () => {
    it('given a 4-1 game score for me, when I win the game then Set should not end and the set score should be 5 - 1', () => {
      let match = givenAMatch({
        setScore: { me: 0, op: 0 },
        gameScore: { me: 4, op: 1 },
        pointScore: { me: 40, op: 0 }
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
        setScore: { me: 0, op: 0 },
        gameScore: { me: 6, op: 6 },
        pointScore: { me: 2, op: 4 }
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
});