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

function resetHasVoted(state) {
  const hasVoted = state.get('hasVoted');
  if (currentPair(state).includes(hasVoted)) {
    return state;
  } else {
    return state.remove('hasVoted');
  }
}

export default function reducer(state = Map(), action) {
  switch (action.type) {
  case 'SET_STATE':
    return resetHasVoted(state.merge(action.state));
  case 'VOTE':
    return vote(state, action.entry);
  }

  return state;
}
