import normalize from '../normalize';
import denormalize from '../denormalize-alt';
import raw from './raw.json';

describe('Normalize, then Denormalize with "denormalize-alt"', () => {
  it('should return the original JSON object', () => {
    const actual = denormalize(normalize(raw));
    expect(actual).toEqual(raw);
  });
});