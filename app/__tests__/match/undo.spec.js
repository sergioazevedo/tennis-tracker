import {
  givenAMatch
} from '../../test-helper'

describe('Undo', () => {
  it('During a match with point score 30 - 0 when my opponent socres a point and I accidentally tap the wrong button I should be able to undo my last action and fix the score', () => {
    const match = givenAMatch({
      pointScore: {
        me: 30,
        op: 0
      }
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
      pointScore: {
        me: 0,
        op: 0
      }
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
