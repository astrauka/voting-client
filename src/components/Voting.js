import React from 'react/addons';
import Winner from './Winner';
import Vote from './Vote';

export default React.createClass({
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
