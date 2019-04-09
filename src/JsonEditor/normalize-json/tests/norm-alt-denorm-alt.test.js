import normalize from '../normalize-alt';
import denormalize from '../denormalize-alt';
import raw from './raw.json';

const msg = 'Normalize with "normalize-alt",'
  + ' then Denormalize with "denormalize-alt"';
describe(msg, () => {
  it('should return the original JSON object', () => {
    const actual = denormalize(normalize(raw));
    expect(actual).toEqual(raw);
  });
});