import {List, Map} from 'immutable';

function currentPair(state) {
  return List(state.getIn(['vote', 'pair']));
}

function vote(state, entry) {
  if (currentPair(state).includes(entry)) {
    return state.set('myVote', Map({
      round: state.getIn(['vote', 'round']),
      entry
    }));
  } else {
    return state;
  }
}

function resetVote(state) {
  if (state.getIn(['vote', 'round'], 0) > state.getIn(['myVote', 'round'], 0)) {
    return state.remove('myVote');
  } else {
    return state;
  }
}

export default function reducer(state = Map(), action) {
  switch (action.type) {
  case 'SET_STATE':
    return resetVote(state.merge(action.state));
  case 'VOTE':
    return vote(state, action.entry);
  case 'SET_CLIENT_ID':
    return state.set('clientId', action.clientId);
  }

  return state;
}
