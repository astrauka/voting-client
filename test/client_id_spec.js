import {expect} from 'chai';
require('./mockLocalStorage');

import getClientId from '../src/client_id';

describe('getClientId', () => {
  it('generates client id on new and retrieves on existing', () => {
    const clientId = getClientId();
    expect(clientId).to.be.ok;
    expect(clientId).to.equal(getClientId());
  });
});
