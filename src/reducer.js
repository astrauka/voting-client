import {List, Map} from 'immutable';

function currentPair(state) {
  return List(state.getIn(['vote', 'pair']));
}

function vote(state, entry) {
  if (currentPair(state).includes(entry)) {
    return state.set('hasVoted', entry);
  } else {
    return state;
  }
}

function resetHasVoted(previousState, state) {
  if (previousState.get('round') < state.get('round')) {
    return state.remove('hasVoted');
  } else {
    return state;
  }
}

export default function reducer(state = Map(), action) {
  switch (action.type) {
  case 'SET_STATE':
    return resetHasVoted(state, state.merge(action.state));
  case 'VOTE':
    return vote(state, action.entry);
  }

  return state;
}
