import denormalize from '../denormalize';
import expected from './raw.json';
import normal from './normal.json';

describe('Denormalize', () => {
  it('should denormalize', () => {
    const actual = denormalize(normal);
    expect(actual).toEqual(expected);
  });
});