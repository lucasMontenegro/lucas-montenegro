import data from './data.json';
import * as stringifyObject from 'stringify-object';

export const createID = (i => () => (i++).toString())(0);

/*

// Alternative implementation

export function normalize (raw, byID={}, parentID=null, key=null) {
  const id = createID();
  const res = byID[id] = { id, parentID, key };

  let type = typeof raw;
  if (type === 'object') {
    if (raw instanceof Array) {
      type = 'array';
      res.kids = raw.map((item, i) => normalize(item, byID, id, i));
    } else {
      res.kids = Object.keys(raw).map(key => normalize(raw[key], byID, id, key));
    }
  } else {
    res.value = raw;
  }
  res.type = type;
  if (parentID === null) return { id, byID };
  return id;
}

*/


export const normalize = (() => {
  function createInitialState (raw, byID, parentID=null, key=null) {
    const id = createID();
    const result = byID[id] = { id, parentID, key };
    const state = { id, result, raw };
    let type = typeof raw;
    if (type === 'object') {
      if (raw instanceof Array) {
        state.isObject = true;
        state.isArray = true;
        type = 'array';
      } else {
        state.isObject = true;
        state.keys = Object.keys(raw);
      }
      result.kids = [];
    }
    result.type = type;
    return state;
  }

  return function normalize (raw) {
    const byID = {};
    const normalized = { byID };

    let state = createInitialState(raw, byID);
    const stack = [state];
    normalized.id = state.id;

    do {
      if (state.isObject) {
        if (state.isArray) {
          const { raw, id, result } = state;
          if (raw.length > 0) {
            stack.push(state);
            state = createInitialState(raw.pop(), byID, id, raw.length);
            result.kids.unshift(state.id);
          } else {
            state = stack.pop();
          }
        } else {
          const { raw, keys, id, result } = state;
          if (keys.length > 0) {
            stack.push(state);
            const key = keys.pop();
            state = createInitialState(raw[key], byID, id, key);
            delete raw[key];
            result.kids.unshift(state.id);
          } else {
            state = stack.pop();
          }
        }
      } else {
        state.result.value = state.raw;
        state = stack.pop();
      }
    } while (stack.length > 0);
    return normalized;
  }
})();

const stringifyOptions = {
  indent: '  ',
  singleQuotes: false
};

console.log('Raw Data:');
console.log(stringifyObject(data, stringifyOptions));
console.log();
console.log('Normalized Data:');
console.log(stringifyObject(normalize(data), stringifyOptions));
console.log();

