import React from 'react/addons';
import Winner from './Winner';

export default React.createClass({
  mixins: [React.addons.PureRenderMixin],
  getPair: function() {
    return this.props.pair || [];
  },
  getTally: function() {
    return this.props.tally || {};
  },
  getVotes: function(entry) {
    return this.getTally().get(entry) || 0;
  },
  getWinner: function() {
    return this.props.winner;
  },
  render: function() {
    const winner = this.getWinner();

    return(
      winner ?
        <Winner winner={winner} ref='winner' /> :
        <div className='results'>
          <div className='tally'>
            {this.getPair().map(entry =>
              <div key={entry} className='entry'>
                <h1>{entry}</h1>
                <div className='vote-count'>
                  {this.getVotes(entry)}
                </div>
              </div>
            )}
          </div>

          <div className='management'>
            <butotn ref='next'
                    className='next'
                    onClick={this.props.next} />
          </div>
        </div>
    );
  }
});
