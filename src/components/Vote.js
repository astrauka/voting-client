import React from 'react/addons';

export default React.createClass({
  mixins: [React.addons.PureRenderMixin],
  getPair: function() {
    return this.props.pair || [];
  },
  hasVotedFor: function(entry) {
    return this.props.hasVoted === entry;
  },
  render: function() {
    return(
      <div className='voting'>
        {this.getPair().map(entry =>
          <button key={entry}
                  onClick={() => this.props.vote(entry)} >
            <h1>{entry}</h1>
            {this.hasVotedFor(entry) ?
              <div className='label'>Voted</div> :
              null}
          </button>
        )}
      </div>
    );
  }
});
