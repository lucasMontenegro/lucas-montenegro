import normalize from '../normalize-alt';
import denormalize from '../denormalize';
import raw from './raw.json';

describe('Normalize with "normalize-alt", then Denormalize', () => {
  it('should return the original JSON object', () => {
    const actual = denormalize(normalize(raw));
    expect(actual).toEqual(raw);
  });
});