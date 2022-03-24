import { decrementOrRemoveEntry } from '../src/util';

describe('util tests', () => {
  it('map no key', () => {
    expect(decrementOrRemoveEntry(new Map(), 'noKey')).toBeUndefined();
  });
});
