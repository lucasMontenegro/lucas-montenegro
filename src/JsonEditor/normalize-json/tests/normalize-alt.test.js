import normalize from '../normalize-alt';
import raw from './raw.json';
import expected from './normal.json';

jest.mock('../create-id', () => jest.fn((i => () => (i++).toString())(0)));

describe('Normalize - Alt Implementation', () => {
  it('should normalize', () => {
    const actual = normalize(raw);
    expect(actual).toEqual(expected);
  });
});