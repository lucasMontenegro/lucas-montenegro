import { cloneDeep } from 'lodash';
import normalize from '../../normalize';
import raw from '../raw.json';
import expected from './normal.json';

const rawClone = cloneDeep(raw);
jest.mock('../../create-id', () => jest.fn((i => () => (i++).toString())(0)));

describe('Normalize', () => {
  it('should normalize', () => {
    const actual = normalize(raw);
    expect(actual).toEqual(expected);
  });
  it(`shouldn't alter the input`, () => {
    expect(rawClone).toEqual(raw);
  });
});