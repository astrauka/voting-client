import React from 'react/addons';
import {List, Map} from 'immutable';
import Results from '../../src/components/Results';
import {expect} from 'chai';

const {renderIntoDocument, scryRenderedDOMComponentsWithClass}
  = React.addons.TestUtils;

describe('Results', () => {
  it('renders entries with vote counts', () => {
    const pair = List.of('Trainspotting', '28 Days Later');
    const tally = Map({
      'Trainspotting': 5,
    });
    const component = renderIntoDocument(
      <Results pair={pair} tally={tally} />
    );
    const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
    const [trainspotting, days_later] = entries.map(e => e.getDOMNode().textContent);

    expect(entries.length).to.equal(2);
    expect(trainspotting).to.contain('Trainspotting');
    expect(trainspotting).to.contain('5');
    expect(days_later).to.contain('28 Days Later');
    expect(days_later).to.contain('0');
  });

  it('displays winner once present', () => {
    const component = renderIntoDocument(
      <Results pair={['Trainspotting', '28 Days Later']}
               tally={Map()}
               winner='Trainspotting' />
    );
    const winner = React.findDOMNode(component.refs.winner);
    expect(winner.textContent).to.contain('Trainspotting');
  });
});
