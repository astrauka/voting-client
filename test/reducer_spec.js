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
});
