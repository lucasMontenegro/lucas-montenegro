import denormalize from '../denormalize-alt';
import expected from './raw.json';
import normal from './normal.json';

describe('Denormalize - Alt Implementation', () => {
  it('should denormalize', () => {
    const actual = denormalize(normal);
    expect(actual).toEqual(expected);
  });
});