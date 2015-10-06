import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
  it('handles SET_STATE', () => {
    const initialState = Map();
    const receivedState = fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tallY: {Trainspotting: 5}
      }
    });

    const action = {type: 'SET_STATE', state: receivedState};
    expect(reducer(undefined, action)).to.equal(receivedState);
    expect(reducer(initialState, action)).to.equal(receivedState);
  });

  it('removes hasVoted on SET_STATE pair change', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
      },
      hasVoted: 'Trainspotting',
    });

    const noPairChangeState = fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
      }
    });
    const noPairChangeAction = {type: 'SET_STATE', state: noPairChangeState};
    expect(reducer(initialState, noPairChangeAction)).to.equal(initialState);

    const pairChangeState = fromJS({
      vote: {
        pair: ['Sunshine', 'Millionaire']
      }
    });
    const pairChangeAction = {type: 'SET_STATE', state: pairChangeState};
    expect(reducer(initialState, pairChangeAction)).to.equal(pairChangeState);
  });

  it('handles VOTE by setting hasVoted', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 2}
      }
    });
    const action = {type: 'VOTE', entry: 'Trainspotting'};
    expect(reducer(initialState, action)).to.equal(
      initialState.merge({
        hasVoted: 'Trainspotting',
      })
    );

    const invalidEntryAction = {type: 'VOTE', entry: 'Sunrize'};
    expect(reducer(initialState, invalidEntryAction)).to.equal(initialState);
  });
});
