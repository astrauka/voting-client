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

  it('removes hasVoted on SET_STATE round change', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
      },
      hasVoted: 'Trainspotting',
      round: 1,
    });

    const noPairChangeState = fromJS({round: 1});
    const noPairChangeAction = {type: 'SET_STATE', state: noPairChangeState};
    expect(reducer(initialState, noPairChangeAction)).to.equal(initialState);

    const pairChangeState = fromJS({round: 2});
    const pairChangeAction = {type: 'SET_STATE', state: pairChangeState};
    expect(reducer(initialState, pairChangeAction)).to.not.have.key('hasVoted');
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

  it('handles SET_CLIENT_ID', () => {
    const initialState = Map();
    const clientId = '1234';
    const action = {type: 'SET_CLIENT_ID', clientId};
    expect(reducer(initialState, action)).to.equal(fromJS({clientId}));
  });
});
