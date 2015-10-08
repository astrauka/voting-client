import React from 'react/addons';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import Winner from './Winner';
import Vote from './Vote';

export const Voting = React.createClass({
  mixins: [React.addons.PureRenderMixin],
  render: function() {
    const {winner} = this.props;

    return(
      <div>
        {winner ?
          <Winner ref='winner' winner={winner} /> :
          <Vote {...this.props} />}
      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    hasVoted: state.get('hasVoted'),
    winner: state.get('winner'),
  }
};

export const VotingContainer = connect(mapStateToProps, actionCreators)(Voting);
