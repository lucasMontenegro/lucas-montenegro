import { cloneDeep } from 'lodash';
import denormalize from '../../denormalize-alt';
import raw from '../raw.json';
import normal from './normal.json';

const normalClone = cloneDeep(normal);

describe('Denormalize - Alt Implementation', () => {
  it('should denormalize', () => {
    expect(denormalize(normal)).toEqual(raw);
  });
  it(`shouldn't alter the input`, () => {
    expect(normalClone).toEqual(normal);
  });
});
